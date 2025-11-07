"use client";
import { useTranslation } from "i18nexus";

import { useState, useEffect } from "react";
import {
  useResumeStatus,
  useRecommendedLabs,
} from "../../lib/hooks/useResearchLabs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "../../lib/store/resume-store";

type ViewState = "initial" | "loading" | "results" | "no-resume";

export default function AIRecommendation() {
  const { t } = useTranslation();
  const [viewState, setViewState] = useState<ViewState>("initial");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoadingStarted, setIsLoadingStarted] = useState(false);
  const router = useRouter();

  // Zustand store에서 자기소개서 데이터 가져오기
  const selfIntro = useResumeStore((state) => state.selfIntro);

  const { data: resumeStatus } = useResumeStatus();
  const {
    mutate: getRecommendations,
    data: recommendedLabs,
    isPending,
  } = useRecommendedLabs();

  // 로딩 애니메이션 효과 - 0.1초마다 10%씩 증가 (1초 완료)
  useEffect(() => {
    if (viewState === "loading" && !isLoadingStarted) {
      setIsLoadingStarted(true);

      const loadingMessages = [
        t("이력서 정보를 분석하는 중입니다..."),
        t("연구실 데이터베이스를 검색하고 있습니다..."),
        t("적합도를 계산하고 있습니다..."),
        t("최적의 연구실을 선정하고 있습니다..."),
        t("추천 결과를 생성하고 있습니다..."),
      ];

      let progress = 0;
      let messageIndex = 0;

      setLoadingText(loadingMessages[0]);
      setLoadingProgress(0);

      // 0.1초마다 10%씩 증가 (총 1초 = 10회 * 10% = 100%)
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(progressInterval);
        }
        setLoadingProgress(progress);

        const newMessageIndex = Math.floor(
          (progress / 100) * loadingMessages.length
        );
        if (
          newMessageIndex !== messageIndex &&
          newMessageIndex < loadingMessages.length
        ) {
          messageIndex = newMessageIndex;
          setLoadingText(loadingMessages[messageIndex]);
        }
      }, 100); // 0.1초마다

      return () => clearInterval(progressInterval);
    } else if (viewState !== "loading") {
      setIsLoadingStarted(false);
    }
  }, [viewState, isLoadingStarted, t]);

  const handleStartRecommendation = () => {
    setViewState("loading");
    setLoadingProgress(0);
    setIsLoadingStarted(false);

    // 이력서 확인
    if (resumeStatus?.hasResume) {
      setTimeout(() => {
        // Zustand store의 자기소개서 데이터를 전달
        getRecommendations(selfIntro, {
          onSuccess: () => {
            setTimeout(() => {
              setViewState("results");
            }, 500);
          },
          onError: () => {
            alert(t("추천 결과를 불러오는데 실패했습니다."));
            setViewState("initial");
          },
        });
      }, 3000);
    } else {
      setTimeout(() => {
        setViewState("no-resume");
      }, 2000);
    }
  };

  const handleGoToResume = () => {
    // TODO: 이력서 관리 페이지로 이동
    router.push("/resume");
  };

  // 키보드 네비게이션
  useEffect(() => {
    if (viewState !== "results" || !recommendedLabs) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide((prev) =>
          prev < recommendedLabs.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Escape") {
        e.preventDefault();
        setViewState("initial");
        setCurrentSlide(0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewState, recommendedLabs]);

  // 초기 화면
  if (viewState === "initial") {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
        <div className="bg-white p-12 rounded-lg text-center shadow-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("나에게 적합한 연구실을 찾고 계신가요?")}
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              {t("AI가 입력하신 이력서 정보를 기반으로")}
              <br />
              <span className="font-semibold text-inha-blue">
                {t("맞춤형 연구실을 추천해드립니다.")}
              </span>
            </p>

            <button
              onClick={handleStartRecommendation}
              className="px-10 py-4 bg-inha-blue hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-lg transition-colors">
              {t("AI 추천 시작")}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // 로딩 중
  if (viewState === "loading") {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div className="bg-white p-12 rounded-lg text-center shadow-lg border border-gray-200">
          <div className="max-w-2xl mx-auto">
            {/* Simple Spinner */}
            <motion.div
              className="w-16 h-16 mx-auto mb-8 border-4 border-gray-200 border-t-inha-blue rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-inha-blue rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="text-right mt-2 text-sm font-semibold text-gray-600">
                {Math.floor(loadingProgress)}%
              </div>
            </div>

            {/* Loading Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6">
                <p className="text-gray-700 font-medium text-lg">
                  {loadingText}
                </p>
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-500 text-sm mt-4">잠시만 기다려주세요...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // API 호출 중 (isPending 상태)
  if (isPending) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div className="bg-white p-12 rounded-lg text-center shadow-lg border border-gray-200">
          <div className="max-w-2xl mx-auto">
            {/* Simple Spinner */}
            <motion.div
              className="w-16 h-16 mx-auto mb-8 border-4 border-gray-200 border-t-inha-blue rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <p className="text-gray-700 font-medium text-lg mb-4">
              추천 결과를 불러오는 중입니다...
            </p>
            <p className="text-gray-500 text-sm">잠시만 기다려주세요...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // 이력서 미등록
  if (viewState === "no-resume") {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div className="bg-white p-12 rounded-lg text-center shadow-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📋</div>

            <p className="text-gray-800 font-bold text-lg mb-2">
              {t("※ 이력서 정보가 등록되어 있지 않습니다.")}
            </p>

            <p className="text-gray-600 mb-8">
              {t("AI 추천을 위해 이력서를 먼저 작성해주세요.")}
            </p>

            <button
              onClick={handleGoToResume}
              className="px-8 py-3 bg-inha-blue hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-colors">
              📝 {t("이력서 관리 페이지로 이동")}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // 추천 결과 - 심플한 모달 슬라이더
  if (viewState === "results" && recommendedLabs) {
    const totalSlides = recommendedLabs.length;

    return (
      <motion.div
        className="fixed inset-0 bg-black z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        {/* Simple Black Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Close Button - Top Right */}
        <button
          onClick={() => {
            setViewState("initial");
            setCurrentSlide(0);
          }}
          className="absolute top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors group"
          aria-label="닫기">
          <svg
            className="w-6 h-6 text-white group-hover:text-white/80 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Slide Number */}
        <div className="absolute top-8 left-8 text-white text-sm z-40">
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Help Text */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/60 text-xs z-40">
          Space/→: 다음 • ←: 이전 • ESC: 닫기
        </div>

        {/* Main Content - Centered Slide with custom scrollbar */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="w-full max-w-4xl bg-black/60 rounded-xl p-10 shadow-none border border-white/5 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-custom"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
              }}>
              {(() => {
                const lab = recommendedLabs[currentSlide];
                return (
                  <div className="scroll-fade-in">
                    {/* Rank Badge */}
                    <div className="inline-flex items-center gap-4 mb-8">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                        <span className="text-white text-3xl font-bold">
                          {lab.rank}
                        </span>
                      </div>
                      <div>
                        <div className="text-white text-base">
                          순위 #{lab.rank}
                        </div>
                        <div className="text-white text-sm font-semibold mt-1">
                          적합도: {lab.compatibility}
                        </div>
                      </div>
                    </div>

                    {/* Lab Name */}
                    <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                      {lab.labName}
                    </h2>

                    {/* Professor & Department */}
                    <div className="text-white text-xl mb-10 flex items-center gap-3">
                      <span className="font-medium">{lab.professor}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white">{lab.department}</span>
                    </div>

                    {/* Research Areas */}
                    <div className="mb-10">
                      <div className="text-white text-base font-semibold mb-4">
                        연구 분야
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {lab.researchArea.split(",").map((area, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-2.5 bg-white/10 rounded-full text-white text-base border border-white/20 hover:bg-white/15 transition-colors">
                            {area.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommendation Reason */}
                    <div className="mb-10">
                      <div className="text-white text-base font-semibold mb-4">
                        추천 이유
                      </div>
                      <p className="text-white text-lg leading-relaxed bg-white/8 p-5 rounded-xl border border-white/15">
                        {lab.reason}
                      </p>
                    </div>

                    {/* Expected Acceptance */}
                    <div className="mt-10 pt-8 border-t border-white/15">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-base font-semibold">
                          {t("예상합격률")}
                        </span>
                        <span className="text-3xl font-bold text-white">
                          {lab.expectedAcceptance}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="flex gap-2">
            {recommendedLabs.map((lab, index) => (
              <button
                key={lab.id}
                onClick={() => setCurrentSlide(index)}
                className="flex-1 cursor-pointer">
                <div className="mb-2">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-300"
                      style={{
                        width: index === currentSlide ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`text-xs transition-colors ${
                    index === currentSlide
                      ? "text-white font-semibold"
                      : "text-white/40"
                  }`}>
                  {lab.labName.length > 20
                    ? lab.labName.substring(0, 20) + "..."
                    : lab.labName}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setViewState("initial")}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    );
  }

  return null;
}
