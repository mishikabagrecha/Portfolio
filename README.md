# Mishika Portfolio — Pretty Smart. ✦

> CEO Barbie × Tech Founder Energy | AI/ML Engineer Portfolio

---

## 🗂 Project Structure

```
mishika-portfolio/
├── frontend/           # Next.js 14 + Tailwind + Framer Motion
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── sections/   # Hero, About, Skills, Projects, Achievements, Resume, Contact, Footer, Navbar
│   │   └── ui/         # Loader, Chatbot, CustomCursor, RecruiterModal
│   ├── lib/
│   │   └── data.ts     # ← EDIT ALL YOUR CONTENT HERE
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   │   └── Mishika_Resume.pdf  ← PUT YOUR RESUME HERE
│   ├── .env.local
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── backend/            # Node.js + Express + MongoDB + Nodemailer
    ├── controllers/
    │   └── contactController.js
    ├── models/
    │   └── Contact.js
    ├── routes/
    │   └── contact.js
    ├── server.js
    └── .env
```

---

## 🚀 STEP-BY-STEP SETUP

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- MongoDB Atlas account (free) — https://cloud.mongodb.com
- Gmail account for email notifications

---

### STEP 1 — Clone / copy the files
Copy all files into the structure above on your machine.

---

### STEP 2 — Frontend setup

```bash
cd mishika-portfolio/frontend
npm install
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Put your resume PDF inside `frontend/public/Mishika_Resume.pdf`

Edit ALL your personal content in `lib/data.ts` — name, links, projects, etc.

Run dev server:
```bash
npm run dev
# → http://localhost:3000
```

---

### STEP 3 — Backend setup

```bash
cd mishika-portfolio/backend
npm install
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/mishika_portfolio
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password   # Gmail App Password
EMAIL_TO=your_email@gmail.com
FRONTEND_URL=http://localhost:3000
```

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Search "App passwords" → Generate for "Mail"
4. Copy the 16-char password into EMAIL_PASS

Run dev server:
```bash
npm run dev
# → http://localhost:5000
```

---

### STEP 4 — MongoDB setup (free)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Add your IP to Network Access (or use 0.0.0.0/0 for all)
4. Create database user
5. Get connection string → paste into MONGO_URI

---

## 🌐 DEPLOYMENT

### Frontend → Vercel (recommended)
```bash
cd frontend
npm run build      # test build locally first
```
Then:
1. Push to GitHub
2. Go to https://vercel.com → Import project
3. Add env vars from `.env.local` in Vercel dashboard
4. Deploy!

### Backend → Render (free)
1. Push backend to GitHub
2. Go to https://render.com → New Web Service
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add all `.env` variables in Render dashboard
6. Deploy!

After deploying backend, update `NEXT_PUBLIC_API_URL` in Vercel to your Render URL.

---

## ✏️ CUSTOMISATION GUIDE

| What to change         | Where to edit                        |
|------------------------|--------------------------------------|
| Name, bio, links       | `frontend/lib/data.ts` → `personal`  |
| Skills                 | `frontend/lib/data.ts` → `skills`    |
| Projects               | `frontend/lib/data.ts` → `projects`  |
| Timeline & stats       | `frontend/lib/data.ts` → `timeline`  |
| Colors                 | `frontend/tailwind.config.ts`        |
| Global styles          | `frontend/styles/globals.css`        |
| Profile photo          | Replace emoji in `About.tsx` with `<Image>` |
| Resume PDF             | `frontend/public/Mishika_Resume.pdf` |
| Chatbot answers        | `frontend/lib/data.ts` → `chatbotResponses` |

---

## ✦ Features

- ✅ Premium loading screen with progress counter
- ✅ Custom rose-pink cursor with ring follower
- ✅ Animated hero with TypeAnimation
- ✅ About section with floating stat cards
- ✅ Skills as dark-mode glassmorphism cards
- ✅ Project cards with modal detail view
- ✅ Achievements with animated timeline
- ✅ Resume preview with skill bars + download
- ✅ Contact form → MongoDB + Nodemailer email
- ✅ "Ask Barbie" AI chatbot (bottom-right)
- ✅ Barbie Mode toggle (hue-rotate filter)
- ✅ Recruiter Quick View modal
- ✅ Scroll-reveal animations (Framer Motion)
- ✅ Glassmorphism UI throughout
- ✅ Mobile responsive
- ✅ Easter egg in Resume section
- ✅ Rate-limited, secured backend (Helmet + CORS)
- ✅ Auto-reply email to contact form sender

---

## 📦 Tech Stack

| Layer     | Tech                                              |
|-----------|---------------------------------------------------|
| Frontend  | Next.js 14, React 18, TypeScript, Tailwind CSS    |
| Animation | Framer Motion, react-type-animation               |
| Icons     | Lucide React                                      |
| Backend   | Node.js, Express.js                               |
| Database  | MongoDB + Mongoose                                |
| Email     | Nodemailer (Gmail SMTP)                           |
| Deploy    | Vercel (frontend) + Render (backend)              |

---

**Pink. Powerful. Programmable. ✦**
