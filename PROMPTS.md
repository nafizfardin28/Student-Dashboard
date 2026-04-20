# 🧠 PROMPTS.md

This file documents key prompts used during the development of the **Student Dashboard** project, including architecture decisions, debugging, and feature implementation.

---

## 🔹 1. Initial Project Setup

**Prompt:**

> “read all the images ,, tell what the project is about ,what it wants me to do and how to start implementing everything should be according to the images”

**Outcome:**

* What the project is about
* What the project wants:

  * Module 1: Student Directory
  * Module 2: Student Profile Dashboard
  * Module 3: Scholarship Management
  * Module 4: Mentorship and Meetings
* Technical Requirements
* Files that must be submitted
---

## 🔹 2. Database & Schema Design

**Prompt:**

> “Best way to start implementing”

**Outcome:**

* Understand the architecture
 * need two folders:
    * frontend/
    * backend/
* Design Backend First
* Build API routes
* Add Validation early
* Seed the Database

---

## 🔹 3. API Design

**Prompt:**

> “Create REST API routes for this project”

**Outcome:**

* Express routes structured:

  * `/api/students`
  * `/api/scholarships`
  * `/api/meetings`
  * `/api/mentors`

---

## 🔹 4. Frontend Component Architecture

**Prompt:**

> “Break down the UI into reusable React components for a student dashboard.”

**Outcome:**

* Modular component structure:

  * `StudentCard`
  * `ScholarshipSection`
  * `MeetingSection`
  * Forms for adding/editing data
* Page separation:

  * Student Directory
  * Student Profile

---

## 🔹 5. API Integration

**Prompt:**

> “Create a centralized API client using Axios for React.”

**Outcome:**

* `client.ts` created
* API abstraction layer:

  * `getStudents`
  * `createMeeting`
  * `updateScholarship`

---

## 🔹 6. Debugging (Critical)

### CORS Issue

**Prompt:**

> “Fix ‘Failed to fetch’ error when calling backend from Vercel frontend.”

**Outcome:**

* Identified CORS preflight issue
* Replaced `fetch` with Axios
* Fixed API communication

---

### Meeting Status Update Bug

**Prompt:**

> “Why does updating meeting status fail but data still updates?”

**Outcome:**

* Found validation issue with Zod `.partial()`
* Fixed update schema
* Improved error handling

---

### Render Deployment Errors

**Prompt:**

> “Fix Prisma DATABASE_URL and deployment issues on Render.”

**Outcome:**

* Added environment variables correctly
* Fixed Prisma migration issues
* Ensured backend deployment success

---

## 🔹 7. Deployment

**Prompt:**

> “Deploy full-stack app using Vercel and Render.”

**Outcome:**

* Backend → Render
* Frontend → Vercel
* Connected via environment variables

---

## 🔹 8. UI/UX Improvements

**Prompt:**

> “Improve dropdown UI and status indicators.”

**Outcome:**

* Replaced plain dropdown with badge + select
* Improved readability and design

---



---

