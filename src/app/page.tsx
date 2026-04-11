"use client";
import React, { useState } from "react";

/* ───────── Data ───────── */
type PoolType = "shared" | "independent" | "api";
interface TagInfo { text: string; pool: PoolType }
interface CardData {
  name: string;
  subtitle: string;
  logoLetter: string;
  logoBg: string;
  question: string;
  statusTag: TagInfo;
  mainStat: string;
  mainStatDesc: string;
  extra?: { label: string; tags: TagInfo[] }[];
  apiSection?: TagInfo;
}
interface TabData {
  cards: CardData[];
  insight: string;
}

const TABS: Record<string, TabData> = {
  overview: {
    cards: [
      {
        name: "Claude Pro", subtitle: "Anthropic", logoLetter: "C", logoBg: "var(--color-logo-claude)",
        question: "配额模式",
        statusTag: { text: "共用池：聊天 / CLI / API 同一额度", pool: "shared" },
        mainStat: "~45条 / 5小时",
        mainStatDesc: "短消息估算（Pro 档），长对话消耗更快",
        extra: [
          { label: "重置周期", tags: [{ text: "每5小时滚动重置", pool: "shared" }] },
          { label: "可用模型", tags: [{ text: "Sonnet 4.6 / Opus 4.6", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "ChatGPT Plus", subtitle: "OpenAI", logoLetter: "G", logoBg: "var(--color-logo-chatgpt)",
        question: "配额模式",
        statusTag: { text: "部分共用：Web 与 Codex 共用池", pool: "shared" },
        mainStat: "动态浮动",
        mainStatDesc: "GPT-5 / o3 配额动态调整，超限降级至 mini",
        extra: [
          { label: "重置周期", tags: [{ text: "约5小时周期", pool: "shared" }] },
          { label: "可用模型", tags: [{ text: "GPT-5 / o3 / o4-mini", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "Google AI Pro", subtitle: "Google", logoLetter: "G", logoBg: "var(--color-logo-gemini)",
        question: "配额模式",
        statusTag: { text: "独立计算：聊天与 CLI 分开统计", pool: "independent" },
        mainStat: "~500条 / 天",
        mainStatDesc: "Gemini App 对话（Pro 档），每日凌晨重置",
        extra: [
          { label: "重置周期", tags: [{ text: "每天凌晨重置", pool: "independent" }] },
          { label: "可用模型", tags: [{ text: "Gemini 3.1 Pro / Flash", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
    ],
    insight: "💡 总览提示：Claude 和 ChatGPT 的聊天 / 编程 / CLI 共用同一额度池，用其中一个会影响另一个。Google AI 的聊天和 CLI 额度独立计算，互不影响。",
  },
  chat: {
    cards: [
      {
        name: "Claude Pro", subtitle: "Web 聊天", logoLetter: "C", logoBg: "var(--color-logo-claude)",
        question: "聊天配额",
        statusTag: { text: "与 CLI 共用同一池", pool: "shared" },
        mainStat: "~45条 / 5小时",
        mainStatDesc: "短消息估算（Pro 档），长对话消耗更快",
        extra: [
          { label: "上下文窗口", tags: [{ text: "200K tokens", pool: "api" }] },
          { label: "多模态", tags: [{ text: "文本 / 图片 / PDF", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "ChatGPT Plus", subtitle: "Web 聊天", logoLetter: "G", logoBg: "var(--color-logo-chatgpt)",
        question: "聊天配额",
        statusTag: { text: "与 Codex Web 共用池", pool: "shared" },
        mainStat: "动态浮动",
        mainStatDesc: "超限自动降级至 GPT-5_mini",
        extra: [
          { label: "上下文窗口", tags: [{ text: "128K tokens", pool: "api" }] },
          { label: "多模态", tags: [{ text: "文本 / 图片 / 语音 / 视频", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "Google AI Pro", subtitle: "Gemini App", logoLetter: "G", logoBg: "var(--color-logo-gemini)",
        question: "聊天配额",
        statusTag: { text: "包含，但与聊天独立计算", pool: "independent" },
        mainStat: "~500条 / 天",
        mainStatDesc: "每日凌晨重置，不影响 CLI 额度",
        extra: [
          { label: "上下文窗口", tags: [{ text: "1M tokens（最长）", pool: "independent" }] },
          { label: "多模态", tags: [{ text: "文本 / 图片 / 视频 / 音频", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
    ],
    insight: "💬 聊天对比：Google AI Pro 拥有 1M token 的业界最长上下文窗口，且配额每日重置、不与 CLI 共用。Claude 的 200K 上下文排第二，但与 CLI 共用额度。ChatGPT 超限会自动降级到 mini 模型。",
  },
  coding: {
    cards: [
      {
        name: "Claude Pro", subtitle: "Claude Code", logoLetter: "C", logoBg: "var(--color-logo-claude)",
        question: "编程工具配额",
        statusTag: { text: "与网页聊天共用同一池", pool: "shared" },
        mainStat: "~44K tokens / 5h",
        mainStatDesc: "估算上限（Pro 档），与聊天共享额度",
        extra: [
          { label: "IDE 整合", tags: [{ text: "VS Code / JetBrains 原生", pool: "independent" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "ChatGPT Plus", subtitle: "Codex", logoLetter: "G", logoBg: "var(--color-logo-chatgpt)",
        question: "编程工具配额",
        statusTag: { text: "包含，与 Codex Web 共用池", pool: "shared" },
        mainStat: "动态浮动",
        mainStatDesc: "GPT-5.3-Codex 本地任务（与 Web 共用）",
        extra: [
          { label: "IDE 整合", tags: [{ text: "Copilot / VS Code 原生", pool: "independent" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "Google AI Pro", subtitle: "Gemini Code Assist", logoLetter: "G", logoBg: "var(--color-logo-gemini)",
        question: "编程工具配额",
        statusTag: { text: "包含，但与聊天独立计算", pool: "independent" },
        mainStat: "~1000次 / 天",
        mainStatDesc: "Code Assist / CLI 请求（估算，按天重置）",
        extra: [
          { label: "IDE 整合", tags: [{ text: "VS Code / Android Studio / IDX", pool: "independent" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
    ],
    insight: "🛠️ 编程工具对比：Claude Code 和 Codex CLI 均包含在订阅内，但会侵占聊天额度。Google 的 Code Assist 额度独立，不影响聊天配额。Claude 已封锁第三方工具使用订阅 token。",
  },
  cli: {
    cards: [
      {
        name: "Claude Pro", subtitle: "Claude Code CLI", logoLetter: "C", logoBg: "var(--color-logo-claude)",
        question: "CLI 是否包含在订阅内？",
        statusTag: { text: "✓ 包含，与网页聊天同一池", pool: "shared" },
        mainStat: "~44K tokens / 5h",
        mainStatDesc: "估算上限（Pro 档）",
        extra: [
          { label: "第三方工具（如 OPENCLAW）", tags: [{ text: "✗ 2026年4月起已封锁，必须用 API key", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "ChatGPT Plus", subtitle: "Codex CLI", logoLetter: "G", logoBg: "var(--color-logo-chatgpt)",
        question: "CLI 是否包含在订阅内？",
        statusTag: { text: "✓ 包含，与 Codex Web 共用池", pool: "shared" },
        mainStat: "30-150条/5小时",
        mainStatDesc: "GPT-5.3-Codex 本地任务（与 Web 共用）",
        extra: [
          { label: "切换 API KEY 模式", tags: [{ text: "可选：切换后按 token 独立计费，不扣订阅配额", pool: "api" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
      {
        name: "Google AI Pro", subtitle: "Gemini CLI", logoLetter: "G", logoBg: "var(--color-logo-gemini)",
        question: "CLI 是否包含在订阅内？",
        statusTag: { text: "✓ 包含，但与聊天独立计算", pool: "independent" },
        mainStat: "~1000次 / 天",
        mainStatDesc: "Code Assist / CLI 请求（估算，按天重置）",
        extra: [
          { label: "免费替代方案", tags: [{ text: "Gemini CLI 免费版：1000次/天（Flash 模型）", pool: "independent" }] },
        ],
        apiSection: { text: "完全独立，按 token 计费", pool: "api" },
      },
    ],
    insight: "💻 CLI 谁最划算？ Gemini 免费版就给 1000 次 / 天 CLI，Pro 档更高，且不影响聊天配额。Claude Code CLI 和 Codex CLI 均包含在订阅内，但会侵占聊天额度。Claude 已封锁第三方工具使用订阅 token。",
  },
};

const TAB_LABELS: Record<string, string> = {
  overview: "总览：共用 vs 独立",
  chat: "普通聊天",
  coding: "AI 编程工具",
  cli: "CLI 终端",
};

/* ───────── Tag Component ───────── */
function Tag({ text, pool }: TagInfo) {
  const styles: Record<PoolType, string> = {
    shared: "bg-tag-shared-bg text-tag-shared-text",
    independent: "bg-tag-independent-bg text-tag-independent-text",
    api: "bg-tag-api-bg text-tag-api-text",
  };
  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg text-sm leading-snug ${styles[pool]}`}>
      {text}
    </span>
  );
}

/* ───────── Product Card ───────── */
function ProductCard({ card }: { card: CardData }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: card.logoBg }}
        >
          {card.logoLetter}
        </div>
        <div>
          <h3 className="text-lg font-bold leading-tight">{card.name}</h3>
          <p className="text-sm text-text-secondary">{card.subtitle}</p>
        </div>
      </div>

      {/* Question + Status */}
      <div>
        <p className="text-sm text-text-secondary mb-2">{card.question}</p>
        <Tag {...card.statusTag} />
      </div>

      {/* Main Stat */}
      <div>
        <p className="text-3xl font-extrabold tracking-tight leading-none">{card.mainStat}</p>
        <p className="text-sm text-text-secondary mt-1">{card.mainStatDesc}</p>
      </div>

      {/* Extra Sections */}
      {card.extra?.map((section, i) => (
        <div key={i}>
          <p className="text-sm text-text-secondary mb-2">{section.label}</p>
          <div className="flex flex-wrap gap-2">
            {section.tags.map((tag, j) => (
              <Tag key={j} {...tag} />
            ))}
          </div>
        </div>
      ))}

      {/* API Section */}
      {card.apiSection && (
        <div>
          <p className="text-sm text-text-secondary mb-2">API 访问</p>
          <Tag {...card.apiSection} />
        </div>
      )}
    </div>
  );
}

/* ───────── Main Page ───────── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("cli");

  const tabData = TABS[activeTab];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Tab Bar */}
      <nav className="flex flex-wrap gap-3 mb-8">
        {Object.entries(TAB_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
              activeTab === key
                ? "bg-tab-active-bg border-tab-active-border text-text"
                : "bg-card border-border text-text-secondary hover:bg-tab-active-bg"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tabData.cards.map((card, i) => (
          <ProductCard key={`${activeTab}-${i}`} card={card} />
        ))}
      </div>

      {/* Insight Banner */}
      <div className="bg-insight-bg border border-insight-border rounded-2xl p-5 mb-8">
        <p className="text-sm leading-relaxed text-text">{tabData.insight}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-tag-shared-bg border border-tag-shared-text/20" />
          共用同一配额池（用一个影响另一个）
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-tag-independent-bg border border-tag-independent-text/20" />
          独立配额（互不影响）
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-tag-api-bg border border-tag-api-text/20" />
          需单独付 API 费用
        </span>
      </div>
    </main>
  );
}
