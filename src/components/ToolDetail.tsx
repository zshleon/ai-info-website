"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface TierData {
  limit: string;
  detail: string;
  reset: string;
  model: string;
  pool: "shared" | "independent" | "standalone";
  notes: string;
}
interface Tool {
  id: string;
  name: string;
  vendor: string;
  slug: string;
  price_usd: number;
  pool_type: "shared" | "independent";
  logo_color: string;
  logo_letter: string;
  tiers: { chat: TierData; coding: TierData; cli: TierData; api: TierData };
  changelog: { date: string; event: string }[];
}

const POOL_STYLES = {
  shared:      { bar: "bg-orange-400", bg: "bg-orange-50",  text: "text-orange-700",  label: "共用池 ⚠️" },
  independent: { bar: "bg-green-400",  bg: "bg-green-50",   text: "text-green-700",   label: "独立额度 ✓" },
  standalone:  { bar: "bg-gray-300",   bg: "bg-gray-50",    text: "text-gray-500",    label: "独立付费" },
};

const DIMS = [
  { key: "chat",   label: "💬 普通聊天", width: 70 },
  { key: "coding", label: "🛠 编程工具", width: 60 },
  { key: "cli",    label: "💻 CLI 终端", width: 50 },
  { key: "api",    label: "🔌 API 访问", width: 100 },
];

function QuotaBar({ dim, tier }: { dim: { key: string; label: string; width: number }; tier: TierData }) {
  const s = POOL_STYLES[tier.pool];
  const isNA = tier.limit === "不适用" || tier.limit === "完全独立";
  return (
    <div className={`rounded-xl border p-4 ${s.bg} ${tier.pool === "shared" ? "border-orange-200" : tier.pool === "independent" ? "border-green-200" : "border-gray-200"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">{dim.label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.text} border ${tier.pool === "shared" ? "border-orange-200" : tier.pool === "independent" ? "border-green-200" : "border-gray-200"}`}>
          {s.label}
        </span>
      </div>
      {/* Visual Bar (usage visualization) */}
      <div className="h-2 bg-white/60 rounded-full overflow-hidden mb-3">
        {!isNA && (
          <div
            className={`h-full ${s.bar} rounded-full transition-all duration-700`}
            style={{ width: `${dim.width}%` }}
          />
        )}
      </div>
      <div className="font-bold text-gray-900 text-lg leading-tight mb-1">
        {tier.limit === "[未公开]" ? <span className="text-gray-400 italic text-base">[未公开]</span> : tier.limit}
      </div>
      <div className="text-xs text-gray-500 leading-relaxed">{tier.detail}</div>
      <div className="mt-3 pt-3 border-t border-white/50 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">重置</span>
          <div className="font-medium text-gray-700">{tier.reset}</div>
        </div>
        <div>
          <span className="text-gray-400">模型</span>
          <div className="font-medium text-gray-700 truncate" title={tier.model}>{tier.model}</div>
        </div>
      </div>
      {tier.notes && (
        <div className="mt-2 pt-2 border-t border-white/50 text-xs text-gray-500 leading-relaxed">
          📌 {tier.notes}
        </div>
      )}
    </div>
  );
}

export default function ToolDetail({ slug }: { slug: string }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/tools.json")
      .then(r => r.json())
      .then((d: { tools: Tool[] }) => {
        const found = d.tools.find(t => t.slug === slug);
        setTool(found ?? null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-gray-400">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-400 rounded-full animate-spin mx-auto mb-3" />
        加载中…
      </div>
    </div>
  );

  if (!tool) return (
    <div className="text-center py-24">
      <div className="text-4xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">未找到该工具</h2>
      <p className="text-gray-500 mb-6">slug: {slug}</p>
      <Link href="/" className="text-sm text-blue-600 hover:underline">← 返回对比表</Link>
    </div>
  );

  const poolInfo = tool.pool_type === "shared"
    ? { label: "共用池（Shared）", color: "bg-orange-100 text-orange-700 border-orange-200", desc: "该工具的各功能（聊天、编程、CLI）共用同一额度池。使用其中一个会消耗其他功能的配额。" }
    : { label: "独立额度（Independent）", color: "bg-green-100 text-green-700 border-green-200", desc: "该工具的各功能拥有独立额度，互不影响。" };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        ← 返回对比表
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
          style={{ backgroundColor: tool.logo_color }}
        >
          {tool.logo_letter}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{tool.name}</h1>
          <p className="text-gray-500 mt-0.5">{tool.vendor}</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-gray-900">
              ${tool.price_usd}<span className="text-base font-normal text-gray-400"> /月</span>
            </span>
            <span className={`text-sm px-3 py-1 rounded-full border font-medium ${poolInfo.color}`}>
              {poolInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* Pool Warning / Info */}
      <div className={`rounded-xl border p-4 text-sm ${poolInfo.color}`}>
        <strong>配额模式说明：</strong>{poolInfo.desc}
      </div>

      {/* Quota Visualizer Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">配额可视化</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DIMS.map(dim => (
            <QuotaBar
              key={dim.key}
              dim={dim}
              tier={tool.tiers[dim.key as keyof Tool["tiers"]]}
            />
          ))}
        </div>
      </div>

      {/* Changelog */}
      {tool.changelog && tool.changelog.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">政策变动记录</h2>
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200" />
            {[...tool.changelog].sort((a, b) => b.date.localeCompare(a.date)).map((entry, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="absolute -left-4 mt-1 w-3 h-3 rounded-full bg-orange-400 border-2 border-white" />
                <div>
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                    {entry.date}
                  </span>
                  <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 text-sm text-gray-600">
        <strong>数据有误？</strong> 请
        <a
          href="https://github.com/zshleon/ai-info-website/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mx-1"
        >
          提交 GitHub Issue
        </a>
        帮助我们更新。我们会在 48 小时内核查并修正。
      </div>
    </div>
  );
}
