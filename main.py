import os
import httpx
import logging
import traceback
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError, validator
from typing import Optional
from pymongo.errors import ServerSelectionTimeoutError
from database import questions_collection  # MongoDB connection
import uvicorn

# ✅ Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
    print(f"✅ .env file loaded from: {dotenv_path}")
else:
    raise ValueError("❌ .env file is missing! Please create one.")

# ✅ Read API Key and Mongo URI
API_KEY = os.getenv("NVIDIA_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

if not API_KEY:
    raise ValueError("⚠️ NVIDIA_API_KEY is missing! Check your .env file.")
if not MONGO_URI:
    raise ValueError("⚠️ MONGO_URI is missing! Check your .env file.")

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Logging Configuration
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("debug.log", encoding="utf-8"),
        logging.StreamHandler()
    ]
)

# ✅ Check MongoDB Connection
async def check_db():
    try:
        questions_collection.database.client.admin.command('ping')
    except ServerSelectionTimeoutError:
        raise HTTPException(status_code=500, detail="MongoDB connection failed")

# ✅ Define Request Model
class QuestionRequest(BaseModel):
    subject: Optional[str] = Field(None, min_length=2, max_length=100, description="Subject name")
    difficulty: Optional[str] = None
    topic: Optional[str] = Field(None, min_length=2, max_length=100, description="Specific topic")
    custom_prompt: Optional[str] = Field(None, description="Optional custom prompt")
    question_type: Optional[str] = Field(None, description="Optional: MCQ, True/False, Coding")

    @validator("difficulty", pre=True, always=True)
    def validate_difficulty(cls, v):
        if v:
            v = v.lower().strip()  # Normalize input
            if v not in {"easy", "medium", "hard"}:
                raise ValueError(
                    f"'{v}' is not a valid difficulty level. Please choose from 'easy', 'medium', or 'hard'. "
                    "If you need a more advanced question, try using 'custom_prompt' instead."
                )
        return v

# ✅ Root Endpoint
@app.get("/")
def read_root():
    return {"message": "GenAI Question Generator API is running 🚀"}

# ✅ Health Check Endpoint
@app.get("/health")
def health_check():
    return {"status": "OK", "api_key_loaded": bool(API_KEY)}

# ✅ Function to construct AI prompt dynamically
def construct_prompt(req: QuestionRequest):
    if req.custom_prompt:
        return req.custom_prompt  # Prioritize custom prompt if provided

    selected_type = req.question_type or "MCQ"  # Default to MCQ

    prompt = f"""
    Generate a {selected_type} question at {req.difficulty or 'medium'} level
    for the subject '{req.subject or 'General Knowledge'}' on the topic '{req.topic or 'random'}'.
    
    **Ensure the response follows this format:**
    - **Question:** Clearly stated question.
    - **Answer Choices (if MCQ):** List 3-4 choices with a correct answer marked.
    - **Correct Answer:** Indicate the correct answer separately.
    - **Explanation:** Brief reasoning for the answer.
    """
    return prompt.strip()

# ✅ Improved function to clean and format AI response
def clean_response(ai_response: str):
    """
    Cleans the raw AI response by removing unwanted "data:" prefixes.
    If the cleaned response is too short, returns a friendly fallback message.
    """
    if not ai_response or len(ai_response.strip()) < 20:
        return "The AI response appears incomplete. Please try again."

    # Remove any "data:" prefixes and join lines
    cleaned_lines = []
    for line in ai_response.split("\n"):
        line = line.strip()
        if line.startswith("data: "):
            line = line.replace("data: ", "", 1).strip()
        if line:
            cleaned_lines.append(line)
    cleaned = "\n".join(cleaned_lines).strip()

    if len(cleaned) < 20:
        return "The AI response appears incomplete. Please try again."
    return cleaned

# ✅ Generate Question Endpoint
@app.post("/generate-question")
async def generate_question(req: QuestionRequest, db_check: None = Depends(check_db)):
    try:
        logging.info(f"📩 Received request: {req.dict()}")

        # Handle empty input gracefully
        if not any([req.subject, req.difficulty, req.topic, req.custom_prompt, req.question_type]):
            logging.warning("⚠️ No valid input provided.")
            return {"question": "Please provide at least one valid input (subject, topic, difficulty, or custom prompt) to generate a question."}

        prompt = construct_prompt(req)
        logging.debug(f"📌 Constructed Prompt: {prompt}")

        payload = {
            "model": "meta/llama3-70b-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 500,
            "temperature": 0.7,
            "top_p": 1
        }
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post("https://integrate.api.nvidia.com/v1/chat/completions", json=payload, headers=headers)
            
            if response.status_code != 200:
                logging.error(f"❌ NVIDIA API Error: {response.text}")
                raise HTTPException(status_code=response.status_code, detail="Error fetching response from NVIDIA API")

            question_data = response.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()

        cleaned_question = clean_response(question_data)
        logging.debug(f"📌 Cleaned Response: {cleaned_question}")

        if cleaned_question.startswith("The AI response appears incomplete"):
            return {"question": cleaned_question}

        question_entry = {
            "subject": req.subject or "General Knowledge",
            "difficulty": req.difficulty or "Medium",
            "topic": req.topic or "Random",
            "question_type": req.question_type or "Random",
            "question": cleaned_question
        }
        questions_collection.insert_one(question_entry)

        return {"question": cleaned_question}

    except ValidationError as e:
        return {"error": str(e)}
    except httpx.HTTPError as e:
        logging.error(f"❌ HTTP Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")
    except ServerSelectionTimeoutError:
        raise HTTPException(status_code=500, detail="MongoDB connection timeout")
    except Exception as e:
        logging.error(f"❌ Error: {str(e)}")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

# ✅ Run API with Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=4, reload=True)
