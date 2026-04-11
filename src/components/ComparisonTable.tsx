"use client";
import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tool, TierData } from "@/types/tool";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

const DIMS = [
  { key: "chat",   label: "聊天 (Chat)" },
  { key: "coding", label: "编程 (Code)" },
  { key: "cli",    label: "终端 (CLI)" },
  { key: "api",    label: "接口 (API)" },
];

const QuotaBadge = ({ pool, text }: { pool: TierData["pool"]; text: string }) => {
  const styles = {
    shared: "bg-amber-50 text-amber-700 border-amber-100",
    independent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    standalone: "bg-slate-50 text-slate-500 border-slate-100",
  };
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase leading-none",
      styles[pool]
    )}>
      {text}
    </span>
  );
};

export default function ComparisonTable({ tools, onSelectTool }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/50 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="sticky top-0 z-10 backdrop-blur-xl bg-white/70">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 min-w-[240px]">
                Vendor / Service
              </th>
              {DIMS.map((dim) => (
                <th key={dim.key} className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 min-w-[220px]">
                  {dim.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tools.map((tool) => (
              <tr 
                key={tool.id} 
                onClick={() => onSelectTool(tool)}
                className="group cursor-pointer hover:bg-white/80 transition-all duration-300"
              >
                <td className="px-8 py-8">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-slate-100 border border-white/20"
                      style={{ backgroundColor: tool.logo_color }}
                    >
                      {tool.logo_letter}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-base tracking-tight">
                        {tool.name}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
                        ${tool.price_usd} USD <span className="opacity-50">/ mo</span>
                      </div>
                    </div>
                  </div>
                </td>
                {DIMS.map((dim) => {
                  const tier = tool.tiers[dim.key as keyof Tool["tiers"]];
                  return (
                    <td key={dim.key} className="px-8 py-8 align-top">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-bold text-slate-800 leading-tight">
                            {tier.limit === "[未公开]" ? (
                              <span className="text-slate-300 italic font-normal">[未公开]</span>
                            ) : tier.limit}
                          </span>
                        </div>
                        <QuotaBadge 
                          pool={tier.pool} 
                          text={tier.pool === "shared" ? "shared" : tier.pool === "independent" ? "indep" : "api"} 
                        />
                        <div className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                          {tier.detail}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
