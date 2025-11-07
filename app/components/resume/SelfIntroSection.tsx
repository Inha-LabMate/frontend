"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "i18nexus";
import {
  getSelfIntroFromStorage,
  saveSelfIntroToStorage,
  deleteSelfIntroFromStorage,
  getEmptySelfIntro,
  type SelfIntroData,
} from "../../../lib/utils/resume-storage";

export default function SelfIntroSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<SelfIntroData>(getEmptySelfIntro());
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 컴포넌트 마운트 시 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    try {
      console.log("📂 자기소개서 불러오기 시작...");
      const savedData = getSelfIntroFromStorage();
      setFormData(savedData);
      console.log("✅ 자기소개서 불러오기 완료:", savedData);
    } catch (error) {
      console.error("❌ 자기소개서 불러오기 중 오류:", error);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      console.log("💾 저장 시작...", formData);
      const success = saveSelfIntroToStorage(formData);

      if (success) {
        setIsSaved(true);
        setShowSaveAlert(true);
        console.log("✅ 저장 완료!");

        // 저장 후 다시 불러와서 확인
        const verified = getSelfIntroFromStorage();
        console.log("🔍 저장 검증:", verified);

        if (!verified) {
          console.error("❌ 저장 검증 실패!");
          setSaveError("저장 검증에 실패했습니다.");
        }
      } else {
        console.error("❌ 저장 실패!");
        setSaveError("저장에 실패했습니다.");
        alert("저장에 실패했습니다. 콘솔을 확인해주세요.");
      }

      // 2초 후 저장 상태 초기화
      setTimeout(() => setIsSaved(false), 2000);

      // 3초 후 알림 메시지 숨김
      setTimeout(() => setShowSaveAlert(false), 3000);
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
      setSaveError("저장 중 오류가 발생했습니다.");
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("자기소개서 데이터를 모두 삭제하시겠습니까?")) {
      const success = deleteSelfIntroFromStorage();
      if (success) {
        setFormData(getEmptySelfIntro());
        setIsSaved(false);
        console.log("✅ 초기화 완료!");
      } else {
        console.error("❌ 초기화 실패!");
        alert("초기화에 실패했습니다.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 저장 완료 알림 */}
      {showSaveAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">자기소개서가 저장되었습니다!</span>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("자기소개서")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            초기화
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 text-sm text-white rounded-lg transition-colors ${
              isSaved
                ? "bg-green-600 hover:bg-green-700"
                : "bg-inha-blue hover:bg-blue-700"
            }`}>
            {isSaved ? "✓ 저장됨" : "저장"}
          </button>
        </div>
      </div>

      {/* 폼 필드들 */}
      <div className="space-y-4">
        {/* 연구 관심 분야 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            연구 관심 분야
          </label>
          <input
            type="text"
            name="research_interests"
            value={formData.research_interests}
            onChange={handleChange}
            placeholder="예: 네트워크 보안, 무선 통신, IoT 시스템"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
          />
        </div>

        {/* 자기소개 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            자기소개 1 - 관심사 및 연구 분야
          </label>
          <textarea
            name="intro1"
            value={formData.intro1}
            onChange={handleChange}
            rows={3}
            placeholder="관심 있는 연구 분야와 구체적인 연구 주제를 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
          />
        </div>

        {/* 자기소개 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            자기소개 2 - 기술 및 경험
          </label>
          <textarea
            name="intro2"
            value={formData.intro2}
            onChange={handleChange}
            rows={3}
            placeholder="보유하고 있는 기술 스택과 관련 프로젝트 경험을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
          />
        </div>

        {/* 자기소개 3 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            자기소개 3 - 연구 목표
          </label>
          <textarea
            name="intro3"
            value={formData.intro3}
            onChange={handleChange}
            rows={3}
            placeholder="대학원에서 수행하고 싶은 연구 목표를 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
          />
        </div>

        {/* 포트폴리오/프로젝트 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            포트폴리오 / 프로젝트
          </label>
          <textarea
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            rows={4}
            placeholder="[프로젝트 1] 프로젝트명 및 설명&#10;[프로젝트 2] 프로젝트명 및 설명"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
          />
        </div>

        {/* 2열 레이아웃 시작 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 전공 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전공
            </label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="예: 컴퓨터공학"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
            />
          </div>

          {/* 학점 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              학점 (GPA)
            </label>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="예: 3.9"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* 자격증 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            자격증
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="예: 정보처리기사, 정보보안기사"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
          />
        </div>

        {/* 수상 경력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            수상 경력
          </label>
          <input
            type="text"
            name="awards"
            value={formData.awards}
            onChange={handleChange}
            placeholder="예: 네트워크 보안 경진대회 우수상, 사이버 보안 해커톤 장려상"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
          />
        </div>

        {/* 기술 스택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            기술 스택
          </label>
          <input
            type="text"
            name="tech_stack"
            value={formData.tech_stack}
            onChange={handleChange}
            placeholder="예: Python, C, Wireshark, Scapy, Docker, Kali Linux"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
          />
        </div>

        {/* 2열 레이아웃 - 영어 능력 */}
        <div className="grid grid-cols-2 gap-4">
          {/* TOEIC 점수 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TOEIC 점수
            </label>
            <input
              type="text"
              name="toeic_score"
              value={formData.toeic_score}
              onChange={handleChange}
              placeholder="예: 880"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent"
            />
          </div>

          {/* 영어 능력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              영어 능력
            </label>
            <select
              name="english_proficiency"
              value={formData.english_proficiency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-inha-blue focus:border-transparent">
              <option value="">선택</option>
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
          </div>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          초기화
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg transition-colors disabled:cursor-not-allowed ${
            isSaving
              ? "bg-gray-400 text-white cursor-wait"
              : isSaved
              ? "bg-green-500 text-white"
              : "bg-inha-blue text-white hover:bg-blue-700"
          }`}>
          {isSaving ? "저장 중..." : isSaved ? "✓ 저장 완료" : "저장"}
        </button>
      </div>

      {/* 에러 메시지 */}
      {saveError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          ⚠️ {saveError}
        </div>
      )}

      {/* 안내 메시지 */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 작성한 자기소개서 데이터는 로컬스토리지에 저장되며, AI 연구실 추천
          시 자동으로 활용됩니다.
        </p>
      </div>
    </div>
  );
}
