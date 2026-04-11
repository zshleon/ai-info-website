"use client";
import React, { useEffect, useState } from "react";
import ComparisonTable from "@/components/ComparisonTable";
import ToolDrawer from "@/components/ToolDrawer";
import { Tool, ToolsData } from "@/types/tool";

export default function Home() {
  const [data, setData] = useState<ToolsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const filteredTools = data?.tools.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : t.pool_type === filter;
    return matchesSearch && matchesFilter;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#16202d]">
        <div className="w-10 h-10 border-4 border-[#2a475e] border-t-[#66c0f4] rounded-sm animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#16202d]">
      
      {/* Top Navigation Utilitarian */}
      <nav className="bg-[#171a21] border-b border-[#2a475e] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-black text-white tracking-widest flex items-center gap-2">
              <span className="bg-[#66c0f4] text-[#171a21] px-1.5 py-0.5 rounded-sm text-xs">AI</span>
              PAY TRANSPARENCY
            </h1>
            <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-[#8f98a0]">
              <span className="hover:text-white cursor-pointer uppercase tracking-wider">Database</span>
              <span className="hover:text-white cursor-pointer uppercase tracking-wider">Changelog</span>
              <span className="hover:text-white cursor-pointer uppercase tracking-wider">Pricing Cloud</span>
            </div>
          </div>
          <div className="text-[11px] font-bold text-[#8f98a0] bg-[#1b2838] px-3 py-1.5 rounded-sm border border-[#2a475e]">
            DB VERSION: <span className="text-white">{data?.meta.version}</span> · 
            MODELS: <span className="text-white">{data?.tools.length}</span>
          </div>
        </div>
      </nav>

      {/* Hero / Filter Area */}
      <header className="bg-[#1b2838] border-b border-[#2a475e] py-8">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-[#66c0f4] text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">
                Verified Subscription Intelligence
              </div>
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">AI Tools Comparison Database</h2>
              <p className="text-sm text-[#8f98a0] leading-relaxed">
                Detailed side-by-side analysis of AI product quotas, usage limits, and independent token pools. 
                Sourced from official documentation updated <span className="text-white font-bold">{data?.meta.last_updated}</span>.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col gap-3 min-w-[320px]">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search tool or provider..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#16202d] border border-[#2a475e] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#66c0f4] placeholder-[#4f535b] rounded-sm"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { id: "all", label: "Show All" },
                  { id: "shared", label: "Shared Pools" },
                  { id: "independent", label: "Indep Only" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id as any)}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider border rounded-sm transition-colors ${
                      filter === f.id 
                        ? "bg-[#66c0f4] text-[#171a21] border-[#66c0f4]" 
                        : "bg-[#2a475e] text-[#c7d5e0] border-[#2a475e] hover:bg-[#3d607e]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Database Table Area */}
      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="bg-[#1b2838] border border-[#2a475e] p-1 shadow-2xl">
           <div className="flex items-center gap-2 mb-2 px-2 pt-2">
             <span className="text-[10px] font-black text-[#8f98a0] uppercase tracking-widest">Active Database View</span>
             <div className="h-px flex-1 bg-[#2a475e]" />
           </div>
           
           <ComparisonTable 
              tools={filteredTools} 
              onSelectTool={(t) => setSelectedTool(t)}
            />

            {filteredTools.length === 0 && (
              <div className="py-20 text-center border-t border-[#2a475e] mt-1 shadow-inner bg-[#16202d]/50">
                <p className="text-[#4f535b] font-bold uppercase tracking-[0.2em] text-xs">
                  Query returned no results. Try adjusting search parameters.
                </p>
              </div>
            )}
        </div>

        {/* Technical Footer */}
        <footer className="mt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-[#2a475e] pt-12">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">About Data</h4>
            <p className="text-xs text-[#8f98a0] leading-loose">
              Every data point in this comparison matrix is double-verified. We track hidden "fair use" clauses that often negate "unlimited" claims.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Community</h4>
            <div className="flex flex-col gap-2 text-xs font-bold">
               <a href="https://github.com/zshleon/ai-info-website" target="_blank" className="text-[#66c0f4] hover:underline">GitHub Repository</a>
               <a href="https://github.com/zshleon/ai-info-website/issues/new" target="_blank" className="text-[#66c0f4] hover:underline">Flag Data Inconsistency</a>
            </div>
          </div>
          <div className="space-y-4 md:text-right">
            <h4 className="text-xs font-black text-[#8f98a0] uppercase tracking-widest">Technical Hub</h4>
            <p className="text-[10px] text-[#4f535b] font-bold uppercase tracking-[0.3em] leading-relaxed">
              © 2026 AI PAY TRANSPARENCY NETWORK<br />
              V. {data?.meta.version} · STATIC SSG BUILD
            </p>
          </div>
        </footer>
      </main>

      {/* Technical Sidebar */}
      <ToolDrawer 
        tool={selectedTool} 
        isOpen={!!selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </div>
  );
}
