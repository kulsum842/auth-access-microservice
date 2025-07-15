# 🔐 Authentication & Access Control Microservice

This is a full-stack authentication and authorization system built using **Node.js + Express (backend)** and **React + Axios (frontend)**.

It supports secure user registration, login, email verification, password reset, refresh token rotation, and automatic token renewal on the frontend using Axios interceptors.

---

## 🚀 Features

✅ Secure user registration with email verification  
✅ JWT-based login with access + refresh tokens  
✅ Refresh token rotation + secure cookie storage  
✅ Forgot/Reset password via email  
✅ Axios auto-refresh on 401 errors  
✅ Protected routes (user, admin)  
✅ Role-based access control  
✅ Logout with token invalidation  
✅ React frontend with routing and localStorage  
✅ Fully modular codebase and ready for deployment

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (Access & Refresh Tokens)
- Nodemailer
- Bcrypt

**Frontend:**
- React (with Vite)
- Axios
- React Router

---

## 🗂️ Project Structure

auth-microservice-project/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── .env.example
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── .env.example
│ ├── vite.config.js
│ └── package.json


---

## 🔐 .env Configuration

Create a `.env` file in `backend/` using:

```env
PORT=5000
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
MONGO_URI=your_mongo_connection_string
BASE_URL=http://localhost:5000
REDIRECT_BASE_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

💻 Getting Started
🔧 Backend Setup

cd backend
npm install
npm run dev

Runs server at http://localhost:5000

MongoDB and email configs must be correctly set

🎨 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs client at http://localhost:5173

Make sure CORS and proxy settings allow backend communication

🧠 Future Improvements
Google/GitHub social login (OAuth)
Multi-Factor Authentication (MFA)
Admin dashboard with user management
Rate limiting with Redis
Deployment