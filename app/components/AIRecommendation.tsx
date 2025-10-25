"use client";

import { useState } from "react";
import {
  useResumeStatus,
  useRecommendedLabs,
} from "../../lib/hooks/useResearchLabs";
import { useRouter } from "next/navigation";

type ViewState = "initial" | "loading" | "results" | "no-resume";

export default function AIRecommendation() {
  const [viewState, setViewState] = useState<ViewState>("initial");
  const router = useRouter();

  const { data: resumeStatus } = useResumeStatus();
  const {
    mutate: getRecommendations,
    data: recommendedLabs,
    isPending,
  } = useRecommendedLabs();

  const handleStartRecommendation = () => {
    setViewState("loading");

    // 이력서 확인
    if (resumeStatus?.hasResume) {
      getRecommendations(undefined, {
        onSuccess: () => {
          setViewState("results");
        },
        onError: () => {
          alert("추천 결과를 불러오는데 실패했습니다.");
          setViewState("initial");
        },
      });
    } else {
      setViewState("no-resume");
    }
  };

  const handleGoToResume = () => {
    // TODO: 이력서 관리 페이지로 이동
    router.push("/resume");
  };

  // 초기 화면
  if (viewState === "initial") {
    return (
      <div className="w-full">
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              나에게 적합한 연구실을 찾고 계신가요?
            </h2>
            <p className="text-gray-600 mb-6">
              AI가 입력하신 이력서 정보를 기반으로
              <br />
              맞춤형 연구실을 추천해드립니다.
            </p>
            <button
              onClick={handleStartRecommendation}
              className="px-8 py-3 bg-white text-gray-700 rounded-lg border-2 border-gray-300 hover:border-inha-blue hover:text-inha-blue transition-colors font-medium">
              AI 추천 시작
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (viewState === "loading" || isPending) {
    return (
      <div className="w-full">
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-inha-blue border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">
              AI가 맞춤형 연구실을 분석하고 있습니다...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 이력서 미등록
  if (viewState === "no-resume") {
    return (
      <div className="w-full">
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="max-w-md mx-auto">
            <p className="text-gray-700 mb-2">
              ※ 이력서 정보가 등록되어 있지 않습니다.
            </p>
            <p className="text-gray-600 mb-6">
              AI 추천을 위해 이력서를 먼저 작성해주세요.
            </p>
            <button
              onClick={handleGoToResume}
              className="px-8 py-3 bg-white text-gray-700 rounded-lg border-2 border-gray-300 hover:border-inha-blue hover:text-inha-blue transition-colors font-medium">
              이력서 관리 페이지로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 추천 결과
  if (viewState === "results" && recommendedLabs) {
    return (
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          AI 연구실 추천 결과
        </h2>

        {/* Results Table */}
        <div className="border border-gray-300 overflow-hidden rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_1fr_200px_1fr] bg-blue-100 border-b border-gray-300">
            <div className="px-4 py-3 text-center font-medium text-gray-800 border-r border-gray-300">
              순위
            </div>
            <div className="px-4 py-3 text-center font-medium text-gray-800 border-r border-gray-300">
              연구실명 / 지도교수 / 연구내용
            </div>
            <div className="px-4 py-3 text-center font-medium text-gray-800 border-r border-gray-300">
              적합도 / 예상합격률
            </div>
            <div className="px-4 py-3 text-center font-medium text-gray-800">
              추천이유
            </div>
          </div>

          {/* Table Body */}
          <div>
            {recommendedLabs.map((lab) => (
              <div
                key={lab.id}
                className="grid grid-cols-[80px_1fr_200px_1fr] border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {/* Rank with icon */}
                <div className="px-4 py-6 flex items-center justify-center border-r border-gray-200">
                  {lab.rank <= 3 ? (
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {lab.rank}
                        </span>
                      </div>
                      {lab.rank === 3 && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">⭐</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-600 text-lg font-semibold">
                      {lab.rank}
                    </span>
                  )}
                </div>

                {/* Lab Info */}
                <div className="px-4 py-6 border-r border-gray-200">
                  <div className="mb-2">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium text-base inline-flex items-center gap-1">
                      {lab.labName}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    - {lab.professor} / {lab.department}
                  </div>
                  <div className="text-sm text-gray-700">
                    - 연구내용 :
                    <div className="mt-1 pl-2">
                      {lab.researchArea.split(",").map((area, idx) => (
                        <div key={idx}>{area.trim()}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compatibility & Acceptance */}
                <div className="px-4 py-6 border-r border-gray-200 text-center">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {lab.compatibility}
                    </div>
                    <div className="text-lg font-semibold text-inha-blue">
                      예상합격률
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="px-4 py-6 flex items-center">
                  <div className="text-sm text-gray-700">{lab.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setViewState("initial")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            다시 추천받기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
