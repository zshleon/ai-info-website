"use client";
import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tool, TierData } from "@/types/tool";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

export default function ToolCard({ tool, onClick }: Props) {
  const isShared = tool.pool_type === "shared";

  const StatBlock = ({ label, tier }: { label: string; tier: TierData }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </span>
        <span className={cn(
          "h-1.5 w-1.5 rounded-full ring-2 ring-white",
          tier.pool === "shared" ? "bg-amber-400" : tier.pool === "independent" ? "bg-emerald-400" : "bg-slate-300"
        )} />
      </div>
      <div className="text-sm font-semibold text-slate-800 line-clamp-1">
        {tier.limit === "[未公开]" ? <span className="text-slate-300 italic font-normal text-xs">[未公开]</span> : tier.limit}
      </div>
      <div className="text-[10px] text-slate-500 leading-normal line-clamp-1 opacity-70">
        {tier.detail}
      </div>
    </div>
  );

  return (
    <button
      onClick={() => onClick(tool)}
      className="group relative flex flex-col w-full text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Pool Indicator Stripe */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1",
        isShared ? "bg-amber-400" : "bg-emerald-400"
      )} />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-sm"
            style={{ backgroundColor: tool.logo_color }}
          >
            {tool.logo_letter}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs font-medium text-slate-400 tracking-tight">
              {tool.vendor}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-slate-900">${tool.price_usd}</span>
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-tighter">per month</span>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-5 flex-1">
        <StatBlock label="Chat Quota" tier={tool.tiers.chat} />
        <StatBlock label="Coding / IDE" tier={tool.tiers.coding} />
        
        <div className="pt-4 mt-auto border-t border-slate-50">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-400 uppercase tracking-widest">Structure</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full border text-[9px] uppercase tracking-wide",
              isShared ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
            )}>
              {isShared ? "Shared Token Pool" : "Independent Tiers"}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute bottom-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
          <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
