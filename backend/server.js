require("dotenv").config();
const express     = require("express");
const mongoose    = require("mongoose");
const cors        = require("cors");
const helmet      = require("helmet");
const rateLimit   = require("express-rate-limit");
const contactRouter = require("./routes/contact");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security middleware ─────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://mishika-portfolio.vercel.app",
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Rate limiting ───────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 min
  max: 50,                    // max 50 contact submissions per 15 min per IP
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/contact", limiter);

// ── MongoDB connection (graceful — works without it) ────────────
const MONGO_URI = process.env.MONGO_URI || "";
const hasValidMongo = MONGO_URI && !MONGO_URI.includes("<user>") && !MONGO_URI.includes("<password>");

if (hasValidMongo) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✦ MongoDB connected"))
    .catch(err => {
      console.warn("⚠ MongoDB connection failed:", err.message);
      console.warn("⚠ Running in memory-only mode — messages won't persist across restarts");
    });
} else {
  console.log("✦ No MongoDB configured — running in memory-only mode");
  console.log("  To persist messages, add a valid MONGO_URI to backend/.env");
}

// Make DB status available to controllers
app.set("dbConnected", hasValidMongo);

// ── Routes ──────────────────────────────────────────────────────
app.get("/", (_req, res) =>
  res.json({ message: "Mishika Portfolio API ✦ — Pretty Smart.", status: "running" })
);
app.use("/api/contact", contactRouter);

// ── 404 ──────────────────────────────────────────────────────────
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found." })
);

// ── Global error handler ─────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✦ Server running on http://localhost:${PORT}`);
  console.log(`✦ Environment: ${process.env.NODE_ENV || "development"}`);
});
