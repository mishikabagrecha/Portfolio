// ================================================================
//  EDIT YOUR PERSONAL INFO HERE — ALL CONTENT IN ONE FILE
// ================================================================

export const personal = {
  name:     "Mishika Bagrecha",
  role:     "AI/ML Engineer & Agentic AI Specialist",
  subtitle: "AI/ML Engineer · Agentic AI · Computer Vision Specialist",
  tagline:  "Breaking stereotypes, building intelligent systems.",
  brand:    "Pretty Smart.",
  email:    "bagrechamishika@gmail.com",
  linkedin: "https://www.linkedin.com/in/mishika-bag/",
  github:   "https://github.com/mishikabagrecha",
  leetcode: "https://leetcode.com/mishikabagrecha",
  resume:   "/Mishika_Resume.pdf",   // PDF inside /public
  about: {
    quote: "I didn't find my place in tech — I built it.",
    paragraphs: [
      "I'm Mishika — an AI/ML Engineer specializing in end-to-end machine learning pipelines, computer vision architectures, and agentic AI systems. My journey started with one question: what if machines could think? That curiosity became code, and code became impact.",
      "I develop robust, scalable AI applications — from real-time driver safety monitoring using facial landmarks to full-stack AI virtual closets and NLP resume screening engines. I don't just train models, I engineer production solutions.",
      "My mission: bridge cutting-edge AI research and production-ready engineering — proving that being powerful, visionary, and feminine is a true superpower.",
    ],
    badges: ["Open to Opportunities","AI/ML Engineer","Agentic AI","Computer Vision","Generative AI"],
  },
};

// ── Skills ────────────────────────────────────────────────────────
export const skills = [
  {
    category: "AI / ML Collection",
    icon: "🧠",
    subtitle: "Core Wardrobe",
    tags: ["Python","PyTorch","Scikit-Learn","OpenCV","Deep Learning","Computer Vision","Machine Learning"],
  },
  {
    category: "Agentic AI & GenAI",
    icon: "✨",
    subtitle: "Statement Piece",
    tags: ["Generative AI","AI Agents","Transformers","RAG","Prompt Engineering","NLP"],
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    subtitle: "Power Accessories",
    tags: ["NumPy","Pandas","Matplotlib","Data Analysis","SQL","DBMS"],
  },
  {
    category: "Languages & Tools",
    icon: "💻",
    subtitle: "Foundation",
    tags: ["Python","C/C++","SQL","Git","FastAPI"],
  },
  {
    category: "CS Fundamentals",
    icon: "🏗️",
    subtitle: "Built to Last",
    tags: ["DSA","OOP","DBMS","OS","Computer Networks","AI Strategy"],
  },
];

// ── Projects ──────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Driver Drowsiness Detection System",
    emoji: "🚗",
    gradient: "from-blush to-lavender",
    bgHex: "linear-gradient(135deg,#f4d4db,#d4c5e8)",
    tagline: "Real-time driver safety with facial landmarks",
    desc: "Real-time computer vision driver safety system monitoring eye closure (EAR), mouth aspect ratio (MAR), and facial landmarks to detect drowsiness and yawning with automated alerts.",
    problem: "Drowsy driving causes millions of road accidents globally every year.",
    tech: ["Python","OpenCV","dlib","Facial Landmarks","EAR & MAR","Real-time Alerts"],
    highlights: ["Facial Landmark Tracking","EAR & MAR Analysis","Yawn & Fatigue Alerts","Real-time Detection"],
    github: "https://github.com/mishikabagrecha/driver-drowsiness-detection",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "ARMMADIO — AI Virtual Wardrobe",
    emoji: "👗",
    gradient: "from-lavender to-blush",
    bgHex: "linear-gradient(135deg,#e8d5e8,#f4d4db)",
    tagline: "AI-Powered Virtual Closet & Stylist",
    desc: "Full-stack AI virtual closet enabling semantic wardrobe search, personalized styling recommendations, automated outfit generation, and intelligent packing assistance.",
    problem: "Curating outfits and organizing personal wardrobes lacks intelligent, personalized automation.",
    tech: ["Python","Generative AI","Computer Vision","Semantic Search","FastAPI"],
    highlights: ["Semantic Wardrobe Search","Personalized Styling","Outfit Generation","Packing Assistance"],
    github: "https://github.com/mishikabagrecha/Armmadio-",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AI Resume Analyzer",
    emoji: "📄",
    gradient: "from-rose/20 to-blush",
    bgHex: "linear-gradient(135deg,#f5c5b8,#f4d4db)",
    tagline: "NLP-powered ATS screening & skill gap evaluator",
    desc: "Engineered an AI-powered resume evaluation and screening system using NLP to parse resumes, extract key skills, qualifications, and experience, and score candidates against job descriptions by flagging skill gaps.",
    problem: "75% of resumes are filtered out without actionable feedback for job seekers.",
    tech: ["Python","NLP","Scikit-Learn","BERT","spaCy","FastAPI"],
    highlights: ["NLP Resume Parsing","ATS Score Matching","Skill Gap Detection","Keyword Extraction"],
    github: "https://github.com/mishikabagrecha/AI_Resume_Analyzer",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Mentara — CDC Mentor-Mentee Platform",
    emoji: "🎓",
    gradient: "from-gold/20 to-lavender",
    bgHex: "linear-gradient(135deg,#c9a96e20,#d4c5e8)",
    tagline: "Role-based CDC management portal",
    desc: "Developed a role-based Career Development Cell platform with dedicated portals for Admin, Mentor, and Mentee to streamline mentor-mentee activities, tasks, announcements, and placement coordination.",
    problem: "Campus placement coordination and mentorship tracking are often fragmented across disparate tools.",
    tech: ["FastAPI","Python","MongoDB","Role-Based Auth"],
    highlights: ["Admin/Mentor/Mentee Portals","Placement Coordination","Task Tracking","Announcements"],
    github: "https://github.com/mishikabagrecha",
    demo: "#",
    featured: false,
  },
];

// ── Achievements ──────────────────────────────────────────────────
export const stats = [
  { icon: "🏆", number: "2+",   label: "Hackathons Won" },
  { icon: "📜", number: "5+",   label: "Certifications" },
  { icon: "💼", number: "2",    label: "AI/ML Internships" },
  { icon: "⚡", number: "350+", label: "LeetCode Problems" },
];

export const timeline = [
  {
    date:  "2023 – 2027",
    title: "B.Tech Computer Science Engineering (RL)",
    org:   "Acropolis Institute of Technology and Research",
    desc:  "Specializing in AI/ML & Reinforcement Learning with strong computer science theory and practical AI system development.",
  },
  {
    date:  "2024",
    title: "AI Intern — IBM SkillsBuild",
    org:   "In collaboration with AICTE · 6 Weeks",
    desc:  "Intensive internship focusing on AI Strategy, Business Intelligence, and data insights to drive simulated business workflows.",
  },
  {
    date:  "2024",
    title: "Machine Learning Intern — YuvaIntern",
    org:   "Supervised ML & Pipeline Engineering",
    desc:  "Built supervised learning models end-to-end with hyperparameter tuning, data cleaning, and validation using Scikit-Learn.",
  },
  {
    date:  "2024",
    title: "Hackathon Winner — Innovik 6.0 & Innovik 5.0",
    org:   "2+ Wins · Top 5 in National/International Hackathons",
    desc:  "Lead AI/ML developer & presenter building innovative solutions under tight competitive deadlines.",
  },
  {
    date:  "2023",
    title: "AI Fluency & Agent Certifications",
    org:   "Anthropic · IBM · Oracle · Google",
    desc:  "Certified in Anthropic AI Fluency, IBM AI Agent Building, Oracle Cloud AI Foundations 2025, and Google GenAI.",
  },
];

// ── Chatbot knowledge base ─────────────────────────────────────────
export const chatbotResponses: Record<string, string> = {
  skills:     "Mishika is skilled in Python, PyTorch, Scikit-Learn, OpenCV, Generative AI, Agentic AI, Data Analysis (NumPy, Pandas), and SQL. She specializes in Computer Vision and AI/ML pipelines. ✦",
  projects:   "Her flagship projects include the ARMMADIO AI Virtual Closet, Driver Drowsiness Detection System, AI Resume Analyzer, and Mentara CDC Platform. 💫",
  hire:       "Yes! Mishika is actively seeking AI/ML, Agentic AI, and Computer Vision roles. She ships high-performance models and production applications. Reach out at bagrechamishika@gmail.com! 🚀",
  experience: "She completed AI internships at IBM SkillsBuild (AI Strategy & BI) and YuvaIntern (Supervised ML), won Innovik 6.0 and 5.0 Hackathons, and holds 5+ AI certifications. ✨",
  education:  "B.Tech in Computer Science Engineering (RL) at Acropolis Institute of Technology and Research (2023–2027).",
  contact:    "You can reach Mishika at bagrechamishika@gmail.com or on LinkedIn: linkedin.com/in/mishika-bag. She usually responds within 24 hours! 💌",
  default:    "Great question! Mishika is an AI/ML Engineer specializing in Computer Vision, GenAI, and Agentic AI. Want to know about her skills, projects, hackathon wins, or how to hire her? ✦",
};
