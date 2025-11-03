"use client";

import Link from "next/link";
import { useTranslation } from "i18nexus";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-inha-blue mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {t("페이지를 찾을 수 없습니다")}
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            {t("요청하신 페이지가 존재하지 않거나 이동되었습니다.")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-inha-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
            {t("홈으로 돌아가기")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium shadow-md hover:shadow-lg">
            {t("이전 페이지로")}
          </button>
        </div>

        <div className="mt-12">
          <svg
            className="w-64 h-64 mx-auto opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
