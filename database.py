from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB Connection URI from .env file
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("⚠️ MONGO_URI is missing in the .env file!")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["genai_questions"]  # Database name
questions_collection = db["questions"]  # Collection name
