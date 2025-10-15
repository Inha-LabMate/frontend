"use client";

import { useState } from "react";

const NAV_ITEMS = [
  {
    name: "학적",
    submenu: [
      "지도교수(안정호교수님)",
      "학생상담신청",
      "학적인터넷신청",
      "신상/주소",
      "I-MAP start",
    ],
  },
  {
    name: "수업",
    submenu: ["강의평가 결과 조회", "학기 중 강의진단 결과"],
  },
  {
    name: "장학",
    submenu: ["장학금신청", "장학금 수혜 확인", "장학증서 인쇄"],
  },
  {
    name: "등록",
    submenu: [
      "계절학기 등록금 납부",
      "전액장학생등록",
      "등록금납부 및 고지서인쇄",
      "금학기 납부 확인",
      "교육비 납입증명서 인쇄",
      "등록금납부확인서인쇄",
      "부분등록신청",
      "외국인학생보험 가입내역",
    ],
  },
  {
    name: "비교과 과정",
    submenu: [
      "인하더배움(비교과) 신청/취소/",
      "인하더배움(비교과) 수강이력",
      "인하더배움(비교과) 장학금 신청",
      "SW중심 CEN마일리지 이력",
      "SW중심 CEN마일리지 장학금신청",
    ],
  },
  {
    name: "성적",
    submenu: ["성적및석차확인", "취득학점 현황조회", "상위과정성적확인"],
  },
  {
    name: "교직",
    submenu: ["교육신청", "인적성검사 결과확인"],
  },
  {
    name: "학생",
    submenu: ["모바일학생증신청", "학생회장 선거참여 확인"],
  },
  {
    name: "학적",
    submenu: ["학부연구생신청"],
  },
  {
    name: "연구활동",
    submenu: [
      "My연구과제",
      "연구비집행",
      "연구인건비",
      "장비비풀링",
      "연구비카드",
      "게시판",
      "인하대 논문검색",
      "Help Desk",
      "신고센터",
      "관세감면신청",
    ],
  },
  {
    name: "시설",
    submenu: ["온라인 시설예약", "공용시설물고장신고"],
  },
  {
    name: "생활관",
    submenu: [
      "입사포기 및 중도퇴사 신청",
      "생활관신청",
      "생활관신청합격자발표",
      "생활관비납입확인서",
      "룸메이트신청",
    ],
  },
  {
    name: "예비군",
    submenu: ["예비군 전입신청", "교육훈련 확인서 인쇄", "상황별 Q&A"],
  },
];

interface SidebarProps {
  currentPage: string;
  currentSubPage: string;
  onPageChange: (page: string) => void;
  onSubPageChange: (subPage: string) => void;
}

export default function Sidebar({ 
  currentPage: _currentPage, 
  currentSubPage: _currentSubPage, 
  onPageChange, 
  onSubPageChange 
}: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const toggleMenu = (index: number, menuName: string) => {
    // 같은 메뉴를 클릭하면 닫고, 다른 메뉴를 클릭하면 해당 메뉴만 열기
    const newExpandedMenu = expandedMenu === index ? null : index;
    setExpandedMenu(newExpandedMenu);
    
    // 메인 메뉴 클릭시 첫 번째 서브메뉴를 기본으로 선택
    if (newExpandedMenu !== null) {
      onPageChange(menuName);
      if (NAV_ITEMS[index].submenu.length > 0) {
        onSubPageChange(NAV_ITEMS[index].submenu[0]);
      }
    }
  };

  const handleSubMenuClick = (menuIndex: number, subIndex: number, subMenuName: string) => {
    const subMenuKey = `${menuIndex}-${subIndex}`;
    setSelectedSubMenu(subMenuKey);
    onSubPageChange(subMenuName);
  };

  return (
    <aside className="w-[245px] bg-white border-r border-gray-200 ">
      {/* User Profile Section */}
      <div className="p-3 border-b border-gray-200 bg-graybg">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-[70px] h-[70px] bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex-1 pt-2">
            <div className="text-sm text-gray-600 mb-1">컴퓨터공학과</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">한만욱 님</span>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                on
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-0">
        {NAV_ITEMS.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <div
              className={`flex items-center justify-between py-3 px-4 border-b border-gray-100 transition-all duration-200 group ${
                expandedMenu === index
                  ? "bg-inha-blue text-white"
                  : "hover:bg-inha-blue"
              }`}
              onClick={() => toggleMenu(index, item.name)}>
              <span
                className={`text-sm ${
                  expandedMenu === index
                    ? "text-white font-medium"
                    : "text-gray-600 group-hover:text-white"
                }`}>
                {item.name}
              </span>
              <span
                className={`text-sm font-light ${
                  expandedMenu === index
                    ? "text-white"
                    : "text-inha-blue group-hover:text-white"
                }`}>
                <span className="group-hover:hidden">
                  {expandedMenu === index ? "−" : "+"}
                </span>
                <span className="hidden group-hover:inline">−</span>
              </span>
            </div>
            {/* 서브메뉴 (클릭시 표시) */}
            {expandedMenu === index && (
              <div className="bg-white">
                {item.submenu.map((subItem, subIndex) => {
                  const subMenuKey = `${index}-${subIndex}`;
                  const isSelected = selectedSubMenu === subMenuKey;
                  return (
                        <div
                          key={subIndex}
                          onClick={() => handleSubMenuClick(index, subIndex, subItem)}
                          className={`py-2 px-6 text-xs border-b border-gray-50 cursor-pointer bg-white transition-colors duration-200 ${
                            isSelected
                              ? "text-inha-blue underline"
                              : "text-gray-600 hover:text-inha-blue hover:underline"
                          }`}>
                          {subItem}
                        </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
