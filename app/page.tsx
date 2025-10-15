"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("학적");
  const [currentSubPage, setCurrentSubPage] = useState("지도교수(안정호교수님)");

  const renderMainContent = () => {
    if (currentPage === "수업" && currentSubPage === "학기 중 강의진단 결과") {
      return (
        <>
          {/* Title and Breadcrumb */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              <span className="text-inha-blue">■</span> 학기 중 강의진단 결과
            </h1>
            <div className="text-sm text-gray-500 mb-4">
              홈 &gt; 수업 &gt; 학기 중 강의진단 결과
            </div>
            <hr className="border-gray-200" />
          </div>

          {/* Content Block */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-lg text-gray-800 mb-2">
              학기 중 강의진단 결과 사용가능기간이 아닙니다.
            </div>
            <div className="text-sm text-gray-600">
              사용기간 : 2024년 10월 20일 ~ 2024년 12월 31일
            </div>
          </div>
        </>
      );
    }

    // Default content (지도교수 정보)
    return (
      <>
        {/* Title and Language Selector */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            <span className="text-inha-blue">■</span> 지도교수 정보
          </h1>
          <div className="flex gap-1">
            <button className="text-white px-4 py-1 text-sm rounded-sm bg-inha-blue hover:opacity-90 transition-opacity">
              KOR
            </button>
            <button className="bg-white border border-gray-300 px-4 py-1 text-sm rounded-sm hover:bg-gray-50">
              ENG
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button className="text-white px-4 py-2 text-sm rounded bg-inha-blue hover:opacity-90 transition-opacity">
            교수프로필 상세
          </button>
        </div>

        {/* Professor Information */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Section - Profile and Basic Info */}
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-300 rounded flex-shrink-0"></div>
              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 block">
                      한글성명:
                    </span>
                    <span className="font-medium text-gray-800">안정호</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block">
                      영문명:
                    </span>
                    <span className="font-medium text-gray-800">
                      Jungho Ahn
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block">소속:</span>
                    <span className="font-medium text-gray-800">
                      컴퓨터공학과
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block">
                      담당전공:
                    </span>
                    <span className="font-medium text-gray-800">
                      컴퓨터공학
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600 block">
                    사무실 위치/번호:
                  </span>
                  <span className="font-medium text-gray-800">
                    하-1306 / 032-860-7385
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Additional Info */}
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 block">연구실명:</span>
                <span className="font-medium text-gray-800">
                  조합적 알고리즘 연구실
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block">
                  연구실위치:
                </span>
                <span className="font-medium text-gray-800">하-1306</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block">
                  연구실전화:
                </span>
                <span className="font-medium text-gray-800">
                  032-860-7385
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block">이메일:</span>
                <span className="font-medium text-gray-800">
                  junghoahn@inha.ac.kr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Professor Contact Search */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            교수님 연락처
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="교수님 이름을 입력하세요"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              🔍
            </button>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="text-gray-800 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Image
            src="/logo_ins.gif"
            alt="INHA UNIVERSITY"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <button
          className="px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          닫기
        </button>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          currentPage={currentPage}
          currentSubPage={currentSubPage}
          onPageChange={setCurrentPage}
          onSubPageChange={setCurrentSubPage}
        />

        {/* Main Content */}
        <main className="flex-1 bg-white p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
