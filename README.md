# 🎓 Student Dashboard

A full-stack web application to manage students, scholarships, and mentorship meetings in a structured and user-friendly dashboard.

---

## 🚀 Live Demo

* 🌐 **Frontend (Vercel):** https://student-dashboard-pi-one.vercel.app
* ⚙️ **Backend (Render):** https://student-dashboard-backend-bk7r.onrender.com/api

---

## 📌 Features

### 👨‍🎓 Student Management

* Add new students
* View all students in a dashboard
* Search and filter students
* View detailed student profiles

---

### 🎓 Scholarship Tracking

* Add scholarships per student
* Update scholarship status:

  * Researching
  * Applied
  * Interview
  * Awarded
  * Rejected

---

### 🤝 Mentorship & Meetings

* Schedule meetings with mentors
* Update meeting status:

  * Scheduled
  * Completed
  * Cancelled
* Add meeting duration and notes

---

### 📊 Dashboard Insights

* Total student count
* Quick overview of scholarships
* Meeting tracking system

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → Render PostgreSQL

---

## ⚙️ Local Setup

### 🔹 Clone the Repository

```bash
git clone https://github.com/nafizfardin28/Student-Dashboard.git
cd Student-Dashboard
```

---

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL=your_postgres_url
PORT=5000
```

Run backend:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🌍 Deployment Guide

### Backend (Render)

* Create **Web Service**
* Root Directory: `backend`
* Build Command:

  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy && npm run build
  ```
* Start Command:

  ```bash
  npm start
  ```
* Environment Variables:

  ```env
  DATABASE_URL=your_render_database_url
  PORT=10000
  ```

---

### Frontend (Vercel)

* Root Directory: `frontend`
* Build Command:

  ```bash
  npm run build
  ```
* Output Directory:

  ```bash
  dist
  ```
* Environment Variable:

  ```env
  VITE_API_BASE_URL=https://student-dashboard-backend-bk7r.onrender.com/api
  ```

---

## 📂 Project Structure

```text
Student-Dashboard/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
```

---

## ⚠️ Notes

* Render free tier may cause **cold start delays**
* Local and deployed databases are separate
* Data added locally will not reflect in deployed app

---

## ✨ Future Improvements

* Authentication system (login/signup)
* Role-based access control
* Notification system
* Analytics dashboard

---

## 👨‍💻 Author

**Nafiz Fardin**
GitHub: https://github.com/nafizfardin28

---

## ⭐ Summary

This project demonstrates a complete full-stack workflow:

* REST API development
* Database integration with Prisma
* Responsive frontend UI
* Deployment on cloud platforms

---
