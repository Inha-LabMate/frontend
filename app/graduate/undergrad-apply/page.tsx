"use client";

import { useState } from "react";

interface ApplicationForm {
  name: string;
  studentId: string;
  department: string;
  grade: string;
  phone: string;
  email: string;
  gpa: string;
  yearSemester: string;
  preferredLab: string;
  professor: string;
  motivation: string;
  experience: string;
  interests: string;
}

export default function UndergradApplyPage() {
  const [formData, setFormData] = useState<ApplicationForm>({
    name: "",
    studentId: "",
    department: "",
    grade: "",
    phone: "",
    email: "",
    gpa: "",
    yearSemester: "20252",
    preferredLab: "",
    professor: "",
    motivation: "",
    experience: "",
    interests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("학부연구생 신청이 완료되었습니다!");
    setIsSubmitting(false);

    // 폼 초기화
    setFormData({
      name: "",
      studentId: "",
      department: "",
      grade: "",
      phone: "",
      email: "",
      gpa: "",
      yearSemester: "20252",
      preferredLab: "",
      professor: "",
      motivation: "",
      experience: "",
      interests: "",
    });
  };

  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">
          <span className="text-inha-blue">■</span> 학부연구생 신청
        </h1>
        <div className="text-sm text-black mb-4">
          홈 &gt; 대학원(학적) &gt; 학부연구생 신청
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          📌 학부연구생 신청 안내
        </h3>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>학부연구생은 학기당 최대 1개의 연구실에만 신청 가능합니다.</li>
          <li>
            신청 후 교수님의 승인이 필요하며, 승인 결과는 이메일로 통보됩니다.
          </li>
          <li>학점 3.0 이상인 학생만 신청 가능합니다.</li>
          <li>신청 기간: 매 학기 개강 전 2주 ~ 개강 후 2주 (학사일정 참고)</li>
        </ul>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black mb-4 pb-2 border-b">
            1. 기본 정보
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 이름
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 학번
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="12345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 소속 학과
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="컴퓨터공학과"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 학년
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
                <option value="" className="bg-white text-black">
                  선택하세요
                </option>
                <option value="2" className="bg-white text-black">
                  2학년
                </option>
                <option value="3" className="bg-white text-black">
                  3학년
                </option>
                <option value="4" className="bg-white text-black">
                  4학년
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 연락처
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="010-1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="example@inha.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 평점 (GPA)
              </label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                required
                pattern="[0-4](\.[0-9]{1,2})?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="3.50 (4.5 만점)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 신청 학기
              </label>
              <select
                name="yearSemester"
                value={formData.yearSemester}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
                <option value="20253" className="bg-white text-black">
                  2025-3학기 (여름학기)
                </option>
                <option value="20252" className="bg-white text-black">
                  2025-2학기
                </option>
                <option value="20251" className="bg-white text-black">
                  2025-1학기
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* 연구실 정보 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black mb-4 pb-2 border-b">
            2. 연구실 정보
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 희망 연구실명
              </label>
              <input
                type="text"
                name="preferredLab"
                value={formData.preferredLab}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="예) 조합적 알고리즘 연구실"
              />
              <p className="text-xs text-gray-500 mt-1">
                * 연구실 탐색 메뉴에서 연구실 정보를 확인하실 수 있습니다.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 지도교수명
              </label>
              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
                placeholder="예) 안정호"
              />
            </div>
          </div>
        </div>

        {/* 신청 동기 및 계획 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black mb-4 pb-2 border-b">
            3. 신청 동기 및 계획
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 지원 동기 (500자 이내)
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                maxLength={500}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue resize-none"
                placeholder="해당 연구실에 지원하게 된 동기를 작성해주세요."></textarea>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.motivation.length} / 500자
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                관련 경험 및 프로젝트 (선택)
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                maxLength={500}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue resize-none"
                placeholder="관련 수업, 프로젝트, 동아리 활동 등의 경험이 있다면 작성해주세요."></textarea>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.experience.length} / 500자
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> 관심 연구 분야 (300자
                이내)
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                required
                maxLength={300}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue resize-none"
                placeholder="관심 있는 연구 주제나 배우고 싶은 내용을 작성해주세요."></textarea>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.interests.length} / 300자
              </div>
            </div>
          </div>
        </div>

        {/* 개인정보 수집 동의 */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-inha-blue border-gray-300 rounded focus:ring-inha-blue"
            />
            <span className="text-sm text-black">
              <span className="text-red-500">*</span> 개인정보 수집 및 이용에
              동의합니다.
              <span className="text-xs text-gray-500 block mt-1">
                수집된 개인정보는 학부연구생 선발 및 운영 목적으로만 사용되며,
                신청 후 1년간 보관됩니다.
              </span>
            </span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-inha-blue text-white font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "신청 중..." : "신청하기"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                confirm("작성 중인 내용이 모두 삭제됩니다. 취소하시겠습니까?")
              ) {
                window.history.back();
              }
            }}
            className="px-8 py-3 bg-gray-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
            취소
          </button>
        </div>
      </form>

      {/* Additional Info */}
      <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          📞 문의사항
        </h3>
        <p className="text-xs text-gray-600">
          학부연구생 신청 관련 문의: 소속 학과 행정실 또는
          학사관리팀(032-860-7000)
        </p>
      </div>
    </>
  );
}
