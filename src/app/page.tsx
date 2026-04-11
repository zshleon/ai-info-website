"use client";
import React, { useEffect, useState } from "react";
import ToolCard from "@/components/ToolCard";
import ComparisonTable from "@/components/ComparisonTable";
import ToolDrawer from "@/components/ToolDrawer";
import { Tool, ToolsData } from "@/types/tool";

export default function Home() {
  const [data, setData] = useState<ToolsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "matrix">("grid");
  const [filter, setFilter] = useState<"all" | "shared" | "independent">("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    fetch("/data/tools.json")
      .then((r) => r.json())
      .then((d: ToolsData) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tool data:", err);
        setLoading(false);
      });
  }, []);

  const filteredTools = data?.tools.filter((t) => 
    filter === "all" ? true : t.pool_type === filter
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        
        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Release v{data?.meta.version} · Updated {data?.meta.last_updated}
              </div>
              <h1 className="text-4xl sm:text-6xl font-[900] text-slate-900 tracking-tight leading-[1] mb-8">
                Pay Transparency for Modern AI.
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                We simplify complex tool quotas. Compare shared pools, hidden limits, and native API costs. 
                <span className="text-slate-900 font-bold italic ml-2 border-b-2 border-indigo-100">
                  Total visibility into your $20/mo value.
                </span>
              </p>
            </div>
            
            {/* View Controls */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/50 rounded-2xl border border-slate-200 w-fit lg:self-end">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    viewMode === "grid" ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("matrix")}
                  className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    viewMode === "matrix" ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Matrix
                </button>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-16 flex flex-wrap items-center gap-3">
            {[
              { id: "all", label: "Discovery" },
              { id: "shared", label: "Shared Pools" },
              { id: "independent", label: "Independent Only" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all border-2 ${
                  filter === f.id 
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
                    : "bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={(t) => setSelectedTool(t)} 
              />
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <ComparisonTable 
              tools={filteredTools} 
              onSelectTool={(t) => setSelectedTool(t)}
            />
          </div>
        )}

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="py-32 text-center rounded-[3rem] border-2 border-dashed border-slate-100 bg-slate-50/50">
            <div className="text-5xl mb-6 opacity-30">🕳️</div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Zero tools match your criteria.</p>
          </div>
        )}

        {/* Global Footer */}
        <footer className="mt-40 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
               <h4 className="text-xl font-black text-slate-900">Democratizing AI Data.</h4>
               <p className="text-sm text-slate-500 leading-loose font-medium max-w-md">
                We believe transparency is the first step toward better AI models. This platform aggregates verified data to help you save money and understand model limitations.
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:items-end">
              <div className="flex gap-10">
                <a href="https://github.com/zshleon/ai-info-website" target="_blank" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">Documentation</a>
                <a href="https://github.com/zshleon/ai-info-website/issues/new" target="_blank" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">Bug Bounty</a>
              </div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
                © 2026 AI Pay Transparency · Built for Zen
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Slide-over Drawer */}
      <ToolDrawer 
        tool={selectedTool} 
        isOpen={!!selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
