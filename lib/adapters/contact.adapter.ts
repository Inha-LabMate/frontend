// 대학원 컨택 데이터 어댑터
// API 응답 구조가 변경되어도 이 파일만 수정하면 됨

import type { ApiContactLab, ApiContactRecord } from "../api/contact.api";

// 프론트엔드에서 사용할 타입
export interface ContactLab {
  id: string;
  지원학기: string;
  개설학과: string;
  세부전공: string;
  연구실명: string;
  지도교수: string;
  컨택가능: boolean;
}

export interface ContactRecord {
  id: number;
  지원학기: string;
  개설학과: string;
  세부전공: string;
  연구실명: string;
  지도교수: string;
  컨택신청: "완료" | "대기" | "거절";
  신청일자?: string;
  이력서연동: boolean;
  자기소개서연동: boolean;
  내용: string;
  기타파일?: string;
}

// API 데이터 -> 프론트엔드 데이터 변환 (연구실)
export const adaptContactLab = (apiData: ApiContactLab): ContactLab => {
  // API 응답 구조에 따라 매핑 로직 수정
  return {
    id: `${apiData.연구실명}-${apiData.지도교수}`,
    지원학기: String(apiData.지원학기 || ""),
    개설학과: String(apiData.개설학과 || ""),
    세부전공: String(apiData.세부전공 || ""),
    연구실명: String(apiData.연구실명 || ""),
    지도교수: String(apiData.지도교수 || ""),
    컨택가능: Boolean(apiData.컨택가능),
  };
};

// API 데이터 -> 프론트엔드 데이터 변환 (컨택 기록)
export const adaptContactRecord = (
  apiData: ApiContactRecord
): ContactRecord => {
  // API 응답 구조에 따라 매핑 로직 수정
  return {
    id: Number(apiData.id),
    지원학기: String(apiData.지원학기 || ""),
    개설학과: String(apiData.개설학과 || ""),
    세부전공: String(apiData.세부전공 || ""),
    연구실명: String(apiData.연구실명 || ""),
    지도교수: String(apiData.지도교수 || ""),
    컨택신청: (apiData.컨택신청 as "완료" | "대기" | "거절") || "대기",
    신청일자: apiData.신청일자 ? String(apiData.신청일자) : undefined,
    이력서연동: Boolean(apiData.이력서연동),
    자기소개서연동: Boolean(apiData.자기소개서연동),
    내용: String(apiData.내용 || ""),
    기타파일: apiData.기타파일 ? String(apiData.기타파일) : undefined,
  };
};

// 배열 변환 헬퍼
export const adaptContactLabs = (apiData: ApiContactLab[]): ContactLab[] => {
  return apiData.map(adaptContactLab);
};

export const adaptContactRecords = (
  apiData: ApiContactRecord[]
): ContactRecord[] => {
  return apiData.map(adaptContactRecord);
};
