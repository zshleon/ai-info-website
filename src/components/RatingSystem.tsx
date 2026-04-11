"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";

const axes = [
  { id: "coding_logic", label: "Coding Logic" },
  { id: "naturalness", label: "Conversational Naturalness" },
  { id: "speed", label: "Speed" },
  { id: "reliability", label: "Reliability" }
];

export function RatingSystem({ productId }: { productId: string }) {
  const [ratings, setRatings] = useState<Record<string, number>>({
    coding_logic: 0,
    naturalness: 0,
    speed: 0,
    reliability: 0
  });

  const handleRate = (axis: string, value: number) => {
    setRatings(prev => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-color-text-primary mb-2 font-medium">Community Impressions</h3>
      {axes.map(axis => (
        <div key={axis.id} className="flex items-center justify-between">
          <span className="text-xs text-color-text-secondary w-1/2">{axis.label}</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={16}
                onClick={() => handleRate(axis.id, star)}
                className={`cursor-pointer transition-colors ${
                  star <= ratings[axis.id] ? "fill-color-electric-cyan text-color-electric-cyan" : "text-color-border-subtle"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
      <button className="mt-2 bg-color-electric-cyan hover:bg-[#00c2cc] text-[#0f111a] px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
        Submit Rating
      </button>
    </div>
  );
}
