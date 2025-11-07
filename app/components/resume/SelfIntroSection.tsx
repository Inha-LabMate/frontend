"use client";

import { useState, useEffect } from "react";
import {
  getSelfIntroFromStorage,
  saveSelfIntroToStorage,
  getEmptySelfIntro,
  type SelfIntroData,
} from "../../../lib/utils/resume-storage";

export default function SelfIntroSection() {
  const [formData, setFormData] = useState<SelfIntroData>(getEmptySelfIntro());
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showBulkInputModal, setShowBulkInputModal] = useState(false);
  const [bulkText, setBulkText] = useState("");

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
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      console.log("💾 저장 시작...", formData);
      const success = saveSelfIntroToStorage(formData);

      if (success) {
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

  // 텍스트 파싱 함수
  const parseBulkText = (text: string) => {
    const sections = {
      intro1: "",
      intro2: "",
      intro3: "",
    };

    // 정규식 패턴: "1", "2", "3" 또는 1번, 2번, 3번 또는 1., 2., 3. 또는 1:, 2:, 3:
    const patterns = [
      /["']?1["']?\s*[번\.:]?\s*:?\s*([\s\S]*?)(?=["']?2["']?\s*[번\.:]?|$)/i,
      /["']?2["']?\s*[번\.:]?\s*:?\s*([\s\S]*?)(?=["']?3["']?\s*[번\.:]?|$)/i,
      /["']?3["']?\s*[번\.:]?\s*:?\s*([\s\S]*)/i,
    ];

    patterns.forEach((pattern, index) => {
      const match = text.match(pattern);
      if (match && match[1]) {
        const content = match[1].trim();
        if (index === 0) sections.intro1 = content;
        else if (index === 1) sections.intro2 = content;
        else if (index === 2) sections.intro3 = content;
      }
    });

    return sections;
  };

  const handleBulkInput = () => {
    if (!bulkText.trim()) {
      alert("텍스트를 입력해주세요.");
      return;
    }

    const parsed = parseBulkText(bulkText);

    // 파싱 결과 확인
    if (!parsed.intro1 && !parsed.intro2 && !parsed.intro3) {
      alert(
        "문항을 찾을 수 없습니다.\n\n예시:\n1번 : 내용\n2번 : 내용\n3번 : 내용"
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      intro1: parsed.intro1 || prev.intro1,
      intro2: parsed.intro2 || prev.intro2,
      intro3: parsed.intro3 || prev.intro3,
    }));

    setShowBulkInputModal(false);
    setBulkText("");

    alert("자기소개서가 자동으로 입력되었습니다!");
  };

  return (
    <div className="space-y-4">
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

      {/* 한번에 입력하기 모달 */}
      {showBulkInputModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* 모달 헤더 */}
            <div className="bg-inha-blue text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                📝 자기소개서 한번에 입력하기
              </h3>
              <button
                onClick={() => {
                  setShowBulkInputModal(false);
                  setBulkText("");
                }}
                className="text-white hover:text-gray-200 text-2xl leading-none">
                ×
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  💡 사용 방법
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• 아래 텍스트 영역에 자기소개서 전체를 붙여넣으세요.</p>
                  <p>
                    • 문항 구분:{" "}
                    <code className="bg-blue-100 px-1 rounded">1번</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">2번</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">3번</code> 또는{" "}
                    <code className="bg-blue-100 px-1 rounded">
                      &quot;1&quot;
                    </code>
                    ,{" "}
                    <code className="bg-blue-100 px-1 rounded">
                      &quot;2&quot;
                    </code>
                    ,{" "}
                    <code className="bg-blue-100 px-1 rounded">
                      &quot;3&quot;
                    </code>
                  </p>
                  <p>
                    • 지원 형식:{" "}
                    <code className="bg-blue-100 px-1 rounded">1.</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">1:</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">1번:</code> 등
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700">
                <strong>예시:</strong>
                <pre className="mt-2 whitespace-pre-wrap font-mono text-xs">
                  {`1번 : 데이터를 기반으로 세상을 이해하고...
2번 : AI 응용 프로젝트를 다수 진행하며...
3번 : AI가 데이터를 이해하고 예측하며...`}
                </pre>
              </div>

              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="여기에 자기소개서 전체를 붙여넣으세요..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-inha-blue resize-none font-mono text-sm"
              />

              <div className="mt-2 text-xs text-gray-500">
                총 {bulkText.length}자 입력됨
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBulkInputModal(false);
                  setBulkText("");
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                취소
              </button>
              <button
                onClick={handleBulkInput}
                className="px-6 py-2 bg-inha-blue text-white rounded hover:opacity-90 transition-opacity">
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 저장 버튼 - 오른쪽 상단 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowBulkInputModal(true)}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          📝 자소서 한번에 입력하기
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50">
          저장
        </button>
      </div>

      {/* 자기소개서 작성 섹션 */}
      <div className="border border-gray-300">
        {/* 헤더 */}
        <div className="bg-inha-blue text-white px-4 py-3 flex items-center gap-2">
          <span className="text-lg">▶</span>
          <span className="font-medium">자기소개서 작성</span>
        </div>

        {/* 문항들 */}
        <div className="divide-y divide-gray-300">
          {/* 문항 1 */}
          <div className="grid grid-cols-12">
            <div className="col-span-3 bg-gray-100 p-4 border-r border-gray-300">
              <div className="font-medium text-gray-800">문항 1</div>
              <div className="text-sm text-inha-blue mt-1">
                : 지원 동기 (500자 이내)
              </div>
            </div>
            <div className="col-span-9 p-4">
              <textarea
                name="intro1"
                value={formData.intro1}
                onChange={handleChange}
                rows={6}
                maxLength={500}
                placeholder="해당 연구실에 지원하게 된 동기를 작성해주세요."
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue resize-none"
              />
              <div className="text-right text-xs text-gray-600 mt-1">
                {formData.intro1.length}/500
              </div>
            </div>
          </div>

          {/* 문항 2 */}
          <div className="grid grid-cols-12">
            <div className="col-span-3 bg-gray-100 p-4 border-r border-gray-300">
              <div className="font-medium text-gray-800">문항 2</div>
              <div className="text-sm text-inha-blue mt-1">
                : 관련 경험 및 프로젝트
              </div>
            </div>
            <div className="col-span-9 p-4">
              <textarea
                name="intro2"
                value={formData.intro2}
                onChange={handleChange}
                rows={8}
                maxLength={800}
                placeholder="관련 수업, 프로젝트, 동아리 활동 등의 경험이 있다면 작성해주세요."
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue resize-none"
              />
              <div className="text-right text-xs text-gray-600 mt-1">
                {formData.intro2.length}/800
              </div>
            </div>
          </div>

          {/* 문항 3 */}
          <div className="grid grid-cols-12">
            <div className="col-span-3 bg-gray-100 p-4 border-r border-gray-300">
              <div className="font-medium text-gray-800">문항 3</div>
              <div className="text-sm text-inha-blue mt-1">
                : 관심 연구 분야 (300자 이내)
              </div>
            </div>
            <div className="col-span-9 p-4">
              <textarea
                name="intro3"
                value={formData.intro3}
                onChange={handleChange}
                rows={5}
                maxLength={300}
                placeholder="관심 있는 연구 주제나 배우고 싶은 내용을 작성해주세요."
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue resize-none"
              />
              <div className="text-right text-xs text-gray-600 mt-1">
                {formData.intro3.length}/300
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 에러 메시지 */}
      {saveError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          ⚠️ {saveError}
        </div>
      )}
    </div>
  );
}
