"use client";

import React from "react";
import { motion } from "framer-motion";

export type UsagePoolType = "shared" | "separate";

interface Props {
  poolType: UsagePoolType;
  chatProgress: number; // 0 to 100
  cliProgress: number;  // 0 to 100
}

export function UsagePoolVisualizer({ poolType, chatProgress, cliProgress }: Props) {
  if (poolType === "shared") {
    // Math for Radial Progress (Shared Sink)
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    // Shared means they eat from the same pie
    const totalProgress = Math.min(chatProgress + cliProgress, 100);
    const strokeDashoffset = circumference - (totalProgress / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="text-color-text-primary font-semibold mb-2">Shared Pool Visualizer</h3>
        <p className="text-color-text-secondary text-xs text-center mb-4 max-w-[200px]" title="Noisy Neighbor Effect: If you use the CLI heavily, your web chat will be limited.">
          Token limits are shared across all interfaces. (Hover for info)
        </p>

        <div className="relative w-[120px] h-[120px]">
          {/* Background Track */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="60" cy="60" r={radius}
              stroke="var(--color-border-subtle)" strokeWidth="8" fill="transparent"
            />
            {/* Animated Progress */}
            <motion.circle
              cx="60" cy="60" r={radius}
              stroke="var(--color-electric-cyan)" strokeWidth="8" fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-color-text-primary font-bold text-lg">{totalProgress}%</span>
            <span className="text-color-text-secondary text-[10px]">Used</span>
          </div>
        </div>
      </div>
    );
  }

  // Linear Progress (Independent Batteries)
  return (
    <div className="flex flex-col p-4">
      <h3 className="text-color-text-primary font-semibold mb-2">Independent Batteries</h3>
      <p className="text-color-text-secondary text-xs mb-4 max-w-[250px]">
        Limits are tracked separately. Using CLI does not impact Web Chat.
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-color-text-primary">Chat Quota</span>
          <span className="text-color-electric-cyan">{chatProgress}%</span>
        </div>
        <div className="h-2 w-full bg-color-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-color-electric-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${chatProgress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-color-text-primary">CLI Quota</span>
          <span className="text-emerald-400">{cliProgress}%</span>
        </div>
        <div className="h-2 w-full bg-color-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${cliProgress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
