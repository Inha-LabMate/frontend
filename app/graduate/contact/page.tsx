"use client";

import { useState, useEffect, useRef } from "react";
import {
  useContactLabs,
  useContactRecords,
  useSubmitContact,
} from "@/lib/hooks/useContact";
import type { ContactLab } from "@/lib/adapters/contact.adapter";

export default function GraduateContactPage() {
  const [activeTab, setActiveTab] = useState<"search" | "history">("search");
  const contactFormRef = useRef<HTMLDivElement>(null);

  // 검색 필터 상태
  const [searchCategory, setSearchCategory] = useState("학과");
  const [searchSemester, setSearchSemester] = useState("세부전공");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useState<{
    category?: string;
    semester?: string;
    keyword?: string;
  }>({ category: "학과", semester: "세부전공", keyword: "" }); // 초기 로딩

  // 컨택 내역 필터 상태
  const [filterSemester, setFilterSemester] = useState("전체");
  const [filterDepartment, setFilterDepartment] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [historyParams, setHistoryParams] = useState<{
    semester?: string;
    department?: string;
    status?: string;
  }>({});

  // React Query Hooks
  const { data: labs = [], isLoading: isLoadingLabs } =
    useContactLabs(searchParams);
  const { data: contacts = [], isLoading: isLoadingContacts } =
    useContactRecords(historyParams);
  const submitContactMutation = useSubmitContact();

  const [newContact, setNewContact] = useState({
    지원학기: "20261",
    개설학과: "",
    세부전공: "",
    연구실명: "",
    지도교수: "",
    이력서연동: false,
    자기소개서연동: false,
    내용: "",
    기타파일: "",
  });

  const [isAddingContact, setIsAddingContact] = useState(false);

  // 컨택 신청서가 열릴 때 스크롤
  useEffect(() => {
    if (isAddingContact && contactFormRef.current) {
      setTimeout(() => {
        contactFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isAddingContact]);

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  const handleSearch = () => {
    setSearchParams({
      category: searchCategory,
      semester: searchSemester,
      keyword: searchKeyword,
    });
  };

  const handleFilterContacts = () => {
    setHistoryParams({
      semester: filterSemester,
      department: filterDepartment,
      status: filterStatus,
    });
  };

  // 연구실 선택 핸들러
  const handleSelectLab = (lab: ContactLab) => {
    setNewContact({
      ...newContact,
      지원학기: lab.지원학기,
      개설학과: lab.개설학과,
      세부전공: lab.세부전공,
      연구실명: lab.연구실명,
      지도교수: lab.지도교수,
    });
    setIsAddingContact(true);
  };

  const handleSaveContact = async () => {
    // 유효성 검사
    if (!newContact.연구실명 || !newContact.지도교수) {
      alert("연구실명과 지도교수를 입력해주세요.");
      return;
    }

    if (!newContact.내용.trim()) {
      alert("컨택 내용을 입력해주세요.");
      return;
    }

    try {
      await submitContactMutation.mutateAsync(newContact);
      alert("컨택 신청이 완료되었습니다!");
      setIsAddingContact(false);
      setNewContact({
        지원학기: "20261",
        개설학과: "",
        세부전공: "",
        연구실명: "",
        지도교수: "",
        이력서연동: false,
        자기소개서연동: false,
        내용: "",
        기타파일: "",
      });

      // 컨택 내역 탭으로 자동 전환
      setActiveTab("history");
    } catch (error) {
      alert("컨택 신청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleCancelContact = () => {
    if (confirm("작성 중인 내용이 삭제됩니다. 취소하시겠습니까?")) {
      setIsAddingContact(false);
      setNewContact({
        지원학기: "20261",
        개설학과: "",
        세부전공: "",
        연구실명: "",
        지도교수: "",
        이력서연동: false,
        자기소개서연동: false,
        내용: "",
        기타파일: "",
      });
    }
  };

  return (
    <>
      {/* Title and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">
          <span className="text-inha-blue">■</span> 대학원 컨택 관리
        </h1>
        <div className="text-sm text-black mb-4">
          홈 &gt; 대학원(학적) &gt; 대학원 컨택 관리
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("search")}
          className={`px-8 py-3 text-sm font-medium transition-colors ${
            activeTab === "search"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}>
          컨택신청
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-8 py-3 text-sm font-medium transition-colors ${
            activeTab === "history"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}>
          컨택내역/결과
        </button>
      </div>

      {/* Search Tab */}
      {activeTab === "search" && (
        <div>
          <h2 className="text-xl font-bold text-black mb-4">대학원 조회</h2>

          {/* Search Filters */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-black">분류</span>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
              <option value="학과" className="bg-white text-black">
                학과
              </option>
              <option value="연구실" className="bg-white text-black">
                연구실
              </option>
              <option value="교수" className="bg-white text-black">
                교수
              </option>
            </select>

            <select
              value={searchSemester}
              onChange={(e) => setSearchSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
              <option value="세부전공" className="bg-white text-black">
                세부전공
              </option>
              <option value="전공" className="bg-white text-black">
                전공
              </option>
            </select>

            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
              조회
            </button>

            <span className="text-sm text-black ml-4">키워드 검색</span>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
              placeholder="검색어를 입력하세요"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
              검색
            </button>
          </div>

          {/* Search Results Table */}
          <div className="border border-gray-300 rounded-md overflow-x-auto mb-8">
            <div className="grid grid-cols-[100px_150px_150px_200px_150px_150px] bg-inha-blue text-white min-w-[900px]">
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                지원학기
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                개설학과
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                세부전공
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                연구실명
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                지도교수
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold">
                컨택신청
              </div>
            </div>

            <div className="bg-white min-w-[900px]">
              {isLoadingLabs ? (
                <div className="py-12 text-center text-black text-sm">
                  로딩 중...
                </div>
              ) : labs.length === 0 ? (
                <div className="py-12 text-center text-black text-sm">
                  조회된 Data가 존재 하지 않습니다
                </div>
              ) : (
                labs.map((lab, index) => (
                  <div
                    key={lab.id}
                    className={`grid grid-cols-[100px_150px_150px_200px_150px_150px] border-b border-gray-200 min-w-[900px] ${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    }`}>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {lab.지원학기}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {lab.개설학과}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {lab.세부전공}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {lab.연구실명}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {lab.지도교수}
                    </div>
                    <div className="px-4 py-3 flex items-center justify-center">
                      <button
                        onClick={() => handleSelectLab(lab)}
                        disabled={!lab.컨택가능}
                        className={`px-4 py-1 text-xs rounded transition-colors ${
                          lab.컨택가능
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}>
                        {lab.컨택가능 ? "컨택선택" : "불가"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Contact Section */}
          <div
            ref={contactFormRef}
            className="bg-white border border-gray-300 rounded-md p-6">
            <h3 className="text-lg font-bold text-black mb-4">
              대학원 컨택신청
            </h3>

            {!isAddingContact ? (
              <div className="text-center py-8">
                <button
                  onClick={handleAddContact}
                  className="px-8 py-3 bg-inha-blue text-white font-medium rounded hover:opacity-90 transition-opacity">
                  + 컨택 신청하기
                </button>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-x-auto">
                {/* Header Row */}
                <div className="grid grid-cols-6 bg-gray-50 border-b min-w-[900px]">
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black border-r">
                    지원학기
                  </div>
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black border-r">
                    개설학과
                  </div>
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black border-r">
                    세부전공
                  </div>
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black border-r">
                    연구실명
                  </div>
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black border-r">
                    지도교수
                  </div>
                  <div className="px-4 py-3 text-center text-sm font-semibold text-black">
                    컨택신청
                  </div>
                </div>

                {/* Input Row */}
                <div className="grid grid-cols-6 bg-white border-b min-w-[900px]">
                  <div className="px-2 py-3 text-center border-r">
                    <div className="w-full px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 rounded text-center">
                      {newContact.지원학기 || "미선택"}
                    </div>
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <div className="w-full px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 rounded text-center">
                      {newContact.개설학과 || "미선택"}
                    </div>
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <div className="w-full px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 rounded text-center">
                      {newContact.세부전공 || "미선택"}
                    </div>
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <div className="w-full px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 rounded text-center">
                      {newContact.연구실명 || "미선택"}
                    </div>
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <div className="w-full px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 rounded text-center">
                      {newContact.지도교수 || "미선택"}
                    </div>
                  </div>
                  <div className="px-2 py-3 flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                      {newContact.연구실명 ? "✓ 선택완료" : "위에서 선택"}
                    </span>
                  </div>
                </div>

                {/* Detail Section */}
                <div className="p-6 bg-gray-50">
                  <div className="mb-4">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-sm font-medium text-red-500 whitespace-nowrap mt-2">
                        * 이력서 / 자기소개서
                      </span>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newContact.이력서연동}
                            onChange={(e) =>
                              setNewContact({
                                ...newContact,
                                이력서연동: e.target.checked,
                              })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-black">
                            이력서 연동
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newContact.자기소개서연동}
                            onChange={(e) =>
                              setNewContact({
                                ...newContact,
                                자기소개서연동: e.target.checked,
                              })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-black">
                            자기소개서 연동
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-medium text-red-500 whitespace-nowrap mt-2">
                        * 내용
                      </span>
                      <textarea
                        value={newContact.내용}
                        onChange={(e) =>
                          setNewContact({ ...newContact, 내용: e.target.value })
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white placeholder:text-gray-400 resize-none"
                        rows={6}
                        placeholder="컨택 내용을 입력하세요"></textarea>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-black whitespace-nowrap">
                        기타파일 첨부
                      </span>
                      <input
                        type="file"
                        className="flex-1 text-sm text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        onChange={(e) =>
                          setNewContact({
                            ...newContact,
                            기타파일: e.target.files?.[0]?.name || "",
                          })
                        }
                      />
                      <button className="px-4 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">
                        파일찾기
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleSaveContact}
                      disabled={submitContactMutation.isPending}
                      className="px-8 py-2 bg-inha-blue text-white font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50">
                      {submitContactMutation.isPending ? "저장 중..." : "저장"}
                    </button>
                    <button
                      onClick={handleCancelContact}
                      className="px-8 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 transition-colors">
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div>
          <h2 className="text-xl font-bold text-black mb-4">대학원 컨택내역</h2>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-black">지원학기</span>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
              <option value="전체" className="bg-white text-black">
                전체
              </option>
              <option value="20261" className="bg-white text-black">
                2026-1
              </option>
              <option value="20252" className="bg-white text-black">
                2025-2
              </option>
            </select>

            <span className="text-sm font-medium text-black ml-4">
              개설학과
            </span>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
              <option value="전체" className="bg-white text-black">
                전체
              </option>
              <option value="컴퓨터공학과" className="bg-white text-black">
                컴퓨터공학과
              </option>
              <option value="전기컴퓨터공학과" className="bg-white text-black">
                전기컴퓨터공학과
              </option>
            </select>

            <span className="text-sm font-medium text-black ml-4">상태</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-inha-blue">
              <option value="전체" className="bg-white text-black">
                전체
              </option>
              <option value="대기" className="bg-white text-black">
                대기중
              </option>
              <option value="완료" className="bg-white text-black">
                승인
              </option>
              <option value="거절" className="bg-white text-black">
                거절
              </option>
            </select>

            <button
              onClick={handleFilterContacts}
              className="ml-auto px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
              조회
            </button>
          </div>

          <div className="border border-gray-300 rounded-md overflow-x-auto">
            <div className="grid grid-cols-[100px_150px_150px_200px_150px_120px] bg-inha-blue text-white min-w-[870px]">
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                지원학기
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                개설학과
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                세부전공
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                연구실명
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold border-r border-white/30">
                지도교수
              </div>
              <div className="px-4 py-3 text-center text-sm font-semibold">
                컨택결과
              </div>
            </div>

            <div className="bg-white min-w-[870px]">
              {isLoadingContacts ? (
                <div className="py-12 text-center text-black text-sm">
                  로딩 중...
                </div>
              ) : contacts.length === 0 ? (
                <div className="py-12 text-center text-black text-sm">
                  조회된 Data가 존재 하지 않습니다
                </div>
              ) : (
                contacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className={`grid grid-cols-[100px_150px_150px_200px_150px_120px] border-b border-gray-200 min-w-[870px] ${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    }`}>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {contact.지원학기}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {contact.개설학과}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {contact.세부전공}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {contact.연구실명}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-black border-r">
                      {contact.지도교수}
                    </div>
                    <div className="px-4 py-3 flex items-center justify-center">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          contact.컨택신청 === "완료"
                            ? "bg-green-100 text-green-700"
                            : contact.컨택신청 === "거절"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {contact.컨택신청}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {contacts.length > 0 && (
            <div className="mt-4 text-center text-sm text-black">
              [총 {contacts.length}건]
            </div>
          )}
        </div>
      )}
    </>
  );
}
