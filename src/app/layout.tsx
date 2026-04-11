import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pay Transparency — AI 订阅透明度对比",
  description: "一站式对比 Claude、ChatGPT、Gemini、Cursor、Copilot 的配额、功能与性价比",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
