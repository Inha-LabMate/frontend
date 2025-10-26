// 학부연구생 신청 데이터 어댑터

import type { ApiLabInfo } from "../api/undergrad-apply.api";

export interface LabInfo {
  id: number;
  연구실명: string;
  지도교수: string;
  학과: string;
  모집인원: number;
  지원자수: number;
  연구분야: string;
}

// API 데이터 -> 프론트엔드 데이터 변환
export const adaptLabInfo = (apiData: ApiLabInfo): LabInfo => {
  return {
    id: Number(apiData.id),
    연구실명: String(apiData.연구실명 || ""),
    지도교수: String(apiData.지도교수 || ""),
    학과: String(apiData.학과 || ""),
    모집인원: Number(apiData.모집인원 || 0),
    지원자수: Number(apiData.지원자수 || 0),
    연구분야: String(apiData.연구분야 || ""),
  };
};

// 배열 변환 헬퍼
export const adaptLabInfos = (apiData: ApiLabInfo[]): LabInfo[] => {
  return apiData.map(adaptLabInfo);
};
