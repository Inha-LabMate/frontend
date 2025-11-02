"use client";import { useTranslation } from "i18nexus";

import ResearchLabTabs from "../../components/ResearchLabTabs";

export default function GraduatePage() {const { t } = useTranslation();
  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          <span className="text-inha-blue">■</span>{t("연구실 탐색/추천")}
        </h1>
        <div className="text-sm text-gray-500 mb-4">{t("홈 > 대학원(학적) > 연구실 탐색/추천")}

        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Research Lab Tabs */}
      <ResearchLabTabs />
    </>);

}