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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#16202d] border-l border-[#2a475e] shadow-2xl z-[101] flex flex-col"
          >
            {/* Nav Header */}
            <div className="bg-[#171a21] border-b border-[#2a475e] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div 
                  className="w-6 h-6 rounded-sm flex items-center justify-center text-white font-black text-[10px]"
                  style={{ backgroundColor: tool.logo_color }}
                >
                  {tool.logo_letter}
                </div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">{tool.name} Data</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-[#8f98a0] hover:text-white text-xs font-bold uppercase tracking-tighter transition-colors"
              >
                [ Close ]
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Summary Block */}
              <section className="bg-[#1b2838] border border-[#2a475e] p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs pb-2 border-b border-[#233c51]">
                    <span className="text-[#8f98a0]">Service Name</span>
                    <span className="text-white font-bold">{tool.name}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-[#233c51]">
                    <span className="text-[#8f98a0]">Provider</span>
                    <span className="text-white font-bold">{tool.vendor}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-[#233c51]">
                    <span className="text-[#8f98a0]">Monthly Price</span>
                    <span className="text-[#66c0f4] font-black">${tool.price_usd} USD</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8f98a0]">Pool Structure</span>
                    <span className={cn(
                      "font-bold uppercase text-[10px] px-1.5 py-0.5 rounded-sm",
                      tool.pool_type === "shared" ? "bg-[#b28500] text-white" : "bg-[#5c7e10] text-white"
                    )}>
                      {tool.pool_type}
                    </span>
                  </div>
                </div>
              </section>

              {/* Tiers Grid */}
              <section className="space-y-3">
                <h3 className="text-[11px] font-black text-[#8f98a0] uppercase tracking-widest px-1">Technical Tiers</h3>
                <div className="grid gap-2">
                  {Object.entries(tool.tiers).map(([key, tier]) => (
                    <div key={key} className="bg-[#1b2838] border border-[#2a475e] p-3 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-[#66c0f4] uppercase tracking-wider">{key}</span>
                        <span className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase",
                          tier.pool === "shared" ? "bg-[#b28500] text-white" : tier.pool === "independent" ? "bg-[#5c7e10] text-white" : "bg-[#3d4450] text-[#8f98a0]"
                        )}>
                          {tier.pool}
                        </span>
                      </div>
                      <div className="text-white font-bold mb-1">{tier.limit}</div>
                      <p className="text-[#8f98a0] leading-relaxed text-[11px] mb-3">{tier.detail}</p>
                      <div className="flex gap-4 border-t border-[#233c51] pt-2 mt-2 opacity-60">
                         <div className="text-[9px]">
                           <div className="text-[#8f98a0] uppercase font-bold">Reset</div>
                           <div className="text-white font-bold truncate">{tier.reset}</div>
                         </div>
                         <div className="text-[9px]">
                           <div className="text-[#8f98a0] uppercase font-bold">Base Model</div>
                           <div className="text-white font-bold truncate max-w-[120px]">{tier.model}</div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Changelog - Utility List */}
              <section className="space-y-2">
                <h3 className="text-[11px] font-black text-[#8f98a0] uppercase tracking-widest px-1">Revision History</h3>
                <div className="border border-[#2a475e] bg-[#16202d] divide-y divide-[#2a475e]">
                  {tool.changelog.map((item, idx) => (
                    <div key={idx} className="p-3 text-xs leading-relaxed group">
                      <div className="text-[#66c0f4] font-black mb-1 group-hover:text-white transition-colors">{item.date}</div>
                      <div className="text-[#8f98a0]">{item.event}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Utilitarian */}
            <div className="p-4 bg-[#171a21] border-t border-[#2a475e]">
              <a 
                href={`https://github.com/zshleon/ai-info-website/issues/new?title=[API-DB] ${tool.name}`}
                target="_blank"
                className="flex items-center justify-center w-full p-2 bg-[#2a475e] hover:bg-[#3d607e] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-sm"
              >
                Submit Data Correction
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
