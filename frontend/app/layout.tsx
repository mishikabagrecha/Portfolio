import type { Metadata } from "next";
import "../styles/globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Mishika — Pretty Smart. | AI/ML Engineer",
  description: "Portfolio of Mishika — AI/ML Engineer, Computer Vision & NLP specialist. Breaking stereotypes, building software.",
  keywords: ["AI Engineer", "ML Engineer", "Portfolio", "Computer Vision", "NLP", "React", "Python"],
  openGraph: {
    title: "Mishika — Pretty Smart.",
    description: "AI/ML Engineer | Breaking stereotypes, building software.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
