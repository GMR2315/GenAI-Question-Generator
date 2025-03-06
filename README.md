# 🚀 GenAI Question Generator - Backend  

## 📌 Overview  
The **GenAI Question Generator** is an AI-powered tool that generates multiple-choice, descriptive, and coding questions based on syllabus topics and difficulty levels. The backend is built using **FastAPI**, with MongoDB as the database.  

---

## 🔥 Key Features  
- ✅ **AI-powered question generation** (MCQs, descriptive, coding)  
- ✅ **Topic-based & difficulty-based generation**  
- ✅ **Question modification & rephrasing**  
- ✅ **MongoDB integration for question storage**  
- ✅ **RESTful API for seamless integration**  
- ✅ **High-performance FastAPI backend**  
- ✅ **Secure with environment variables (`.env`)**  

---

## 📂 Folder Structure  
```
backend/
├── main.py           # FastAPI entry point
├── config.py         # Configuration settings
├── database.py       # Database connection
├── routes/           # API endpoints
├── models/           # Database models
├── services/         # Business logic (optional)
├── .env              # Environment variables (not uploaded to Git)
├── .gitignore        # Ignored files (includes .env)
├── requirements.txt  # Dependencies
├── Procfile          # Deployment instructions
├── README.md         # Project documentation
└── api_documentation.md  # API details
```

---

## 🛠️ Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/GMR2315/GenAI-Question-Generator.git
cd GenAI-Question-Generator/backend
```

### 2️⃣ Create a Virtual Environment (Recommended)  
```sh
python -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate      # On Windows
```

### 3️⃣ Install Dependencies  
```sh
pip install -r requirements.txt
```

### 4️⃣ Configure Environment Variables  
Create a `.env` file in the **backend** folder and add:  
```
API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_uri_here
DEBUG=True
```

### 5️⃣ Run the Backend Locally  
```sh
uvicorn main:app --reload
```
The API will be available at **`http://127.0.0.1:8000`**.

---

## 🚀 Deployment  

### **Deploying on Railway**  
1. Push your code to GitHub:  
   ```sh
   git add .
   git commit -m "Initial commit"
   git push origin backend
   ```
2. Go to **[Railway](https://railway.app/)** and create a new project.  
3. Connect your **GitHub repository**.  
4. Set up **environment variables** (`API_KEY`, `MONGODB_URI`).  
5. Deploy and get your API URL! 🚀  

### **Deploying on Heroku**  
1. Login to Heroku:  
   ```sh
   heroku login
   ```
2. Create a Heroku app:  
   ```sh
   heroku create your-app-name
   ```
3. Set environment variables:  
   ```sh
   heroku config:set API_KEY=your_api_key_here
   heroku config:set MONGODB_URI=your_mongodb_uri_here
   ```
4. Deploy:  
   ```sh
   git push heroku backend:main
   ```

---

## 📌 API Endpoints (Basic Overview)  

| Method | Endpoint                | Description                 |
|--------|-------------------------|-----------------------------|
| `POST` | `/generate-question`    | Generate AI-based questions |
| `GET`  | `/health`               | Check API status            |
| `GET`  | `/get-question/{id}`    | Retrieve a question by ID   |
| `DELETE` | `/delete-question/{id}` | Delete a question by ID     |

For **detailed API documentation**, see **[api_documentation.md](api_documentation.md)**.

---

## 🤝 Contributing  
1. Fork the repo  
2. Create a new branch (`feature-branch`)  
3. Make your changes  
4. Open a **Pull Request**  

---

## 📜 License  
This project is **open-source** under the **MIT License**.
