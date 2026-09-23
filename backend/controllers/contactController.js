const Contact    = require("../models/Contact");
const nodemailer = require("nodemailer");

// ── In-memory store (fallback when no DB) ───────────────────────
const inMemoryMessages = [];

// ── Nodemailer transporter ──────────────────────────────────────
let transporter = null;
const hasEmailConfig = process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  !process.env.EMAIL_USER.includes("your_gmail") &&
  !process.env.EMAIL_PASS.includes("your_16_char");

if (hasEmailConfig) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── HTML email template ─────────────────────────────────────────
const buildEmail = ({ name, email, subject, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family:'DM Sans',Arial,sans-serif; background:#fdf6f0; margin:0; padding:0; }
    .wrap { max-width:560px; margin:30px auto; background:#fff;
      border:1px solid #f4d4db; border-radius:2px; overflow:hidden; }
    .header { background:#1a1014; padding:28px 32px; }
    .header h1 { color:#fdf6f0; font-size:1.3rem; margin:0; font-style:italic; }
    .header span { color:#c9748a; }
    .body { padding:28px 32px; }
    .row { display:flex; gap:12px; margin-bottom:14px; }
    .label { font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase;
      color:#8a7075; min-width:80px; padding-top:2px; }
    .value { font-size:0.9rem; color:#1a1014; flex:1; }
    .msg-box { background:#fdf6f0; border-left:3px solid #c9748a;
      padding:14px 16px; border-radius:0 2px 2px 0; margin-top:16px; }
    .msg-box p { color:#1a1014; font-size:0.9rem; line-height:1.7; margin:0; }
    .footer { background:#fdf6f0; padding:16px 32px; text-align:center;
      font-size:0.72rem; color:#8a7075; letter-spacing:0.1em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>New message via <span>Mishika</span>'s Portfolio ✦</h1>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">From</span>
        <span class="value">${name}</span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:${email}" style="color:#c9748a;">${email}</a></span>
      </div>
      <div class="row">
        <span class="label">Subject</span>
        <span class="value">${subject}</span>
      </div>
      <div class="msg-box">
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    </div>
    <div class="footer">Mishika Portfolio · Pretty Smart. ✦</div>
  </div>
</body>
</html>`;

// ── POST /api/contact ───────────────────────────────────────────
exports.sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "name, email and message are required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    const contactData = {
      name, email,
      subject: subject || "Portfolio Enquiry",
      message,
      ip: req.ip,
      createdAt: new Date(),
    };

    // Try saving to DB first, fallback to in-memory
    let savedId = null;
    try {
      if (require("mongoose").connection.readyState === 1) {
        const contact = await Contact.create(contactData);
        savedId = contact._id;
      } else {
        throw new Error("No DB connection");
      }
    } catch {
      // Fallback: save in-memory
      savedId = `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      inMemoryMessages.push({ ...contactData, _id: savedId });
      console.log(`✦ Message saved in-memory (ID: ${savedId}) from ${name} <${email}>`);
    }

    // Send email notification (only if email is configured)
    if (transporter) {
      try {
        await transporter.sendMail({
          from:    `"Mishika Portfolio" <${process.env.EMAIL_USER}>`,
          to:      process.env.EMAIL_TO || "bagrechamishika@gmail.com",
          replyTo: email,
          subject: `✦ New message from ${name} — ${subject || "Portfolio Enquiry"}`,
          html:    buildEmail({ name, email, subject: subject || "Portfolio Enquiry", message }),
        });

        // Auto-reply to sender
        await transporter.sendMail({
          from:    `"Mishika" <${process.env.EMAIL_USER}>`,
          to:      email,
          subject: "Got your message! ✦ — Mishika",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:500px;margin:30px auto;padding:32px;background:#fdf6f0;border:1px solid #f4d4db;border-radius:2px;">
              <h2 style="font-style:italic;color:#1a1014;">Hi ${name}! 👋</h2>
              <p style="color:#8a7075;line-height:1.8;">
                Thanks for reaching out! I've received your message and will get back to you within 24 hours.
              </p>
              <p style="color:#8a7075;line-height:1.8;margin-top:12px;">
                In the meantime, feel free to explore my projects on
                <a href="https://github.com/mishikabagrecha" style="color:#c9748a;">GitHub</a> or
                connect on <a href="https://www.linkedin.com/in/mishika-bag/" style="color:#c9748a;">LinkedIn</a>.
              </p>
              <p style="color:#c9748a;font-style:italic;margin-top:24px;">Pink. Powerful. Programmable. ✦</p>
              <p style="color:#1a1014;font-weight:500;">— Mishika</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("⚠ Email send failed:", emailErr.message);
        // Don't fail the request — message is already saved
      }
    } else {
      console.log("✦ Email not configured — skipping email notification");
    }

    res.status(201).json({ success: true, message: "Message sent successfully!", id: savedId });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── GET /api/contact  (admin only — protect with auth in prod) ──
exports.getMessages = async (req, res) => {
  try {
    let messages = [];
    try {
      if (require("mongoose").connection.readyState === 1) {
        messages = await Contact.find().sort({ createdAt: -1 }).limit(50);
      } else {
        throw new Error("No DB");
      }
    } catch {
      // Return in-memory messages
      messages = [...inMemoryMessages].reverse().slice(0, 50);
    }
    res.json({ success: true, count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
