"use client";

import Section from "./Section";
import type { Education } from "../../../lib/adapters/resume.adapter";

interface Props {
  data: Education;
}

export default function EducationSection({ data }: Props) {
  return (
    <Section title="학적 정보" icon="▶">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 w-24">
                <span className="text-red-500">*</span> 소속학과
              </label>
              <input
                type="text"
                defaultValue={data.school}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 w-24">
                <span className="text-red-500">*</span> 학년/차수
              </label>
              <input
                type="text"
                defaultValue={data.major}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 w-24">
                <span className="text-red-500">*</span> 복수전공
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 w-24">
                <span className="text-red-500">*</span> 생적/학적
              </label>
              <input
                type="text"
                defaultValue={data.graduationStatus}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
