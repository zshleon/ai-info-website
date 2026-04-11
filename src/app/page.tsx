import React from "react";
import { UsagePoolVisualizer } from "@/components/UsagePoolVisualizer";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RatingSystem } from "@/components/RatingSystem";

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 lg:p-16 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-glow">Decision Intelligence</h1>
        <p className="text-color-text-secondary text-lg">
          The ultimate grid. Eliminate the translation gap in AI subscriptions.
        </p>
      </header>

      {/* Bento Grid Core */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Claude Pro Cell (Shared Sink) */}
        <div className="glass-card flex flex-col justify-between col-span-1 md:col-span-2 p-6 overflow-hidden relative">
          <div className="z-10 relative">
            <h2 className="text-2xl font-bold mb-1">Claude Pro</h2>
            <div className="inline-flex text-xs bg-color-electric-cyan text-[#0f111a] px-2 py-1 rounded-full font-bold mb-4">
              Best for Complex Coding
            </div>
            <p className="text-color-text-secondary w-2/3 leading-relaxed">
              Provides the absolute top-tier intelligence, but token usage comes from a universal shared bucket. Heavy CLI usage will impact your web UI limits.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 relative">
            {/* Visualizer takes up half of the hero */}
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-2 border border-color-border-subtle">
              <UsagePoolVisualizer poolType="shared" chatProgress={45} cliProgress={30} />
            </div>
            {/* Spec Drilldown */}
            <div className="flex flex-col justify-center gap-2">
              <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded-xl border border-color-border-subtle">
                <span className="block text-xs text-color-text-secondary uppercase">Pricing</span>
                <span className="block text-xl font-medium">$20 / Month</span>
              </div>
              <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded-xl border border-color-border-subtle">
                <span className="block text-xs text-color-text-secondary uppercase">Pool Schema</span>
                <span className="block text-sm font-medium text-amber-400">Shared Sink (Noisy Neighbor Effect)</span>
              </div>
            </div>
          </div>
          {/* Decorative blur blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-color-electric-cyan opacity-[0.03] blur-3xl rounded-full" />
        </div>

        {/* ChatGPT Plus Cell (Independent) */}
        <div className="glass-card flex flex-col p-6 overflow-hidden relative">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1">ChatGPT Plus</h2>
            <div className="inline-flex text-xs bg-emerald-400 text-[#0f111a] px-2 py-1 rounded-full font-bold">
              Independent Ecosystem
            </div>
          </div>
          <div className="bg-[rgba(0,0,0,0.2)] rounded-xl border border-color-border-subtle mb-4 flex-1">
            <UsagePoolVisualizer poolType="separate" chatProgress={60} cliProgress={15} />
          </div>
          <div className="bg-[rgba(0,0,0,0.2)] p-4 rounded-xl border border-color-border-subtle">
            <span className="block text-xs text-color-text-secondary uppercase">Pricing</span>
            <span className="block text-lg font-medium">$20 / Month</span>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Deep Technical Matrix</h2>
        <ComparisonTable />
      </section>

      {/* Community Ratings Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-1">Claude Artifact Record</h2>
          <p className="text-color-text-secondary text-sm mb-4">View verified performance via sub-agent recordings.</p>
          <div className="aspect-video bg-[rgba(0,0,0,0.4)] rounded-lg flex items-center justify-center border border-color-border-subtle">
             <span className="text-color-text-secondary">Browser Recording (Placeholder)</span>
             {/* Note: the agent can capture screenshots and render them here via artifact embed if available */}
          </div>
        </div>
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-1">Live Community Hub</h2>
          <p className="text-color-text-secondary text-sm mb-4">Rate products across strict development axes.</p>
          <RatingSystem productId="claude-pro" />
        </div>
      </section>
    </main>
  );
}
