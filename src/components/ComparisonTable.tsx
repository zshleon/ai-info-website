import React from "react";

export function ComparisonTable() {
  return (
    <div className="w-full overflow-hidden border border-color-border-subtle rounded-xl bg-color-canvas-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-color-text-primary">
          <thead className="bg-[#1e293b] text-color-text-secondary uppercase sticky top-0">
            <tr>
              <th className="px-6 py-4 font-medium sticky left-0 bg-[#1e293b] z-10">AI Product</th>
              <th className="px-6 py-4 font-medium">CLI Access</th>
              <th className="px-6 py-4 font-medium">IDE Integration</th>
              <th className="px-6 py-4 font-medium">Daily Message Caps</th>
              <th className="px-6 py-4 font-medium">Shared Budget Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-color-border-subtle">
            <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <td className="px-6 py-4 font-medium sticky left-0 bg-color-canvas-card z-10">Claude Pro</td>
              <td className="px-6 py-4 text-color-electric-cyan">Full Access</td>
              <td className="px-6 py-4">Claude Code natively</td>
              <td className="px-6 py-4">~45 / 5hrs</td>
              <td className="px-6 py-4">Shared</td>
            </tr>
            <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <td className="px-6 py-4 font-medium sticky left-0 bg-color-canvas-card z-10">ChatGPT Plus</td>
              <td className="px-6 py-4 text-emerald-400">Via API</td>
              <td className="px-6 py-4">Copilot / External</td>
              <td className="px-6 py-4">Dynamic / Mini fallback</td>
              <td className="px-6 py-4">Independent</td>
            </tr>
            <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              <td className="px-6 py-4 font-medium sticky left-0 bg-color-canvas-card z-10">Gemini Pro</td>
              <td className="px-6 py-4">GCP Setup required</td>
              <td className="px-6 py-4">Webstorm / IDX</td>
              <td className="px-6 py-4">~500 / day</td>
              <td className="px-6 py-4">Shared</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
