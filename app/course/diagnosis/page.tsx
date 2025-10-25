export default function CourseDiagnosisPage() {
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
