# 🎓 Student Dashboard

A full-stack web application to manage students, scholarships, and mentorship meetings in a structured and user-friendly dashboard.

---

## 🚀 Live Demo

* 🌐 **Frontend (Vercel):** https://student-dashboard-pi-one.vercel.app
* ⚙️ **Backend (Render):**  https://student-dashboard-backend-bk7r.onrender.com

---

## 📌 Features

### 👨‍🎓 Student Directory

* Add new students
* View all students in a dashboard
* Search students by name, email or major in real time
* Filter by academic year and enrollment status
* Student cards showing Name,Major, GPA  credits progress, Status
* Stats overview — total students, Average GPA ,Full Time Students
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
* Edit Scholarship Infos
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
  VITE_API_BASE_URL= https://student-dashboard-backend-bk7r.onrender.com
  
  ```

---

## 📂 Project Structure

## 📂 Project Structure

```text
student-dashboard/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (Prisma models)
│   │   └── seed.ts              # Seed data for initial setup
│   │
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts        # Prisma client instance
│   │   │
│   │   ├── routes/
│   │   │   ├── student.routes.ts       # Student APIs
│   │   │   ├── mentor.routes.ts        # Mentor APIs
│   │   │   ├── scholarship.routes.ts   # Scholarship APIs
│   │   │   └── meeting.routes.ts       # Meeting APIs
│   │   │
│   │   ├── validators/
│   │   │   ├── student.validator.ts
│   │   │   ├── scholarship.validator.ts
│   │   │   └── meeting.validator.ts
│   │   │
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   │
│   ├── .env             # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts        # Axios instance (base URL config)
│   │   │   └── students.ts      # API calls (students, mentors, etc.)
│   │   │
│   │   ├── components/
│   │   │   ├── AddStudentForm.tsx
│   │   │   ├── AddScholarshipForm.tsx
│   │   │   ├── AddMeetingForm.tsx
│   │   │   ├── EditScholarshipForm.tsx
│   │   │   ├── EditMeetingForm.tsx
│   │   │   ├── StudentCard.tsx
│   │   │   ├── ScholarshipSection.tsx
│   │   │   ├── MeetingSection.tsx
│   │   │   ├── AcademicProgressChart.tsx
│   │   │   └── ProfileHeader.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── StudentDirectoryPage.tsx
│   │   │   └── StudentProfilePage.tsx
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   │
│   │
│   ├── .env.example             # Frontend env variables
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── package.json
│   └── index.html
│
├── README.md
├── AI.md
├── prompt.md
└── .gitignore
```

---

## 🧠 Structure Overview

### 🔹 Backend

* Built with **Express + TypeScript**
* Uses **Prisma ORM** for database operations
* Organized into:

  * `routes/` → API endpoints
  * `validators/` → Zod validation schemas
  * `prisma/` → DB schema & seed

---

### 🔹 Frontend

* Built with **React + Vite + TypeScript**
* Uses **Tailwind CSS** for styling
* Organized into:

  * `components/` → UI parts
  * `pages/` → main screens
  * `api/` → API communication layer
  * `types/` → Type definitions

---

### 🔹 API Layer

* Centralized API calls via:

  * `client.ts` → Axios config
  * `students.ts` → All API functions

---

### 🔹 Database

* PostgreSQL via Prisma
* Models:

  * Student
  * Mentor
  * Scholarship
  * Meeting

---

## 🔗 API Endpoints

### 👨‍🎓 Students

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `/api/students`     | Get all students (supports search & filters) |
| GET    | `/api/students/:id` | Get full student profile                     |
| POST   | `/api/students`     | Create a new student                         |
| PUT    | `/api/students/:id` | Update student details                       |
| DELETE | `/api/students/:id` | Delete a student                             |

---

### 👩‍🏫 Mentors

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/api/mentors`     | Get all mentors                   |
| GET    | `/api/mentors/:id` | Get mentor details                |
| POST   | `/api/mentors`     | Create a mentor *(optional/demo)* |
| PUT    | `/api/mentors/:id` | Update mentor *(optional)*        |

---

### 🎓 Scholarships

| Method | Endpoint                               | Description                       |
| ------ | -------------------------------------- | --------------------------------- |
| GET    | `/api/scholarships/student/:studentId` | Get scholarships for a student    |
| POST   | `/api/scholarships`                    | Create a scholarship              |
| PUT    | `/api/scholarships/:id`                | Update scholarship status/details |
| DELETE | `/api/scholarships/:id`                | Delete a scholarship              |

---

### 🤝 Meetings

| Method | Endpoint                           | Description                   |
| ------ | ---------------------------------- | ----------------------------- |
| GET    | `/api/meetings/student/:studentId` | Get meetings for a student    |
| POST   | `/api/meetings`                    | Schedule a meeting            |
| PUT    | `/api/meetings/:id`                | Update meeting status/details |
| DELETE | `/api/meetings/:id`                | Delete a meeting              |

---

## 📊 Data Flow

| Step | Page                   | Action                                |
| ---- | ---------------------- | ------------------------------------- |
| 1    | Student Directory      | View, search, and filter all students |
| 2    | Student Profile        | View detailed student information     |
| 3    | Academic Section       | Track GPA, credits, and progress      |
| 4    | Scholarships Section   | View all scholarships                 |
| 5    | Scholarship Management | Add, update, or delete scholarships   |
| 6    | Meetings Section       | View all mentorship meetings          |
| 7    | Mentorship Management  | Schedule and update meeting status    |

---

## 📋 Status Types

### 🎓 Scholarship Status

| Status         | Meaning                   |
| -------------- | ------------------------- |
| 🔍 Researching | Looking for opportunities |
| 📝 Applied     | Application submitted     |
| 🎤 Interview   | Selected for interview    |
| 🏆 Awarded     | Scholarship received      |
| ❌ Rejected     | Application unsuccessful  |

---

### 🤝 Meeting Status

| Status       | Meaning           |
| ------------ | ----------------- |
| 📅 Scheduled | Meeting planned   |
| ✅ Completed  | Meeting finished  |
| 🚫 Cancelled | Meeting cancelled |

---

## 🔄 API Usage Example

### Update Meeting Status

```ts
await api.put(`/meetings/${id}`, {
  status: "COMPLETED"
});
```

---

### Create Scholarship

```ts
await api.post("/scholarships", {
  studentId,
  name,
  provider,
  amount,
  status: "RESEARCHING"
});
```

---

## 🧠 Key Technical Decisions

### 🤖 AI-Suggested

* Prisma ORM for database interaction and type-safe queries
* PostgreSQL as the primary database
* RESTful API design using Express
* Component-based architecture in React
* Tailwind CSS for fast and responsive UI design
* Axios API layer for centralized request handling

---

### 👨‍💻 My Own Decisions & Overrides

* **Prisma over Sequelize** — Chose Prisma for better TypeScript support and cleaner schema management

* **PostgreSQL (Render)** — Used Render’s free PostgreSQL instead of MySQL to avoid extra deployment complexity

* **Axios instead of Fetch** — Replaced `fetch` with Axios to handle API calls more reliably and avoid CORS/preflight issues

* **Environment-based API config** — Used `.env` with `VITE_API_BASE_URL` to support both local and production environments

* **Separated backend & frontend deployment** — Backend on Render, frontend on Vercel for scalability

* **Zod validation layer** — Added validation schemas to ensure clean and safe API inputs

* **Flat relational schema** — Used direct relational fields instead of nested objects for easier querying and Prisma relations

* **Status-based workflow system** — Designed structured enums for:

  * Scholarship status
  * Meeting status

* **Minimal authentication scope** — Skipped auth as it wasn’t required; focused on core system functionality

* **Reload-based state sync** — Used `window.location.reload()` for simplicity instead of complex state management (time-efficient decision)

---

## 🔒 Security

* `.env` files are gitignored — no sensitive credentials exposed
* Environment variables used for database and API configuration
* Input validation handled via **Zod schemas**
* Only required fields allowed in API requests
* Server-side validation prevents invalid updates

---

## ⚠️ Known Limitations

* **Render free tier cold start** — backend may take ~20–30 seconds to respond after inactivity

* **Separate databases (local vs production)** — data is not synced automatically

* **No authentication system** — currently open access (would add JWT/Auth in production)

* **Page reloads instead of state updates** — not optimized UX, but functional and stable

* **Limited seed/demo data** — initial data must be added manually

---

## 🚀 Future Improvements

* Add authentication (JWT / session-based login)
* Replace page reloads with React state management (React Query / Zustand)
* Add analytics dashboard (charts & insights)
* Implement role-based access (admin/student/mentor)
* Add real-time updates (WebSockets)

---




---

## ⚠️ Notes

* Render free tier may cause **cold start delays**
* Local and deployed databases are separate
* Data added locally will not reflect in deployed app

---


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
