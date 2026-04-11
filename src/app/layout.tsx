import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 订阅对比平台",
  description: "一站式对比 AI 工具的配额、功能与性价比",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
