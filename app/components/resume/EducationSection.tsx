"use client";
import { useTranslation } from "i18nexus";

import Section from "./Section";
import type { Education } from "../../../lib/adapters/resume.adapter";

interface Props {
  data: Education;
}

export default function EducationSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <Section title={t("학적 정보")} icon="▶">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span>
                {t("소속학과")}
              </label>
              <input
                type="text"
                defaultValue={data.school}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span>
                {t("학년/차수")}
              </label>
              <input
                type="text"
                defaultValue={data.major}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder={t("4학년 또는 M1, D2 등")}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span>
                {t("복수전공")}
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder={t("없음 또는 전공명")}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span>
                {t("학점 (GPA)")}
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="3.50 / 4.5"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
