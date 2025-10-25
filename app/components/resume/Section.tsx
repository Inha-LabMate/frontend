"use client";

import { ReactNode } from "react";

interface SectionProps {
  title: string;
  icon?: string;
  onAdd?: () => void;
  children: ReactNode;
  collapsible?: boolean;
}

export default function Section({
  title,
  icon = "▶",
  onAdd,
  children,
}: SectionProps) {
  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-inha-blue rounded-full flex items-center justify-center">
            <span className="text-white text-sm">{icon}</span>
          </span>
          {title}
        </h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="w-8 h-8 bg-inha-blue text-white rounded flex items-center justify-center hover:opacity-90 transition-opacity text-xl"
            title="추가">
            +
          </button>
        )}
      </div>

      {/* Section Content */}
      <div className="border border-gray-300 rounded">{children}</div>
    </div>
  );
}
