"use client";import { useTranslation } from "i18nexus";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
{
  name: "학적",
  submenu: [
  { name: "지도교수(안정호교수님)", path: "/academic/professor" },
  { name: "학생상담신청", path: "/academic/counseling" },
  { name: "학적인터넷신청", path: "/academic/application" },
  { name: "신상/주소", path: "/academic/profile" },
  { name: "I-MAP start", path: "/academic/imap" }]

},
{
  name: "수업",
  submenu: [
  { name: "강의평가 결과 조회", path: "/course/evaluation" },
  { name: "학기 중 강의진단 결과", path: "/course/diagnosis" }]

},
{
  name: "장학",
  submenu: [
  { name: "장학금신청", path: "/scholarship/apply" },
  { name: "장학금 수혜 확인", path: "/scholarship/check" },
  { name: "장학증서 인쇄", path: "/scholarship/print" }]

},
{
  name: "등록",
  submenu: [
  { name: "계절학기 등록금 납부", path: "/registration/summer" },
  { name: "전액장학생등록", path: "/registration/full-scholarship" },
  { name: "등록금납부 및 고지서인쇄", path: "/registration/payment" },
  { name: "금학기 납부 확인", path: "/registration/confirm" },
  { name: "교육비 납입증명서 인쇄", path: "/registration/certificate" },
  { name: "등록금납부확인서인쇄", path: "/registration/confirmation" },
  { name: "부분등록신청", path: "/registration/partial" },
  { name: "외국인학생보험 가입내역", path: "/registration/insurance" }]

},
{
  name: "비교과 과정",
  submenu: [
  {
    name: "인하더배움(비교과) 신청/취소/",
    path: "/extracurricular/apply"
  },
  { name: "인하더배움(비교과) 수강이력", path: "/extracurricular/history" },
  {
    name: "인하더배움(비교과) 장학금 신청",
    path: "/extracurricular/scholarship"
  },
  { name: "SW중심 CEN마일리지 이력", path: "/extracurricular/mileage" },
  {
    name: "SW중심 CEN마일리지 장학금신청",
    path: "/extracurricular/mileage-scholarship"
  }]

},
{
  name: "성적",
  submenu: [
  { name: "성적및석차확인", path: "/grade/check" },
  { name: "취득학점 현황조회", path: "/grade/credits" },
  { name: "상위과정성적확인", path: "/grade/advanced" }]

},
{
  name: "교직",
  submenu: [
  { name: "교육신청", path: "/teaching/apply" },
  { name: "인적성검사 결과확인", path: "/teaching/test" }]

},
{
  name: "학생",
  submenu: [
  { name: "모바일학생증신청", path: "/student/id" },
  { name: "학생회장 선거참여 확인", path: "/student/election" }]

},
{
  name: "대학원(학적)",
  submenu: [
  { name: "연구실 탐색/추천", path: "/graduate/labs" },
  { name: "학부연구생 신청", path: "/graduate/undergrad-apply" },
  { name: "이력서 관리", path: "/graduate/resume" },
  { name: "대학원 컨택 관리", path: "/graduate/contact" }]

},
{
  name: "연구활동",
  submenu: [
  { name: "My연구과제", path: "/research/projects" },
  { name: "연구비집행", path: "/research/budget" },
  { name: "연구인건비", path: "/research/labor" },
  { name: "장비비풀링", path: "/research/equipment" },
  { name: "연구비카드", path: "/research/card" },
  { name: "게시판", path: "/research/board" },
  { name: "인하대 논문검색", path: "/research/papers" },
  { name: "Help Desk", path: "/research/help" },
  { name: "신고센터", path: "/research/report" },
  { name: "관세감면신청", path: "/research/customs" }]

},
{
  name: "시설",
  submenu: [
  { name: "온라인 시설예약", path: "/facility/reservation" },
  { name: "공용시설물고장신고", path: "/facility/report" }]

},
{
  name: "생활관",
  submenu: [
  { name: "입사포기 및 중도퇴사 신청", path: "/dormitory/withdraw" },
  { name: "생활관신청", path: "/dormitory/apply" },
  { name: "생활관신청합격자발표", path: "/dormitory/result" },
  { name: "생활관비납입확인서", path: "/dormitory/payment" },
  { name: "룸메이트신청", path: "/dormitory/roommate" }]

},
{
  name: "예비군",
  submenu: [
  { name: "예비군 전입신청", path: "/reserve/transfer" },
  { name: "교육훈련 확인서 인쇄", path: "/reserve/certificate" },
  { name: "상황별 Q&A", path: "/reserve/qna" }]

}];


export default function Sidebar() {const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    // 같은 메뉴를 클릭하면 닫고, 다른 메뉴를 클릭하면 해당 메뉴만 열기
    const newExpandedMenu = expandedMenu === index ? null : index;
    setExpandedMenu(newExpandedMenu);

    // 메인 메뉴 클릭시 첫 번째 서브메뉴로 이동
    if (newExpandedMenu !== null && NAV_ITEMS[index].submenu.length > 0) {
      router.push(NAV_ITEMS[index].submenu[0].path);
    }
  };

  const handleSubMenuClick = (path: string) => {
    router.push(path);
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
            <div className="text-sm text-gray-600 mb-1">{t("컴퓨터공학과")}</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{t("한만욱 님")}</span>
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                on
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-0">
        {NAV_ITEMS.map((item, index) =>
        <div key={index} className="cursor-pointer">
            <div
            className={`flex items-center justify-between py-3 px-4 border-b border-gray-100 transition-all duration-200 group ${
            expandedMenu === index ?
            "bg-inha-blue text-white" :
            "hover:bg-inha-blue"}`
            }
            onClick={() => toggleMenu(index)}>
              <span
              className={`text-sm ${
              expandedMenu === index ?
              "text-white font-medium" :
              "text-gray-600 group-hover:text-white"}`
              }>
                {t(item.name)}
              </span>
              <span
              className={`text-sm font-light ${
              expandedMenu === index ?
              "text-white" :
              "text-inha-blue group-hover:text-white"}`
              }>
                <span className="group-hover:hidden">
                  {expandedMenu === index ? "−" : "+"}
                </span>
                <span className="hidden group-hover:inline">−</span>
              </span>
            </div>
            {/* 서브메뉴 (클릭시 표시) */}
            {expandedMenu === index &&
          <div className="bg-white">
                {item.submenu.map((subItem, subIndex) => {
              const isSelected = pathname === subItem.path;
              return (
                <div
                  key={subIndex}
                  onClick={() => handleSubMenuClick(subItem.path)}
                  className={`py-2 px-6 text-xs border-b border-gray-50 cursor-pointer bg-white transition-colors duration-200 ${
                  isSelected ?
                  "text-inha-blue underline" :
                  "text-gray-600 hover:text-inha-blue hover:underline"}`
                  }>
                      {subItem.name}
                    </div>);

            })}
              </div>
          }
          </div>
        )}
      </nav>
    </aside>);

}