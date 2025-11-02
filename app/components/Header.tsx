"use client";

import { useLanguageSwitcher, useTranslation } from "i18nexus";
import Image from "next/image";

export default function Header() {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguageSwitcher();

  const toggleLanguage = () => {
    const newLang = currentLanguage === "ko" ? "en" : "ko";
    changeLanguage(newLang);
  };

  return (
    <header className="text-gray-800 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Image
          src="/logo_ins.gif"
          alt="INHA UNIVERSITY"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* 언어 전환 버튼 */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-inha-blue text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
            />
          </svg>
          {currentLanguage === "ko" ? "EN" : "KO"}
        </button>

        {/* 닫기 버튼 */}
        <button className="px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors text-gray-700 border border-gray-300">
          {t("닫기")}
        </button>
      </div>
    </header>
  );
}
