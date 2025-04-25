# 🚀 TrueHire

**TrueHire** is a streamlined hiring platform that bridges the gap between **students** seeking internships/jobs and **HR professionals** looking for qualified candidates. Designed in 24 hours for the **HackTheVerse 2025 Hackathon**, this full-stack web app aims to simplify the application, shortlisting, and selection process with a powerful dashboard for both candidates and recruiters.

---

## 📌 Problem Statement

Today’s graduates face a paradox: **“Experience required for entry-level jobs”**, while employers struggle to discover fresh talent effectively.

- 🧑‍🎓 Only **8.25%** of Indian graduates get jobs matching their qualifications
- 🧳 Over **50%** are underemployed in low-skill roles
- ❗ Limited internship opportunities despite a growing student base

---

## ✅ Our Solution: TrueHire

An easy-to-use web platform where:
- 🎯 **Candidates** can register, apply to jobs, and track their status
- 🧑‍💼 **HRs** can post jobs, view applicants, and update hiring statuses in real-time

---

## ✨ Features

### 👤 Candidate Portal
- Register with resume upload
- Browse & apply to job listings
- Track application status (Shortlisted / Selected / Rejected)

### 🧑‍💼 HR Portal
- Secure login
- Post new job requirements
- View and manage applications
- Update application status
- View all applied candidates for each job in a modal
- Mark job requirements as "Satisfied"

### 📊 Dashboard
- Clean, modern UI using TailwindCSS and Framer Motion
- Role-based rendering for candidates & HR

---

## 🛠️ Tech Stack

| Layer        | Tech Used                      |
|--------------|-------------------------------|
| Frontend     | Next.js, Tailwind CSS, Axios, Framer Motion |
| Backend      | Node.js, Express.js, MongoDB, JWT |
| Deployment   | [Your deployment platform here] |

---

## 🔐 Authentication & Security

- JWT-based login
- Cookie-based session management
- Role-based access control for HR vs Candidate

---

## 📈 Future Scope

- 🤖 AI-powered resume screening & matching
- 📬 Notification system (Email/SMS)
- 🏫 College-wise analytics & hiring metrics
- 📱 Responsive mobile app version

---

## 📦 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/Uzair-1006/truehire.git
cd truehire
\
2. Backend Setup

cd backend
npm install
npm start
3. Frontend Setup

cd frontend
npm install
npm run dev
Make sure to add your .env variables for both frontend and backend!

