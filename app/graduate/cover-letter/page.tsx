"use client";

import { useTranslation } from "i18nexus";
import SelfIntroSection from "../../components/resume/SelfIntroSection";

export default function CoverLetterPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          <span className="text-inha-blue">■</span>
          {t("자기소개서")}
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          {t("홈 > 대학원(학적) > 자기소개서")}
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Content */}
      <SelfIntroSection />
    </>
  );
}
