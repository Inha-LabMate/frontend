"use client";
import { useTranslation } from "i18nexus";

import { useState, useEffect } from "react";

interface CoverLetterData {
  research_interests: string;
  intro1: string;
  intro2: string;
  intro3: string;
  portfolio: string;
  major: string;
  certifications: string;
  awards: string;
  tech_stack: string;
  toeic_score: string;
  english_proficiency: string;
  gpa: string;
}

export default function CoverLetterTab() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<CoverLetterData>({
    research_interests: "",
    intro1: "",
    intro2: "",
    intro3: "",
    portfolio: "",
    major: "",
    certifications: "",
    awards: "",
    tech_stack: "",
    toeic_score: "",
    english_proficiency: "",
    gpa: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cover_letter_data");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (error) {
          console.error("Failed to load cover letter data:", error);
        }
      }
    }
  }, []);

  // 로컬스토리지에 저장
  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem("cover_letter_data", JSON.stringify(formData));
      alert(t("자기소개서가 저장되었습니다."));
    } catch (error) {
      console.error("Failed to save cover letter data:", error);
      alert(t("저장에 실패했습니다."));
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof CoverLetterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  return (
    <div className="w-full">
      {/* Save Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-inha-blue text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50">
          {isSaving ? t("저장 중...") : t("저장")}
        </button>
      </div>

      {/* Cover Letter Section */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <div className="bg-inha-blue text-white px-6 py-4 flex items-center gap-2 shadow-sm">
          <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-inha-blue text-sm font-bold">▶</span>
          </span>
          <h2 className="text-lg font-bold text-white">
            {t("자기소개서 작성")}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> {t("전공")}
              </label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => updateField("major", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="예) 컴퓨터공학"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> {t("학점")} (GPA)
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => updateField("gpa", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="예) 3.9"
              />
            </div>
          </div>

          {/* 어학 능력 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t("토익 점수")}
              </label>
              <input
                type="text"
                value={formData.toeic_score}
                onChange={(e) => updateField("toeic_score", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder="예) 880"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t("영어 능숙도")}
              </label>
              <select
                value={formData.english_proficiency}
                onChange={(e) =>
                  updateField("english_proficiency", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent">
                <option value="">선택</option>
                <option value="상">상</option>
                <option value="중">중</option>
                <option value="하">하</option>
              </select>
            </div>
          </div>

          {/* 연구 관심 분야 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>{" "}
              {t("연구 관심 분야 (Research Interests)")}
            </label>
            <input
              type="text"
              value={formData.research_interests}
              onChange={(e) =>
                updateField("research_interests", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              placeholder="예) 네트워크 보안, 무선 통신, IoT 시스템"
            />
            <div className="text-xs text-gray-500 mt-1">
              쉼표(,)로 구분하여 여러 분야를 입력할 수 있습니다
            </div>
          </div>

          {/* 자기소개 1 - 관심사 및 연구 목표 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>{" "}
              {t("관심사 및 연구 목표 (1000자 이내)")}
            </label>
            <textarea
              value={formData.intro1}
              onChange={(e) => updateField("intro1", e.target.value)}
              maxLength={1000}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder="어떤 연구 분야에 관심이 있으며, 어떤 연구를 하고 싶은지 작성해주세요."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(formData.intro1)} / 1000자
            </div>
          </div>

          {/* 자기소개 2 - 기술 스택 및 프로젝트 경험 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>{" "}
              {t("기술 스택 및 프로젝트 경험 (1000자 이내)")}
            </label>
            <textarea
              value={formData.intro2}
              onChange={(e) => updateField("intro2", e.target.value)}
              maxLength={1000}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder="사용 가능한 프로그래밍 언어, 도구, 프레임워크와 관련 프로젝트 경험을 작성해주세요."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(formData.intro2)} / 1000자
            </div>
          </div>

          {/* 자기소개 3 - 향후 연구 계획 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>{" "}
              {t("향후 연구 계획 (1000자 이내)")}
            </label>
            <textarea
              value={formData.intro3}
              onChange={(e) => updateField("intro3", e.target.value)}
              maxLength={1000}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder="대학원에서 어떤 연구를 하고 싶은지, 연구 목표를 작성해주세요."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(formData.intro3)} / 1000자
            </div>
          </div>

          {/* 기술 스택 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t("보유 기술 스택")}
            </label>
            <input
              type="text"
              value={formData.tech_stack}
              onChange={(e) => updateField("tech_stack", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              placeholder="예) Python, C, Wireshark, Scapy, Mininet, OpenFlow, Docker"
            />
            <div className="text-xs text-gray-500 mt-1">
              쉼표(,)로 구분하여 입력해주세요
            </div>
          </div>

          {/* 포트폴리오 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t("포트폴리오 및 프로젝트 요약")}
            </label>
            <textarea
              value={formData.portfolio}
              onChange={(e) => updateField("portfolio", e.target.value)}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder="주요 프로젝트를 [프로젝트 N] 형식으로 작성해주세요.&#10;예) [프로젝트 1] OpenFlow 기반 SDN 컨트롤러 DDoS 탐지 시스템 (탐지율 94%)"
            />
          </div>

          {/* 자격증 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t("자격증")}
            </label>
            <input
              type="text"
              value={formData.certifications}
              onChange={(e) => updateField("certifications", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              placeholder="예) 정보처리기사, 정보보안기사"
            />
            <div className="text-xs text-gray-500 mt-1">
              쉼표(,)로 구분하여 입력해주세요
            </div>
          </div>

          {/* 수상 경력 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t("수상 경력")}
            </label>
            <input
              type="text"
              value={formData.awards}
              onChange={(e) => updateField("awards", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              placeholder="예) 네트워크 보안 경진대회 우수상, 사이버 보안 해커톤 장려상"
            />
            <div className="text-xs text-gray-500 mt-1">
              쉼표(,)로 구분하여 입력해주세요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
