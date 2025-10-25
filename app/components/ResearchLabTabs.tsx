"use client";

import { useState } from "react";
import UndergradResearchTable from "./UndergradResearchTable";
import GraduateResearchTable from "./GraduateResearchTable";
import AIRecommendation from "./AIRecommendation";

type TabType = "undergrad" | "graduate" | "ai";

export default function ResearchLabTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("undergrad");

  const tabs = [
    { id: "undergrad" as TabType, label: "학부연구생" },
    { id: "graduate" as TabType, label: "대학원" },
    { id: "ai" as TabType, label: "AI 연구실 추천" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "undergrad":
        return <UndergradResearchTable />;
      case "graduate":
        return <GraduateResearchTable />;
      case "ai":
        return <AIRecommendation />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "bg-inha-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
}
