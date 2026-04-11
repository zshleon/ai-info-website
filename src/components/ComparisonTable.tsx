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
  { key: "chat",   label: "Chat Quota" },
  { key: "coding", label: "IDE / Coding" },
  { key: "cli",    label: "CLI Access" },
  { key: "api",    label: "Native API" },
];

const StatusBadge = ({ pool, text }: { pool: TierData["pool"]; text: string }) => {
  const styles = {
    shared: "bg-[#b28500] text-white",      // Amber
    independent: "bg-[#5c7e10] text-white", // Green
    standalone: "bg-[#3d4450] text-[#c7d5e0]", // Dark Gray
  };
  return (
    <span className={cn(
      "inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter leading-none rounded-sm",
      styles[pool]
    )}>
      {text}
    </span>
  );
};

export default function ComparisonTable({ tools, onSelectTool }: Props) {
  return (
    <div className="w-full border border-[#2a475e] bg-[#16202d]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#2a475e]">
              <th className="px-4 py-3 w-[220px]">Tool / Provider</th>
              {DIMS.map((dim) => (
                <th key={dim.key} className="px-4 py-3">{dim.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a475e]">
            {tools.map((tool) => (
              <tr 
                key={tool.id} 
                onClick={() => onSelectTool(tool)}
                className="zebra-row cursor-pointer transition-colors"
              >
                {/* Identity Column */}
                <td className="px-4 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-sm flex items-center justify-center text-white font-black text-xs shrink-0"
                      style={{ backgroundColor: tool.logo_color }}
                    >
                      {tool.logo_letter}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-[#66c0f4] hover:underline truncate">
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-[#8f98a0] font-bold uppercase tracking-tight">
                        ${tool.price_usd} / mo
                      </div>
                    </div>
                  </div>
                </td>

                {/* Data Columns */}
                {DIMS.map((dim) => {
                  const tier = tool.tiers[dim.key as keyof Tool["tiers"]];
                  return (
                    <td key={dim.key} className="px-4 py-4 align-top border-l border-[#2a475e]">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                           <span className={cn(
                             "text-[12px] font-bold",
                             tier.limit === "[未公开]" ? "text-[#4f535b] italic" : "text-[#ffffff]"
                           )}>
                            {tier.limit}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <StatusBadge 
                            pool={tier.pool} 
                            text={tier.pool === "shared" ? "shared" : tier.pool === "independent" ? "indep" : "api"} 
                          />
                        </div>
                        <div className="text-[11px] text-[#8f98a0] leading-snug line-clamp-3">
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
