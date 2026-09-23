"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Send, Linkedin, Github, Mail, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personal } from "@/lib/data";
import AmbientParticles from "@/components/ui/AmbientParticles";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const TARGET_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "bagrechamishika@gmail.com";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === "error") setStatus("idle");
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field validation
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!trimmedSubject) {
      setStatus("error");
      setErrorMessage("Please enter a subject.");
      return;
    }
    if (!trimmedMessage) {
      setStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    let sent = false;

    // ── Strategy 1: EmailJS ──────────────────────────────────────────
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        const templateParams = {
          name: trimmedName,
          from_name: trimmedName,
          email: trimmedEmail,
          from_email: trimmedEmail,
          reply_to: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          to_email: TARGET_EMAIL,
        };

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        if (result.status === 200 || result.text === "OK") {
          sent = true;
        }
      } catch (err: any) {
        console.warn("EmailJS failed:", err);
      }
    }

    // ── Strategy 2: Web3Forms fallback ──────────────────────────────
    if (!sent && WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: trimmedName,
            email: trimmedEmail,
            reply_to: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
            to_email: TARGET_EMAIL,
            from_name: "Mishika Portfolio ✦",
          }),
        });
        const data = await res.json();
        if (data.success) sent = true;
      } catch (err) {
        console.warn("Web3Forms fallback failed:", err);
      }
    }

    // ── Strategy 3: Backend API fallback ────────────────────────────
    if (!sent && BACKEND) {
      try {
        const res = await fetch(`${BACKEND}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
          }),
        });
        const data = await res.json();
        if (data.success) sent = true;
      } catch {
        // Backend not running or unreachable
      }
    }

    if (sent) {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrorMessage("");
    } else {
      setStatus("error");
      if (!EMAILJS_SERVICE_ID && !WEB3FORMS_KEY) {
        setErrorMessage("Email service is not yet configured. Please set your EmailJS credentials in .env.local.");
      } else {
        setErrorMessage("Failed to send message. Please check your connection and try again.");
      }
    }
  };

  const socials = [
    { icon: <Mail size={20} />,    label: "Email",    sub: personal.email,    href: `mailto:${personal.email}` },
    { icon: <Linkedin size={20} />, label: "LinkedIn", sub: "linkedin.com/in/mishika-bag", href: personal.linkedin },
    { icon: <Github size={20} />,  label: "GitHub",   sub: "github.com/mishikabagrecha",  href: personal.github },
  ];

  const inputCls = `w-full border border-rose/30 rounded-sm px-4 py-3 text-sm bg-white/[0.08]
    text-cream placeholder:text-cream/60 outline-none
    focus:border-rose focus:bg-white/[0.12] transition-colors duration-200
    disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <section id="contact" className="py-28 px-6 bg-charcoal relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-rose/5 blur-[120px]" />
      <AmbientParticles count={6} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label font-bold text-rose">✦ Section 06</p>
          <h2 className="section-title section-title-light font-playfair font-bold text-cream text-3xl sm:text-4xl">Let&apos;s Build Something Beautiful</h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">
          {/* ── Left — Social links + copy ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-cream/90 text-[0.98rem] leading-[1.95] mb-8 font-normal">
              Whether you&apos;re looking to collaborate, discuss an AI opportunity, or connect on cutting-edge research — I&apos;d love to hear from you.
              I&apos;m currently open to AI/ML Engineering and Agentic AI roles. Let&apos;s build intelligent systems that make real impact.
            </p>

            <div className="space-y-3 mb-10">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 border border-rose/30 rounded-sm bg-white/[0.05]
                    hover:border-rose hover:bg-rose/15 hover:translate-x-1.5 transition-all duration-250 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-full bg-rose/20 flex items-center justify-center text-rose flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cream">{s.label}</p>
                    <p className="text-xs font-medium text-cream/80">{s.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="border border-rose/30 rounded-sm p-5 bg-white/[0.06]">
              <p className="font-playfair italic font-bold text-cream mb-1">Response time</p>
              <p className="text-cream/90 text-sm font-medium">Usually within 24 hours ✦</p>
            </div>
          </motion.div>

          {/* ── Right — Form ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <CheckCircle size={52} className="text-rose mb-4" />
                <h3 className="font-playfair text-2xl text-cream mb-2">Message sent successfully! ✦</h3>
                <p className="text-cream/80 text-sm max-w-xs">
                  Thank you for reaching out! I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className="mt-6 text-xs tracking-widest uppercase px-6 py-2.5 rounded-full
                    border border-rose/30 text-rose hover:bg-rose hover:text-white transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.72rem] tracking-widest uppercase text-cream/80 font-semibold block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={change}
                      required
                      disabled={status === "sending"}
                      placeholder="Jane Smith"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[0.72rem] tracking-widest uppercase text-cream/80 font-semibold block mb-1.5">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={change}
                      required
                      disabled={status === "sending"}
                      placeholder="hello@company.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[0.72rem] tracking-widest uppercase text-cream/80 font-semibold block mb-1.5">
                    Subject *
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={change}
                    required
                    disabled={status === "sending"}
                    placeholder="Internship opportunity / Collaboration"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="text-[0.72rem] tracking-widest uppercase text-cream/80 font-semibold block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={change}
                    required
                    disabled={status === "sending"}
                    rows={5}
                    placeholder="Tell me about the opportunity, your company, or what you'd like to build together..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="bg-rose/10 border border-rose/30 rounded-sm px-4 py-3 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={16} className="text-rose flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-rose text-xs font-medium mb-0.5">
                          {errorMessage || "Failed to send message. Please try again."}
                        </p>
                        <p className="text-cream/60 text-xs">
                          Please verify your inputs and try again.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-xs text-rose/80 hover:text-white underline underline-offset-2 flex-shrink-0"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full justify-center inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                    bg-rose text-white text-xs tracking-widest uppercase
                    hover:bg-white hover:text-rose transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={15} /> Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
