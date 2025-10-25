"use client";

import ResearchLabTabs from "../../components/ResearchLabTabs";

export default function GraduatePage() {
  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          <span className="text-inha-blue">■</span> 연구실 탐색/추천
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          홈 &gt; 대학원(학적) &gt; 연구실 탐색/추천
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Research Lab Tabs */}
      <ResearchLabTabs />
    </>
  );
}
