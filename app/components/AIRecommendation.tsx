"use client";import { useTranslation } from "i18nexus";

import { useState, useEffect } from "react";
import {
  useResumeStatus,
  useRecommendedLabs } from
"../../lib/hooks/useResearchLabs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type ViewState = "initial" | "loading" | "results" | "no-resume";

export default function AIRecommendation() {const { t } = useTranslation();
  const [viewState, setViewState] = useState<ViewState>("initial");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const router = useRouter();

  const { data: resumeStatus } = useResumeStatus();
  const {
    mutate: getRecommendations,
    data: recommendedLabs,
    isPending
  } = useRecommendedLabs();

  // 로딩 애니메이션 효과
  useEffect(() => {
    if (viewState === "loading") {
      const loadingMessages = [
        t("이력서 정보를 분석하는 중입니다..."),
        t("연구실 데이터베이스를 검색하고 있습니다..."),
        t("적합도를 계산하고 있습니다..."),
        t("최적의 연구실을 선정하고 있습니다..."),
        t("추천 결과를 생성하고 있습니다...")
      ];

      let progress = 0;
      let messageIndex = 0;
      
      setLoadingText(loadingMessages[0]);

      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        setLoadingProgress(progress);

        const newMessageIndex = Math.floor((progress / 100) * loadingMessages.length);
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
          messageIndex = newMessageIndex;
          setLoadingText(loadingMessages[messageIndex]);
        }

        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 400);

      return () => clearInterval(progressInterval);
    }
  }, [viewState, t]);

  const handleStartRecommendation = () => {
    setViewState("loading");
    setLoadingProgress(0);

    // 이력서 확인
    if (resumeStatus?.hasResume) {
      // 애니메이션을 위한 지연
      setTimeout(() => {
        getRecommendations(undefined, {
          onSuccess: () => {
            setTimeout(() => {
              setViewState("results");
            }, 800);
          },
          onError: () => {
            alert(t("추천 결과를 불러오는데 실패했습니다."));
            setViewState("initial");
          }
        });
      }, 2000);
    } else {
      setTimeout(() => {
        setViewState("no-resume");
      }, 1500);
    }
  };

  const handleGoToResume = () => {
    // TODO: 이력서 관리 페이지로 이동
    router.push("/resume");
  };

  // 초기 화면
  if (viewState === "initial") {
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-lg text-center shadow-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="mb-6 inline-block">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-6xl"
                >
                  🤖
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("나에게 적합한 연구실을 찾고 계신가요?")}
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t("AI가 입력하신 이력서 정보를 기반으로")}
              <br />
              <span className="font-semibold text-inha-blue">
                {t("맞춤형 연구실을 추천해드립니다.")}
              </span>
            </motion.p>
            
            <motion.button
              onClick={handleStartRecommendation}
              className="px-10 py-4 bg-gradient-to-r from-inha-blue to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 102, 204, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
                {t("AI 추천 시작")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>);

  }

  // 로딩 중
  if (viewState === "loading" || isPending) {
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-lg text-center shadow-lg">
          <div className="max-w-2xl mx-auto">
            {/* AI Brain Animation */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute inset-0 border-8 border-inha-blue rounded-full"
                style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
              />
              <motion.div
                className="absolute inset-4 border-8 border-blue-400 rounded-full"
                style={{ borderBottomColor: "transparent", borderLeftColor: "transparent" }}
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-5xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                🧠
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-inha-blue via-blue-500 to-indigo-600 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-30"
                    animate={{ 
                      x: ["-100%", "100%"],
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
              <motion.div
                className="text-right mt-2 text-sm font-semibold text-inha-blue"
                key={loadingProgress}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {Math.floor(loadingProgress)}%
              </motion.div>
            </div>

            {/* Loading Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <p className="text-gray-700 font-medium text-lg">{loadingText}</p>
              </motion.div>
            </AnimatePresence>

            {/* Floating Particles */}
            <div className="relative h-20">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-inha-blue rounded-full"
                  style={{
                    left: `${(i * 12) + 10}%`,
                  }}
                  animate={{
                    y: [-20, -60, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <motion.p 
              className="text-gray-500 text-sm mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              잠시만 기다려주세요...
            </motion.p>
          </div>
        </div>
      </motion.div>);

  }

  // 이력서 미등록
  if (viewState === "no-resume") {
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-lg text-center shadow-lg border-2 border-amber-200">
          <div className="max-w-md mx-auto">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.5,
                repeat: 3,
              }}
              className="text-6xl mb-4"
            >
              📋
            </motion.div>
            
            <motion.p 
              className="text-gray-800 font-bold text-lg mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("※ 이력서 정보가 등록되어 있지 않습니다.")}
            </motion.p>
            
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t("AI 추천을 위해 이력서를 먼저 작성해주세요.")}
            </motion.p>
            
            <motion.button
              onClick={handleGoToResume}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                📝 {t("이력서 관리 페이지로 이동")}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>);

  }

  // 추천 결과
  if (viewState === "results" && recommendedLabs) {
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              className="text-4xl"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.span>
            <h2 className="text-2xl font-bold text-gray-800">{t("AI 연구실 추천 결과")}
            </h2>
            <motion.div
              className="ml-auto px-4 py-2 bg-gradient-to-r from-inha-blue to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              총 {recommendedLabs.length}개 연구실
            </motion.div>
          </div>
          
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            당신의 이력서를 분석하여 가장 적합한 연구실을 추천해드립니다.
          </motion.p>
        </motion.div>

        {/* Results Table */}
        <motion.div 
          className="border border-gray-300 overflow-hidden rounded-lg shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Table Header */}
          <motion.div 
            className="grid grid-cols-[80px_1fr_200px_1fr] bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-300 min-w-[700px]"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="px-4 py-3 text-center font-bold text-gray-800 border-r border-gray-300">{t("순위")}
            </div>
            <div className="px-4 py-3 text-center font-bold text-gray-800 border-r border-gray-300">{t("연구실명 / 지도교수 / 연구내용")}
            </div>
            <div className="px-4 py-3 text-center font-bold text-gray-800 border-r border-gray-300">{t("적합도 / 예상합격률")}
            </div>
            <div className="px-4 py-3 text-center font-bold text-gray-800">{t("추천이유")}
            </div>
          </motion.div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            {recommendedLabs.map((lab, index) =>
            <motion.div
              key={lab.id}
              className="grid grid-cols-[80px_1fr_200px_1fr] border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 min-w-[700px] group"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.6 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 4px 20px rgba(0, 102, 204, 0.1)"
              }}
            >
                {/* Rank with icon */}
                <div className="px-4 py-6 flex items-center justify-center border-r border-gray-200">
                  {lab.rank <= 3 ?
                <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.7)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                          ]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <span className="text-white text-xl font-bold">
                          {lab.rank}
                        </span>
                      </motion.div>
                      {lab.rank === 1 &&
                      <motion.div 
                          className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md"
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <span className="text-white text-xs">👑</span>
                        </motion.div>
                      }
                      {lab.rank === 2 &&
                      <motion.div 
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center shadow-md"
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          <span className="text-white text-xs">🥈</span>
                        </motion.div>
                      }
                      {lab.rank === 3 &&
                      <motion.div 
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center shadow-md"
                          animate={{ 
                            y: [0, -3, 0],
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <span className="text-white text-xs">🥉</span>
                        </motion.div>
                      }
                    </motion.div> :

                <motion.span 
                    className="text-gray-600 text-lg font-semibold"
                    whileHover={{ scale: 1.3 }}
                  >
                      {lab.rank}
                    </motion.span>
                }
                </div>

                {/* Lab Info */}
                <div className="px-4 py-6 border-r border-gray-200">
                  <div className="mb-2">
                    <motion.a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-base inline-flex items-center gap-1 group-hover:underline"
                    whileHover={{ x: 5 }}
                    >
                      {lab.labName}
                      <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />

                      </motion.svg>
                    </motion.a>
                  </div>
                  <motion.div 
                    className="text-sm text-gray-600 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                  >
                    - {lab.professor} / {lab.department}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                  >
                    {t("- 연구내용 :")}
                    <div className="mt-1 pl-2">
                      {lab.researchArea.split(",").map((area, idx) =>
                      <motion.div 
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.0 + (index * 0.1) + (idx * 0.05) }}
                        >
                          • {area.trim()}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Compatibility & Acceptance */}
                <div className="px-4 py-6 border-r border-gray-200 text-center">
                  <motion.div 
                    className="mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1 + (index * 0.1), type: "spring" }}
                  >
                    <motion.div 
                      className="text-sm text-gray-600 mb-2 font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      {lab.compatibility}
                    </motion.div>
                    <motion.div 
                      className="text-lg font-bold bg-gradient-to-r from-inha-blue to-blue-600 bg-clip-text text-transparent"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {t("예상합격률")}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Reason */}
                <motion.div 
                  className="px-4 py-6 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                >
                  <div className="text-sm text-gray-700 leading-relaxed">{lab.reason}</div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={() => setViewState("initial")}
            className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🔄
              </motion.span>
              {t("다시 추천받기")}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>);

  }

  return null;
}