"use client";

import { useState } from "react";
import ResumeTab from "../../components/resume/ResumeTab";
import CoverLetterTab from "../../components/resume/CoverLetterTab";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"resume" | "cover">("resume");

  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          <span className="text-inha-blue">■</span> 이력서 관리
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          홈 &gt; 대학원(학적) &gt; 이력서 관리
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("resume")}
          className={`px-8 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "resume"
              ? "bg-inha-blue text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}>
          이력서
        </button>
        <button
          onClick={() => setActiveTab("cover")}
          className={`px-8 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "cover"
              ? "bg-inha-blue text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}>
          자기소개서
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "resume" ? <ResumeTab /> : <CoverLetterTab />}
    </>
  );
}
