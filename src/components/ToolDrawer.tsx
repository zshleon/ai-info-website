"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tool, TierData } from "@/types/tool";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolDrawer({ tool, isOpen, onClose }: Props) {
  if (!tool) return null;

  const isShared = tool.pool_type === "shared";

  const DiagramNode = ({ label, tier, icon }: { label: string; tier: TierData; icon: string }) => (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm border",
        tier.pool === "shared" ? "bg-amber-50 border-amber-100" : tier.pool === "independent" ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-200"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{label}</span>
      <div className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm max-w-[64px] truncate">
        {tier.limit === "[未公开]" ? "N/A" : tier.limit.split(' ')[0]}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={onClose}
                  className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex gap-2">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full border",
                    isShared ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                  )}>
                    {isShared ? "SHARED POOL" : "INDEPENDENT"}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                    PRICED AT ${tool.price_usd}/MO
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div 
                  className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100"
                  style={{ backgroundColor: tool.logo_color }}
                >
                  {tool.logo_letter}
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{tool.name}</h2>
                  <p className="text-sm font-medium text-slate-500">{tool.vendor} AI Ecosystem</p>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              
              {/* Token Flow Diagram */}
              <section>
                <div className="text-center mb-8">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest ring-1 ring-slate-100 px-4 py-2 rounded-xl inline-block">
                    Quota Relation Diagram
                  </h3>
                </div>
                <div className="relative flex justify-between items-start px-2 max-w-sm mx-auto">
                  {/* Central Pool (Visible for shared) */}
                  {isShared && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-0">
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-200 bg-amber-50/50 flex items-center justify-center animate-pulse">
                        <span className="text-[8px] font-black text-amber-400 uppercase tracking-tighter">Reservoir</span>
                      </div>
                    </div>
                  )}

                  <div className="z-10 bg-white p-1 rounded-2xl"><DiagramNode label="Chat" tier={tool.tiers.chat} icon="💬" /></div>
                  <div className={cn("mt-6 h-px flex-1 mx-1 border-t-2 border-dashed", isShared ? "border-amber-100" : "border-slate-100")} />
                  <div className="z-10 bg-white p-1 rounded-2xl"><DiagramNode label="Coding" tier={tool.tiers.coding} icon="🛠" /></div>
                  <div className={cn("mt-6 h-px flex-1 mx-1 border-t-2 border-dashed", isShared ? "border-amber-100" : "border-slate-100")} />
                  <div className="z-10 bg-white p-1 rounded-2xl"><DiagramNode label="CLI" tier={tool.tiers.cli} icon="💻" /></div>
                </div>
                <p className="mt-8 text-xs text-center text-slate-400 leading-relaxed px-6 max-w-sm mx-auto font-medium">
                  {isShared 
                    ? "Tokens flow from a central reservoir. Activity in one node depletes availability for all others." 
                    : "Separate isolated lanes. One function's usage does not impact the availability of others."}
                </p>
              </section>

              {/* Tiers Breakdown */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Detailed Breakdown</h3>
                <div className="grid gap-3">
                  {Object.entries(tool.tiers).map(([key, tier]) => (
                    <div key={key} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/30">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-bold border",
                          tier.pool === "shared" ? "bg-amber-50 text-amber-600 border-amber-100" : tier.pool === "independent" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-white text-slate-400 border-slate-200"
                        )}>
                          {tier.pool}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mb-1">{tier.limit}</div>
                      <p className="text-xs text-slate-500 leading-relaxed">{tier.detail}</p>
                      <div className="mt-4 pt-4 border-t border-slate-100/50 flex gap-6 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                        <div className="flex flex-col gap-0.5">
                          <span>Reset Cycle</span>
                          <span className="text-slate-700">{tier.reset}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span>Primary Model</span>
                          <span className="text-slate-700 truncate">{tier.model}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Policy Timeline */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Policy Timeline</h3>
                <div className="space-y-10 pl-5 border-l border-slate-200 ml-2">
                  {tool.changelog.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
                      <div className="text-[10px] font-black text-indigo-600 mb-1 uppercase tracking-wider">{item.date}</div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.event}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <a 
                href={`https://github.com/zshleon/ai-info-website/issues/new?title=[Data纠错] ${tool.name}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Help update this info
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
