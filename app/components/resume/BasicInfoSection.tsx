"use client";

import Section from "./Section";
import type { BasicInfo } from "../../../lib/adapters/resume.adapter";

interface Props {
  data: BasicInfo;
}

export default function BasicInfoSection({ data }: Props) {
  return (
    <Section title="기본 정보" icon="▶">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 이름/성별
              </label>
              <input
                type="text"
                defaultValue={data.name}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 학번/ID
              </label>
              <input
                type="text"
                defaultValue={data.studentId}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 이메일
              </label>
              <input
                type="email"
                defaultValue={data.email}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 주소
              </label>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  defaultValue={data.address}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors text-sm whitespace-nowrap">
                  우편번호검색
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 소속학과
              </label>
              <input
                type="text"
                defaultValue={data.major}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 복수전공
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="없음 또는 전공명"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 학년/차수
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="4학년 또는 M1, D2 등"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-black w-24">
                <span className="text-red-500">*</span> 학점 (GPA)
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
