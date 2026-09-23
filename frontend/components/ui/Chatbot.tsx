"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";

interface Msg { role: "user" | "bot"; text: string; }

const quickQ = [
  "What are her skills?",
  "Tell me about her projects",
  "Is she available to hire?",
  "Her experience?",
];

export default function Chatbot() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([
    { role: "bot", text: "Hi! 👋 I'm Mishika's AI assistant. Ask me anything about her skills, projects, or availability!" },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: Msg = { role: "user", text: trimmed };
    const currentMsgs = [...msgs];
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: currentMsgs }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "I didn't catch that properly! Please feel free to email Mishika directly at bagrechamishika@gmail.com.";
      setMsgs(m => [...m, { role: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      setMsgs(m => [
        ...m,
        {
          role: "bot",
          text: "I ran into a temporary connection issue! You can reach Mishika directly at bagrechamishika@gmail.com or via the contact form below.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[5000] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-80 bg-cream border border-rose/20 rounded-sm shadow-card-hover flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-charcoal px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose flex items-center justify-center text-lg">💅</div>
              <div className="flex-1">
                <p className="text-cream font-playfair italic text-sm">Ask Barbie</p>
                <p className="text-cream/40 text-xs">Mishika's AI Assistant ✦</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-cream/40 hover:text-cream transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 max-h-64">
              {msgs.map((m, i) => (
                <div key={i} className={`text-sm px-3 py-2 rounded-sm max-w-[88%] leading-relaxed ${
                  m.role === "bot"
                    ? "bg-blush text-charcoal self-start"
                    : "bg-charcoal text-cream self-end"
                }`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="bg-blush text-charcoal self-start text-sm px-3 py-2 rounded-sm">
                  <span className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} className="inline-block w-1 h-1 bg-rose rounded-full" />
                    ))}
                  </span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {quickQ.map(q => (
                <button
                  key={q}
                  disabled={typing}
                  onClick={() => send(q)}
                  className="text-xs px-2.5 py-1 rounded-full border border-rose/30 text-rose hover:bg-rose hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 px-3 pb-3">
              <input
                value={input}
                disabled={typing}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder={typing ? "Barbie is typing..." : "Ask anything..."}
                className="flex-1 text-sm border border-rose/20 rounded-full px-4 py-2 bg-transparent outline-none focus:border-rose transition-colors disabled:opacity-60"
              />
              <button
                disabled={typing || !input.trim()}
                onClick={() => send(input)}
                className="w-9 h-9 rounded-full bg-rose text-white flex items-center justify-center hover:bg-charcoal transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full bg-charcoal shadow-glow flex items-center justify-center text-cream hover:bg-rose transition-colors"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
