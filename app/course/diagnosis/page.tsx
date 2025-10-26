"use client";

import { useState } from "react";
import { useDiagnosisResults } from "@/lib/hooks/useDiagnosis";

export default function CourseDiagnosisPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedSemester, setSelectedSemester] = useState("2");

  const { data: results = [], isLoading } = useDiagnosisResults({
    year: selectedYear,
    semester: selectedSemester,
  });

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

      {/* Filter Section */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">조회 학기:</span>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
          <option value="2024">2024년</option>
          <option value="2023">2023년</option>
        </select>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
          <option value="1">1학기</option>
          <option value="2">2학기</option>
        </select>
      </div>

      {/* Results Table */}
      {isLoading ? (
        <div className="bg-gray-100 p-12 rounded-lg text-center">
          <div className="text-gray-600">로딩 중...</div>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-lg text-gray-800 mb-2">
            조회된 강의진단 결과가 없습니다.
          </div>
          <div className="text-sm text-gray-600">다른 학기를 선택해주세요.</div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-inha-blue text-white">
              <tr>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  년도학기
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  과목명
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  분반
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  학점/시간
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  수강인원
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  참여율(%)
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  만족도
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  난이도
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  과제량
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                  교수만족도
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  비고
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {results.map((result, index) => (
                <tr
                  key={result.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-gray-50" : ""
                  }`}>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.년도학기}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.과목명}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.분반}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.학점}/{result.시간}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.수강인원}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.진단참여율.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    <span
                      className={`px-2 py-1 rounded ${
                        result.만족도 >= 4.5
                          ? "bg-green-100 text-green-700"
                          : result.만족도 >= 4.0
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {result.만족도.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.난이도.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.과제량.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 border-r">
                    {result.교수만족도.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        result.비고 === "우수"
                          ? "bg-green-100 text-green-700"
                          : result.비고 === "양호"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                      {result.비고}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-gray-50 px-4 py-3 text-center text-sm text-gray-600 border-t">
            총 {results.length}건의 강의진단 결과
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          📌 강의진단 결과 안내
        </h3>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>만족도는 5점 만점 기준입니다.</li>
          <li>참여율이 높을수록 더 정확한 결과입니다.</li>
          <li>강의진단은 강의 개선을 위한 피드백으로 활용됩니다.</li>
        </ul>
      </div>
    </>
  );
}
