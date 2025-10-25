"use client";

import { useResume } from "../../../lib/hooks/useResume";
import BasicInfoSection from "./BasicInfoSection";
import EducationSection from "./EducationSection";
import LanguageSection from "./LanguageSection";
import CertificateSection from "./CertificateSection";
import AwardSection from "./AwardSection";
import PortfolioSection from "./PortfolioSection";

export default function ResumeTab() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-inha-blue border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">이력서를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-8 text-gray-500">
        이력서 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Save Button */}
      <div className="flex justify-end mb-4">
        <button className="px-6 py-2 bg-inha-blue text-white rounded hover:opacity-90 transition-opacity">
          저장
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <BasicInfoSection data={resume.basicInfo} />
        <EducationSection data={resume.education} />
        <LanguageSection data={resume.languages} />
        <CertificateSection data={resume.certificates} />
        <AwardSection data={resume.awards} />
        <PortfolioSection data={resume.portfolios} />
      </div>
    </div>
  );
}
