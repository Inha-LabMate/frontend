"use client";

import { useState } from "react";

interface ContactRecord {
  id: number;
  지원학기: string;
  개설학과: string;
  세부전공: string;
  연구실명: string;
  지도교수: string;
  컨택신청: "완료" | "대기";
  이력서연동: boolean;
  자기소개서연동: boolean;
  내용: string;
  기타파일: string;
}

export default function GraduateContactPage() {
  const [activeTab, setActiveTab] = useState<"search" | "history">("search");
  const [searchCategory, setSearchCategory] = useState("학과");
  const [searchSemester, setSearchSemester] = useState("세부전공");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 더미 데이터
  const [contacts, setContacts] = useState<ContactRecord[]>([
    {
      id: 1,
      지원학기: "20261",
      개설학과: "전기컴퓨터공학과",
      세부전공: "인공지능공학",
      연구실명: "금융 인공지능 연구실",
      지도교수: "김동국",
      컨택신청: "완료",
      이력서연동: true,
      자기소개서연동: true,
      내용: "안녕하세요. 귀 연구실의 금융 AI 연구에 관심이 많아 지원하고자 합니다.",
      기타파일: "",
    },
  ]);

  const [newContact, setNewContact] = useState<Partial<ContactRecord>>({
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "인공지능공학",
    연구실명: "",
    지도교수: "",
    이력서연동: false,
    자기소개서연동: false,
    내용: "",
    기타파일: "",
  });

  const [isAddingContact, setIsAddingContact] = useState(false);

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  const handleSaveContact = () => {
    const contact: ContactRecord = {
      id: Date.now(),
      지원학기: newContact.지원학기 || "20261",
      개설학과: newContact.개설학과 || "",
      세부전공: newContact.세부전공 || "",
      연구실명: newContact.연구실명 || "",
      지도교수: newContact.지도교수 || "",
      컨택신청: "대기",
      이력서연동: newContact.이력서연동 || false,
      자기소개서연동: newContact.자기소개서연동 || false,
      내용: newContact.내용 || "",
      기타파일: newContact.기타파일 || "",
    };

    setContacts([...contacts, contact]);
    setIsAddingContact(false);
    setNewContact({
      지원학기: "20261",
      개설학과: "전기컴퓨터공학과",
      세부전공: "인공지능공학",
      연구실명: "",
      지도교수: "",
      이력서연동: false,
      자기소개서연동: false,
      내용: "",
      기타파일: "",
    });
  };

  const handleCancelContact = () => {
    setIsAddingContact(false);
    setNewContact({
      지원학기: "20261",
      개설학과: "전기컴퓨터공학과",
      세부전공: "인공지능공학",
      연구실명: "",
      지도교수: "",
      이력서연동: false,
      자기소개서연동: false,
      내용: "",
      기타파일: "",
    });
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

            <button className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
              조회
            </button>

            <span className="text-sm text-black ml-4">키워드 검색</span>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-black bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inha-blue focus:border-inha-blue"
              placeholder="검색어를 입력하세요"
            />
            <button className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors">
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
              <div className="py-12 text-center text-black text-sm">
                조회된 Data가 존재 하지 않습니다
              </div>
            </div>
          </div>

          {/* Add Contact Section */}
          <div className="bg-white border border-gray-300 rounded-md p-6">
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
                    <input
                      type="text"
                      value={newContact.지원학기}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          지원학기: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 text-sm text-black bg-white placeholder:text-gray-400 border border-gray-300 rounded text-center"
                    />
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <input
                      type="text"
                      value={newContact.개설학과}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          개설학과: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 text-sm text-black bg-white placeholder:text-gray-400 border border-gray-300 rounded text-center"
                    />
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <input
                      type="text"
                      value={newContact.세부전공}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          세부전공: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 text-sm text-black bg-white placeholder:text-gray-400 border border-gray-300 rounded text-center"
                    />
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <input
                      type="text"
                      value={newContact.연구실명}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          연구실명: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 text-sm text-black bg-white placeholder:text-gray-400 border border-gray-300 rounded text-center"
                      placeholder="연구실명 입력"
                    />
                  </div>
                  <div className="px-2 py-3 text-center border-r">
                    <input
                      type="text"
                      value={newContact.지도교수}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          지도교수: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 text-sm text-black bg-white placeholder:text-gray-400 border border-gray-300 rounded text-center"
                      placeholder="교수명 입력"
                    />
                  </div>
                  <div className="px-2 py-3 flex items-center justify-center">
                    <button className="px-4 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                      컨택선택
                    </button>
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
                      className="px-8 py-2 bg-inha-blue text-white font-medium rounded hover:opacity-90 transition-opacity">
                      저장
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
              {contacts.length === 0 ? (
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
