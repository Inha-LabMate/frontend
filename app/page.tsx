"use client";

import { useProfessorInfo } from "@/lib/hooks/useProfessor";

export default function Home() {
  const { data: professor, isLoading } = useProfessorInfo();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

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
                  <span className="text-sm text-gray-600 block">한글성명:</span>
                  <span className="font-medium text-gray-800">
                    {professor?.name || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block">영문명:</span>
                  <span className="font-medium text-gray-800">Jungho Ahn</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block">소속:</span>
                  <span className="font-medium text-gray-800">
                    {professor?.department || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block">담당전공:</span>
                  <span className="font-medium text-gray-800">컴퓨터공학</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600 block">
                  사무실 위치/번호:
                </span>
                <span className="font-medium text-gray-800">
                  {professor?.office || "-"} / {professor?.phone || "-"}
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
              <span className="text-sm text-gray-600 block">연구실위치:</span>
              <span className="font-medium text-gray-800">
                {professor?.office || "-"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 block">연구실전화:</span>
              <span className="font-medium text-gray-800">
                {professor?.phone || "-"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 block">이메일:</span>
              <span className="font-medium text-gray-800">
                {professor?.email || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Research Areas */}
      {professor?.researchAreas && professor.researchAreas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            연구 분야
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {professor.researchAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Office Hours */}
      {professor?.officeHours && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            상담 시간
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">{professor.officeHours}</p>
          </div>
        </div>
      )}

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
}
