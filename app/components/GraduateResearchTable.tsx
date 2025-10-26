"use client";

import { useState } from "react";
import { useGraduateLabs } from "../../lib/hooks/useResearchLabs";
import type { GraduateLab } from "../../lib/adapters/research-labs.adapter";

// 년도학기 포맷 변환 함수 (20252 -> 2025-2)
const formatYearSemester = (yearSemester: string): string => {
  if (!yearSemester || yearSemester.length < 5) return yearSemester;
  const year = yearSemester.slice(0, 4);
  const semester = yearSemester.slice(4);
  return `${year}-${semester}`;
};

export default function GraduateResearchTable() {
  const [selectedYear, setSelectedYear] = useState("20252");
  const [selectedLab, setSelectedLab] = useState<GraduateLab | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: labs, isLoading, error } = useGraduateLabs(selectedYear);

  // 년도학기 정렬 (최신순)
  const years = ["20253", "20252", "20251"];

  const handleViewDetail = (lab: GraduateLab) => {
    setSelectedLab(lab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 애니메이션 후 데이터 정리
    setTimeout(() => {
      setSelectedLab(null);
    }, 300);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title and Year Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          대학원 연구실 리스트
        </h2>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">년도학기</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
            {years.map((year) => (
              <option key={year} value={year}>
                {formatYearSemester(year)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-md overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-[150px_1fr_150px] bg-inha-blue text-white min-w-[600px]">
          <div className="px-6 py-4 text-center font-semibold text-base border-r border-white/30">
            운영학과
          </div>
          <div className="px-6 py-4 text-center font-semibold text-base border-r border-white/30">
            연구실명/지도교수
          </div>
          <div className="px-6 py-4 text-center font-semibold text-base">
            연구내용
          </div>
        </div>

        {/* Table Body */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-500 text-base">
            로딩 중...
          </div>
        ) : (
          <div className="bg-white">
            {labs?.map((lab, index) => (
              <div
                key={lab.id}
                className={`grid grid-cols-[150px_1fr_150px] border-b border-gray-200 hover:bg-blue-50 transition-colors min-w-[600px] ${
                  index % 2 === 1 ? "bg-gray-50" : ""
                }`}>
                <div className="px-6 py-4 text-center border-r border-gray-200 text-gray-900 text-base font-medium">
                  {lab.학과}
                </div>
                <div className="px-6 py-4 text-center border-r border-gray-200">
                  <div className="text-gray-900 text-base font-medium">
                    {lab.연구실명 || "-"}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {lab.지도교수 || "-"}
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center justify-center">
                  <button
                    onClick={() => handleViewDetail(lab)}
                    className="px-5 py-2 bg-inha-blue text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                    조회
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isLoading && labs && (
        <div className="mt-6 text-center">
          <span className="text-gray-700 text-base font-medium">
            [총 {labs.length}개]
          </span>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLab && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isModalOpen ? "bg-gray-900/80" : "bg-opacity-0"
          }`}
          onClick={closeModal}>
          <div
            className={`bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-inha-blue text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">연구실 상세 정보</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl font-bold">
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-500 mb-1">학과</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedLab.학과}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-500 mb-1">연구실명</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedLab.연구실명 || "정보 없음"}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-500 mb-1">지도교수</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedLab.지도교수 || "정보 없음"}
                  </div>
                </div>

                <div className="pb-4">
                  <div className="text-sm text-gray-500 mb-1">연구내용</div>
                  <div className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedLab.연구내용 || "정보 없음"}
                  </div>
                </div>

                {selectedLab.년도학기 && (
                  <div className="text-sm text-gray-500">
                    년도학기: {formatYearSemester(selectedLab.년도학기)}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
