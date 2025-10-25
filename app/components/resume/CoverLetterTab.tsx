"use client";

import { useState } from "react";
import { useSaveCoverLetter, useResume } from "../../../lib/hooks/useResume";

export default function CoverLetterTab() {
  const { data: resume } = useResume();
  const { mutate: saveCoverLetter, isPending } = useSaveCoverLetter();

  const [answers, setAnswers] = useState({
    question1: resume?.coverLetter.question1 || "",
    question2: resume?.coverLetter.question2 || "",
    question3: resume?.coverLetter.question3 || "",
  });

  const handleSave = () => {
    saveCoverLetter(answers, {
      onSuccess: () => {
        alert("자기소개서가 저장되었습니다.");
      },
      onError: () => {
        alert("저장에 실패했습니다.");
      },
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
          {isPending ? "저장 중..." : "저장"}
        </button>
      </div>

      {/* Cover Letter Section */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-inha-blue text-white px-6 py-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-inha-blue text-sm">▶</span>
          </span>
          <h2 className="text-lg font-bold">자기소개서 작성</h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Question 1 */}
          <div>
            <div className="flex items-start gap-4 mb-2">
              <span className="bg-gray-100 px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                문항 1
              </span>
              <textarea
                value={answers.question1}
                onChange={(e) =>
                  setAnswers({ ...answers, question1: e.target.value })
                }
                maxLength={800}
                className="flex-1 min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
                placeholder="자기소개서를 작성해주세요 (800자 이내)"
              />
            </div>
            <div className="text-right text-sm text-gray-600">
              {getCharCount(answers.question1)}/800
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <div className="flex items-start gap-4 mb-2">
              <span className="bg-gray-100 px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                문항 2
              </span>
              <textarea
                value={answers.question2}
                onChange={(e) =>
                  setAnswers({ ...answers, question2: e.target.value })
                }
                maxLength={800}
                className="flex-1 min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
                placeholder="자기소개서를 작성해주세요 (800자 이내)"
              />
            </div>
            <div className="text-right text-sm text-gray-600">
              {getCharCount(answers.question2)}/800
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <div className="flex items-start gap-4 mb-2">
              <span className="bg-gray-100 px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                문항 3
              </span>
              <textarea
                value={answers.question3}
                onChange={(e) =>
                  setAnswers({ ...answers, question3: e.target.value })
                }
                maxLength={800}
                className="flex-1 min-h-[150px] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inha-blue focus:border-transparent resize-none"
                placeholder="자기소개서를 작성해주세요 (800자 이내)"
              />
            </div>
            <div className="text-right text-sm text-gray-600">
              {getCharCount(answers.question3)}/800
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
