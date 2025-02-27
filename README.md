# GenAI-Question-Generator

📌 Full Project Details – GenAI Question Generator
This document outlines everything you need to develop, integrate, and deploy the AI-powered question generation system efficiently. This will serve as a guide for all team members.

🚀 Project Overview
🔹 Goal: Develop a GenAI-powered tool that generates Multiple-Choice, Descriptive, and Coding Questions based on syllabus topics and difficulty levels.
🔹 Tech Stack:

Frontend: React.js (or Next.js), Tailwind CSS
Backend: FastAPI (Python) or Express.js (Node.js)
Database: MongoDB or PostgreSQL
AI Model: OpenAI API (GPT-4 or Claude)
Deployment: Vercel (Frontend), Railway/Render (Backend)
🔹 Key Features:
✅ Generate Questions based on user-selected topics & difficulty
✅ Supports MCQs, Descriptive, and Coding Questions
✅ Stores past generated questions for reuse
✅ User Authentication (optional)
✅ Easy API Integration for Frontend

📌 How the System Works
1️⃣ User Workflow (Frontend)
User selects a subject & topic from a dropdown list.
User selects difficulty level (Easy, Medium, Hard).
User selects question type (MCQ, Descriptive, Coding).
AI generates questions dynamically based on inputs.
User can save, edit, or regenerate questions if needed.
User can export questions as PDF or text (optional).
2️⃣ Backend Process
Receives user input (topic, difficulty, type)
Calls OpenAI API with custom prompt engineering to generate unique questions
Processes response and formats it into proper structure
Saves generated questions in the database for future use
Returns JSON response to the frontend
📌 Team Member Responsibilities
Each team member will work independently and merge their work on GitHub.

👨‍💻 Team Member 1: Frontend Development
Setup React.js (or Next.js) with Tailwind CSS
Create UI Components: Dropdowns, buttons, text areas
Connect frontend to backend API to fetch questions
Implement dynamic question rendering
Add an export to PDF feature (if time allows)
👩‍💻 Team Member 2: Backend Development
Setup FastAPI (Python) or Express.js (Node.js)
Create API endpoints for generating questions
Integrate OpenAI API for text generation
Store generated questions in MongoDB/PostgreSQL
Deploy the backend to Railway or Render
👨‍💻 Team Member 3: AI Integration & Prompt Engineering
Design effective AI prompts for generating MCQs, descriptive, and coding questions
Optimize AI-generated responses for better quality
Ensure questions are unique but maintain a natural exam feel
Implement question modification features (twisting, difficulty adjustment)
Work with backend dev to test API responses
👩‍💻 Team Member 4: Deployment & Documentation
Deploy Frontend (Vercel) & Backend (Railway/Render)
Setup environment variables & API keys securely
Write README.md & API Documentation
Ensure everything works together before final submission
📌 API Endpoints for Integration
These endpoints will be called by the frontend to fetch AI-generated questions.

Endpoint	Method	Description
/generate-question	POST	Generate a single question based on topic, difficulty, and type
/generate-paper	POST	Generate a full set of questions (like a mock test)
/save-question	POST	Save a question to the database
/get-questions	GET	Retrieve stored questions
/delete-question/{id}	DELETE	Remove a saved question
📌 Integration & Final Deployment Plan
Step 1: Each member works on their assigned tasks in GitHub branches
Step 2: Backend & AI model are developed and tested
Step 3: Frontend connects to backend APIs
Step 4: Everything is tested together
Step 5: Deploy to Vercel & Railway/Render
Step 6: Final testing & bug fixes
Step 7: Submit & present the project! 🎉
📌 Next Steps
Each team member starts working on their assigned task.
Backend team shares API endpoints once they are functional.
Frontend team builds UI while waiting for backend.
AI team tests prompt engineering separately and then integrates it.
Final deployment happens in the last 3-4 days.

