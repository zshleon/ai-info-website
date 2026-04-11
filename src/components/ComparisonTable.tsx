"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Types ─── */
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
}
interface ToolsData { meta: { last_updated: string; version: string }; tools: Tool[] }

/* ─── Pool Badge ─── */
const PoolBadge = ({ pool, limit, notes }: { pool: TierData["pool"]; limit: string; notes: string }) => {
  const [showTip, setShowTip] = useState(false);

  const styles: Record<string, { wrap: string; badge: string }> = {
    shared:      { wrap: "bg-orange-50 border-orange-200", badge: "bg-orange-100 text-orange-700" },
    independent: { wrap: "bg-green-50 border-green-200",  badge: "bg-green-100 text-green-700" },
    standalone:  { wrap: "bg-gray-50 border-gray-200",    badge: "bg-gray-100 text-gray-400" },
  };
  const s = styles[pool] || styles.standalone;

  const label = limit === "[未公开]"
    ? <span className="text-gray-400 italic">[未公开]</span>
    : <span className="font-semibold">{limit}</span>;

  return (
    <div
      className={`relative border rounded-lg p-3 text-sm ${s.wrap} cursor-default`}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div className="mb-1">{label}</div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badge}`}>
        {pool === "shared" ? "共用池" : pool === "independent" ? "独立额度" : "独立付费"}
      </span>
      {showTip && notes && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl leading-relaxed pointer-events-none">
          {notes}
          <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

/* ─── Column Header ─── */
const DIMS = [
  { key: "chat",   label: "💬 普通聊天" },
  { key: "coding", label: "🛠 编程工具" },
  { key: "cli",    label: "💻 CLI 终端" },
  { key: "api",    label: "🔌 API 访问" },
];

/* ─── Main Component ─── */
export default function ComparisonTable() {
  const [data, setData] = useState<ToolsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePool, setActivePool] = useState<string>("all");

  useEffect(() => {
    fetch("/data/tools.json")
      .then(r => r.json())
      .then((d: ToolsData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const tools = data?.tools.filter(t =>
    activePool === "all" ? true : t.pool_type === activePool
  ) ?? [];

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-gray-400">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-400 rounded-full animate-spin mx-auto mb-3" />
        数据加载中…
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Meta + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">AI Pay Transparency</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            AI 订阅透明度对比 · 数据更新于 {data?.meta.last_updated} · v{data?.meta.version}
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          {[
            { key: "all",         label: "全部" },
            { key: "shared",      label: "🟠 共用池" },
            { key: "independent", label: "🟢 独立额度" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setActivePool(f.key)}
              className={`px-4 py-1.5 rounded-full border font-medium transition-all ${
                activePool === f.key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Desktop: Scrollable Matrix Table ─── */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50 px-5 py-4 text-left font-semibold text-gray-700 min-w-[180px] z-10">
                工具 / 价格
              </th>
              {DIMS.map(d => (
                <th key={d.key} className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[180px]">
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {tools.map(tool => (
              <tr key={tool.id} className="hover:bg-gray-50/60 transition-colors group">
                {/* Tool Name Column */}
                <td className="sticky left-0 bg-white group-hover:bg-gray-50/60 px-5 py-4 z-10">
                  <Link href={`/tool/${tool.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: tool.logo_color }}
                    >
                      {tool.logo_letter}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 leading-tight">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.vendor}</div>
                      <div className="text-xs font-medium text-gray-900 mt-0.5">
                        ${tool.price_usd}<span className="text-gray-400 font-normal"> /月</span>
                      </div>
                    </div>
                  </Link>
                </td>
                {/* Tier Cells */}
                {DIMS.map(d => {
                  const tier = tool.tiers[d.key as keyof Tool["tiers"]];
                  return (
                    <td key={d.key} className="px-4 py-4">
                      <PoolBadge pool={tier.pool} limit={tier.limit} notes={tier.notes} />
                      <div className="text-xs text-gray-400 mt-1.5 leading-relaxed">{tier.detail}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile: Card Stack ─── */}
      <div className="md:hidden space-y-4">
        {tools.map(tool => (
          <div key={tool.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Card Header */}
            <Link href={`/tool/${tool.slug}`} className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: tool.logo_color }}
              >
                {tool.logo_letter}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.vendor}</div>
              </div>
              <div className="text-xl font-extrabold text-gray-900">
                ${tool.price_usd}<span className="text-sm font-normal text-gray-400">/月</span>
              </div>
            </Link>
            {/* Card Dims */}
            <div className="divide-y divide-gray-100">
              {DIMS.map(d => {
                const tier = tool.tiers[d.key as keyof Tool["tiers"]];
                return (
                  <div key={d.key} className="px-4 py-3">
                    <div className="text-xs font-medium text-gray-500 mb-1.5">{d.label}</div>
                    <PoolBadge pool={tier.pool} limit={tier.limit} notes={tier.notes} />
                    <div className="text-xs text-gray-400 mt-1.5 leading-relaxed">{tier.detail}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 text-xs text-gray-500 pt-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-orange-100 border border-orange-300" />
          <span><strong className="text-orange-700">共用池</strong>：用其中一个功能会消耗其他功能的额度</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-green-100 border border-green-300" />
          <span><strong className="text-green-700">独立额度</strong>：各功能互不影响</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" />
          <span><strong className="text-gray-500">独立付费</strong>：需要单独 API 费用或不适用</span>
        </span>
        <span className="text-gray-400">· 悬停单元格查看备注</span>
      </div>
    </div>
  );
}
