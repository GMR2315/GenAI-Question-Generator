# 📌 API Documentation - GenAI Question Generator  

## 🏗️ Base URL  
For local development:  
```
http://127.0.0.1:8000
```
For production (e.g., Railway, Heroku):  
```
https://your-deployed-api.com
```

---

## 🚀 1️⃣ Generate Questions  

**Endpoint:**  
```
POST /generate-question
```

**Description:**  
Generates AI-powered questions based on the provided subject, topic, and difficulty level.  

### **📤 Request Body (JSON)**
```json
{
    "subject": "Mathematics",
    "topic": "Algebra",
    "difficulty": "hard"
}
```

### **📥 Response (JSON)**
```json
{
    "question": "What is the derivative of x^2?",
    "options": ["2x", "x^2", "x", "None"],
    "answer": "2x"
}
```

---

## 🏥 2️⃣ Health Check  

**Endpoint:**  
```
GET /health
```

**Description:**  
Returns the health status of the API.  

### **📥 Response**
```json
{
    "status": "OK"
}
```

---

## 🔍 3️⃣ Get a Question by ID  

**Endpoint:**  
```
GET /get-question/{id}
```

**Description:**  
Fetches a question from the database by its unique ID.  

### **Example Request**
```
GET /get-question/65b4fcd1a2d3
```

### **📥 Response (JSON)**
```json
{
    "id": "65b4fcd1a2d3",
    "question": "What is 2+2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4"
}
```

---

## 🗑️ 4️⃣ Delete a Question  

**Endpoint:**  
```
DELETE /delete-question/{id}
```

**Description:**  
Deletes a question from the database.  

### **Example Request**
```
DELETE /delete-question/65b4fcd1a2d3
```

### **📥 Response (JSON)**
```json
{
    "message": "Question deleted successfully"
}
```

---

## 🚨 Error Handling  

| Error Code | Meaning               | Reason |
|------------|----------------------|--------|
| 400        | Bad Request           | Invalid input format |
| 404        | Not Found             | Question ID does not exist |
| 500        | Internal Server Error | Unexpected server issue |

---

## 📌 Authentication (Future)  
Currently, **no authentication** is required, but in future updates, we may use **API keys** or **JWT tokens** for security.

---

## 📚 Notes  
- The AI **does not repeat exact past questions** but **rephrases and modifies** them.  
- The difficulty level adjusts the complexity of generated questions.  
- Future updates will include **diagrams, True/False, and fill-in-the-blank questions**.

---

## 👨‍💻 Contact  
For any issues, raise a GitHub **issue** or email **support@genaiquestions.com**.
