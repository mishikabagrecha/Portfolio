import { NextRequest, NextResponse } from "next/server";
import { MISHIKA_PORTFOLIO_CONTEXT } from "@/lib/chatbotContext";

interface ChatMessage {
  role: "user" | "bot" | "assistant";
  text?: string;
  content?: string;
}

// Fallback response generator adhering strictly to the same grounding context and rules
function generateGroundedFallback(message: string): string {
  const query = message.trim().toLowerCase();

  // 1. Detect off-topic requests (code generation, general trivia, unrelated tasks)
  if (
    query.match(/\b(capital of|president of|prime minister|weather in|crypto|bitcoin|recipe|invert a binary tree|write a (python|javascript|c\+\+|code)|solve this|lyrics|movie)\b/) ||
    (query.includes("python") && query.match(/\b(write|script|program|code|mining)\b/))
  ) {
    return "I can only answer questions related to Mishika Bagrecha's professional background, skills, projects, and availability. For any other questions or collaboration inquiries, feel free to email her directly at bagrechamishika@gmail.com!";
  }

  // 2. Specific project questions (must come before generic 'about her')
  if (
    query.match(/\b(projects?|portfolio|built|applications?|systems?|github|armmadio|drowsiness|resume analyzer|mentara)\b/) ||
    query.includes("tell me about her projects")
  ) {
    return "Her flagship projects include the Driver Drowsiness Detection System using real-time facial landmarks, ARMMADIO (an AI-powered virtual closet with semantic search), the AI Resume Analyzer for ATS evaluation using BERT, and the Mentara CDC platform. You can explore all her source code on GitHub at github.com/mishikabagrecha!";
  }

  // 3. Hiring & availability (must ALWAYS mention open roles + contact)
  if (
    query.match(/\b(hire|hiring|available|availability|job|work with|opportunity|recruit|full[- ]?time|internship|roles?|open to)\b/) ||
    query.includes("is she available to hire")
  ) {
    return "Yes! Mishika is actively open to full-time roles, internships, and opportunities in AI/ML Engineering and Agentic AI. She has hands-on experience shipping production models and real-time computer vision applications. You can reach out directly at bagrechamishika@gmail.com or via the contact form on this site!";
  }

  // 4. Skills & tech stack
  if (
    query.match(/\b(skills?|tech stack|stack|technolog(y|ies)|tools?|languages?|frameworks?|libraries)\b/) ||
    query.includes("what are her skills")
  ) {
    return "Mishika specializes in AI/ML and Computer Vision with core proficiency in Python, PyTorch, Scikit-Learn, and OpenCV. She also has deep expertise in Generative AI, AI Agents, RAG, NLP (BERT, spaCy), and FastAPI, backed by solving over 350+ LeetCode problems.";
  }

  // 5. Experience / internships
  if (
    query.match(/\b(experience|internships?|work history|background|career|ibm|yuvaintern)\b/) ||
    query.includes("her experience")
  ) {
    return "Mishika has completed AI/ML internships at IBM SkillsBuild (focused on AI Strategy & Business Intelligence) and YuvaIntern (supervised learning and ML pipelines). She is also a two-time hackathon winner at Innovik 6.0 and 5.0, leading AI development under competitive deadlines.";
  }

  // 6. Name & identity
  if (
    query.match(/\b(what is her name|who is she|who are you|who's she|who is mishika|her name|full name)\b/) ||
    (query.match(/\btell me about her\b/) && !query.match(/\b(projects?|skills?|experience|work|education)\b/)) ||
    query === "who is mishika" ||
    query === "who is mishika bagrecha"
  ) {
    return "Her name is Mishika Bagrecha. She is an AI/ML Engineer and Agentic AI specialist who builds robust end-to-end machine learning pipelines and computer vision systems. Her mission is to bridge cutting-edge AI research with production-grade engineering.";
  }

  // 7. Hackathons & achievements
  if (query.match(/\b(hackathons?|awards?|troph(y|ies)|achievements?|wins?|innovik)\b/)) {
    return "Mishika has won 2+ hackathons, securing 1st place in both Innovik 6.0 and Innovik 5.0 as lead AI/ML developer. She has also ranked in the Top 5 in National and International hackathons, demonstrating her ability to ship fast, high-impact solutions.";
  }

  // 8. Certifications
  if (query.match(/\b(certifications?|certified|credentials?|ibm agent|anthropic|oracle|google genai)\b/)) {
    return "Mishika holds 5+ industry certifications including Anthropic AI Fluency, IBM AI Agent Building, Oracle Cloud AI Foundations 2025, and Google GenAI. These validate her expertise in modern agent architectures and enterprise cloud AI.";
  }

  // 9. Education / college
  if (query.match(/\b(education|college|university|degree|acropolis|b\.?tech|graduat(e|ion)|study)\b/)) {
    return "Mishika is pursuing her B.Tech in Computer Science Engineering with a specialization in Reinforcement Learning at Acropolis Institute of Technology and Research (2023–2027). Her coursework combines strong CS theory with practical AI system development.";
  }

  // 10. Contact / email / LinkedIn
  if (query.match(/\b(contact|email|reach|linkedin|phone|social|talk)\b/)) {
    return "You can get in touch with Mishika directly via email at bagrechamishika@gmail.com or connect with her on LinkedIn at linkedin.com/in/mishika-bag. She is always excited to discuss AI/ML opportunities and collaborations!";
  }

  // 11. Resume
  if (query.match(/\b(resume|cv|download resume|pdf)\b/)) {
    return "You can preview or download Mishika's résumé directly from the 'Career Blueprint' section of this portfolio, or contact her at bagrechamishika@gmail.com for an updated copy!";
  }

  // 12. Out-of-scope / unknown questions -> decline gracefully without hallucinating
  return "I can only answer questions related to Mishika Bagrecha's professional background, skills, projects, and availability. For anything else or for custom inquiries, please feel free to email her directly at bagrechamishika@gmail.com!";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = (body.message || "").trim();
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. Try Google Gemini if configured
    if (geminiKey) {
      try {
        const contents = [];
        // Add past turns (limit last 6 for context)
        const recentHistory = history.slice(-6);
        for (const h of recentHistory) {
          const role = h.role === "bot" || h.role === "assistant" ? "model" : "user";
          const text = h.text || h.content || "";
          if (text) {
            contents.push({ role, parts: [{ text }] });
          }
        }
        contents.push({ role: "user", parts: [{ text: message }] });

        const model = "gemini-1.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: MISHIKA_PORTFOLIO_CONTEXT }],
            },
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 250,
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            return NextResponse.json({ reply, provider: "gemini" });
          }
        } else {
          console.warn("Gemini API returned error:", res.status, await res.text());
        }
      } catch (err) {
        console.error("Gemini call failed:", err);
      }
    }

    // 2. Try OpenAI if configured
    if (openaiKey) {
      try {
        const messages = [
          { role: "system", content: MISHIKA_PORTFOLIO_CONTEXT },
          ...history.slice(-6).map((h) => ({
            role: h.role === "bot" ? "assistant" : "user",
            content: h.text || h.content || "",
          })),
          { role: "user", content: message },
        ];

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.3,
            max_tokens: 250,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({ reply, provider: "openai" });
          }
        } else {
          console.warn("OpenAI API returned error:", res.status, await res.text());
        }
      } catch (err) {
        console.error("OpenAI call failed:", err);
      }
    }

    // 3. Try Anthropic if configured
    if (anthropicKey) {
      try {
        const messages = [
          ...history.slice(-6).map((h) => ({
            role: h.role === "bot" ? "assistant" : ("user" as const),
            content: h.text || h.content || "",
          })),
          { role: "user" as const, content: message },
        ];

        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            system: MISHIKA_PORTFOLIO_CONTEXT,
            messages,
            max_tokens: 250,
            temperature: 0.3,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.content?.[0]?.text?.trim();
          if (reply) {
            return NextResponse.json({ reply, provider: "anthropic" });
          }
        }
      } catch (err) {
        console.error("Anthropic call failed:", err);
      }
    }

    // 4. Try Groq if configured
    if (groqKey) {
      try {
        const messages = [
          { role: "system", content: MISHIKA_PORTFOLIO_CONTEXT },
          ...history.slice(-6).map((h) => ({
            role: h.role === "bot" ? "assistant" : "user",
            content: h.text || h.content || "",
          })),
          { role: "user", content: message },
        ];

        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages,
            temperature: 0.3,
            max_tokens: 250,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({ reply, provider: "groq" });
          }
        }
      } catch (err) {
        console.error("Groq call failed:", err);
      }
    }

    // 5. Grounded Fallback Engine
    const fallbackReply = generateGroundedFallback(message);
    return NextResponse.json({ reply: fallbackReply, provider: "grounded-engine" });
  } catch (err) {
    console.error("Chat route handler error:", err);
    return NextResponse.json(
      {
        reply:
          "I'm having a momentary connection glitch! For any questions about Mishika's work or hiring availability, feel free to email her directly at bagrechamishika@gmail.com.",
      },
      { status: 500 }
    );
  }
}
