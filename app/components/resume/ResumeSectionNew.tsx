"use client";

import { useState } from "react";
import { useResumeStore } from "../../../lib/store/resume-store";

export default function ResumeSection() {
  const resume = useResumeStore((state) => state.resume);
  const updateResumeField = useResumeStore((state) => state.updateResumeField);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 아코디언 상태
  const [openSections, setOpenSections] = useState({
    basic: true,
    education: true,
    experience: true,
    certificate: true,
    awards: true,
    portfolio: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    updateResumeField(name as keyof typeof resume, value);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      console.log("💾 이력서 저장 시작...", resume);
      setShowSaveAlert(true);
      console.log("✅ 이력서 저장 완료!");

      setTimeout(() => setShowSaveAlert(false), 3000);
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
      setSaveError("저장 중 오류가 발생했습니다.");
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // 섹션 헤더 컴포넌트
  const SectionHeader = ({
    title,
    isOpen,
    onToggle,
    onAdd,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    onAdd?: () => void;
  }) => (
    <div
      className="bg-inha-blue text-white px-4 py-3 flex items-center justify-between cursor-pointer"
      onClick={onToggle}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{isOpen ? "▼" : "▶"}</span>
        <span className="font-medium">{title}</span>
      </div>
      {onAdd && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="px-3 py-1 bg-white text-inha-blue text-sm rounded hover:bg-gray-100">
          + 추가
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 저장 완료 알림 */}
      {showSaveAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">이력서가 저장되었습니다!</span>
          </div>
        </div>
      )}

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50">
          저장
        </button>
      </div>

      {/* 기본 정보 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="기본 정보"
          isOpen={openSections.basic}
          onToggle={() => toggleSection("basic")}
        />
        {openSections.basic && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>이름/성별
                </label>
                <input
                  type="text"
                  name="name"
                  value={resume.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>연락처
                </label>
                <input
                  type="text"
                  name="phone"
                  value={resume.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>생년월일
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={resume.birth_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>주소
                </label>
                <input
                  type="text"
                  name="address"
                  value={resume.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 학력 정보 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="학력 정보"
          isOpen={openSections.education}
          onToggle={() => toggleSection("education")}
        />
        {openSections.education && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>소속대학
                </label>
                <input
                  type="text"
                  name="university"
                  value={resume.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>본전공
                </label>
                <input
                  type="text"
                  name="major"
                  value={resume.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>단과대학
                </label>
                <input
                  type="text"
                  name="graduation_status"
                  value={resume.graduation_status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  <span className="text-red-500">*</span>학점/만점기준점
                </label>
                <input
                  type="text"
                  name="gpa"
                  value={resume.gpa}
                  onChange={handleChange}
                  placeholder="3.5 / 4.5"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 언어 능력 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="언어 능력"
          isOpen={openSections.experience}
          onToggle={() => toggleSection("experience")}
          onAdd={addExperience}
        />
        {openSections.experience && (
          <div>
            {resume.experiences.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                등록된 언어 능력이 없습니다.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      외국어
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      공식시험
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      시험명
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      점수
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      등급
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      취득일자
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      만료일자
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resume.experiences.map((exp) => (
                    <tr key={exp.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              company: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              position: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={exp.start_date}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              start_date: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={exp.end_date}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              end_date: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              description: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-sm text-red-600 hover:text-red-800">
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* 자격증 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="자격증"
          isOpen={openSections.certificate}
          onToggle={() => toggleSection("certificate")}
          onAdd={addProject}
        />
        {openSections.certificate && (
          <div>
            {resume.projects.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                등록된 자격증이 없습니다.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      자격증명
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      발급처
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      취득일자
                    </th>
                    <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                      만료일자
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resume.projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) =>
                            updateProject(proj.id, { name: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={proj.period}
                          onChange={(e) =>
                            updateProject(proj.id, { period: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={proj.tech_stack}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              tech_stack: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-sm text-red-600 hover:text-red-800">
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* 수상경력 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="수상경력"
          isOpen={openSections.awards}
          onToggle={() => toggleSection("awards")}
        />
        {openSections.awards && (
          <div className="p-4">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    수상명/대회명
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    수상일자
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    만료일자
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      name="awards"
                      value={resume.awards}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 기타첨부파일(포트폴리오) 섹션 */}
      <div className="border border-gray-300">
        <SectionHeader
          title="기타첨부파일(포트폴리오)"
          isOpen={openSections.portfolio}
          onToggle={() => toggleSection("portfolio")}
        />
        {openSections.portfolio && (
          <div className="p-4">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    포트폴리오명
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    내용
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 border">
                    만료일자
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <textarea
                      name="portfolio"
                      value={resume.portfolio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue resize-none"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inha-blue"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {saveError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          ⚠️ {saveError}
        </div>
      )}
    </div>
  );
}
