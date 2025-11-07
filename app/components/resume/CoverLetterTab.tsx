"use client";import { useTranslation } from "i18nexus";

import { useState } from "react";
import { useSaveCoverLetter, useResume } from "../../../lib/hooks/useResume";

export default function CoverLetterTab() {const { t } = useTranslation();
  const { data: resume } = useResume();
  const { mutate: saveCoverLetter, isPending } = useSaveCoverLetter();

  const [answers, setAnswers] = useState({
    question1: resume?.coverLetter.question1 || "",
    question2: resume?.coverLetter.question2 || "",
    question3: resume?.coverLetter.question3 || ""
  });

  const handleSave = () => {
    saveCoverLetter(answers, {
      onSuccess: () => {
        alert(t("자기소개서가 저장되었습니다."));
      },
      onError: () => {
        alert(t("저장에 실패했습니다."));
      }
    });
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
          disabled={isPending}
          className="px-6 py-2 bg-inha-blue text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50">
          {isPending ? t("저장 중...") : t("저장")}
        </button>
      </div>

      {/* Cover Letter Section */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <div className="bg-inha-blue text-white px-6 py-4 flex items-center gap-2 shadow-sm">
          <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-inha-blue text-sm font-bold">▶</span>
          </span>
          <h2 className="text-lg font-bold text-white">{t("자기소개서 작성")}</h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Question 1 - 지원 동기 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>
              {t("지원 동기 (500자 이내)")}
            </label>
            <p className="text-xs text-gray-600 mb-2">
              {t("해당 연구실에 지원하게 된 동기를 작성해주세요.")}
            </p>
            <textarea
              value={answers.question1}
              onChange={(e) =>
                setAnswers({ ...answers, question1: e.target.value })
              }
              maxLength={500}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder=""
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(answers.question1)}{t("/ 500자")}
            </div>
          </div>

          {/* Question 2 - 관련 경험 및 프로젝트 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t("관련 경험 및 프로젝트 (선택)")}
            </label>
            <p className="text-xs text-gray-600 mb-2">
              {t("관련 수업, 프로젝트, 동아리 활동 등의 경험이 있다면 작성해주세요.")}
            </p>
            <textarea
              value={answers.question2}
              onChange={(e) =>
                setAnswers({ ...answers, question2: e.target.value })
              }
              maxLength={500}
              className="w-full min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder=""
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(answers.question2)}{t("/ 500자")}
            </div>
          </div>

          {/* Question 3 - 관심 연구 분야 */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <span className="text-red-500">*</span>
              {t("관심 연구 분야 (300자 이내)")}
            </label>
            <p className="text-xs text-gray-600 mb-2">
              {t("관심 있는 연구 주제나 배우고 싶은 내용을 작성해주세요.")}
            </p>
            <textarea
              value={answers.question3}
              onChange={(e) =>
                setAnswers({ ...answers, question3: e.target.value })
              }
              maxLength={300}
              className="w-full min-h-[120px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
              placeholder=""
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {getCharCount(answers.question3)}{t("/ 300자")}
            </div>
          </div>
        </div>
      </div>
    </div>);

}