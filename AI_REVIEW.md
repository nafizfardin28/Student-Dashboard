# 🤖 AI_REVIEW.md

This file provides a self-evaluation of how AI assisted me in the development of this project.

---

## ✅ What AI Did Well

### 1. Rapid Scaffolding
AI really helped me building project structure

AI helped quickly generate:

* Backend routes
* Prisma schema
* React component structure

This significantly reduced initial development time.

---

### 2. Debugging Assistance

AI was useful in identifying:

* CORS issues between Vercel and Render
* Prisma configuration errors
* ZOD validation errors
* API integration mistakes
* Generating Real Time Charts for Student Profiles

It helped narrow down problems faster than manual debugging.

---

## ⚠️ What Required Manual Fixes

### 1. CORS & API Issues

AI suggestions were not always production-ready.

Issues faced:

* Failed to fetch errors when frontend (Vercel) called backend (Render)
* Incorrect CORS handling

Fix:

* Corrected backend CORS configuration
* Standardized API calls using Axios client

---

### 2. Validation Logic (Zod)

AI initially suggested:

```ts
createSchema.partial()
```

Problem:

* Broke update APIs due to strict validation

Fix:

* Wrote custom update schemas manually

---

## ⚠️ Technical Debt

### Page Reload-Based State Management

Current implementation uses:

```ts
window.location.reload();
```

Reason:

* Faster to implement within time constraints

Drawback:

* Not optimal UX
* Inefficient compared to state-based updates

Future Fix:

* Replace with React state management (React Query / Zustand)

---

## 🧠 Final Thoughts

AI was extremely helpful for:

* Designing Database
* Structure
* Debugging guidance
* 
* Project Deployment

However, manual intervention was necessary for:

* Real-world issues
* Production-level fixes
* Final polish and decision-making

---
