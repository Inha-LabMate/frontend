// 강의진단 결과 데이터 어댑터

import type { ApiDiagnosisResult } from "../api/diagnosis.api";

export interface DiagnosisResult {
  id: number;
  년도학기: string;
  과목명: string;
  분반: string;
  학점: number;
  시간: number;
  수강인원: number;
  진단참여율: number;
  만족도: number;
  난이도: number;
  과제량: number;
  교수만족도: number;
  비고: string;
}

// API 데이터 -> 프론트엔드 데이터 변환
export const adaptDiagnosisResult = (
  apiData: ApiDiagnosisResult
): DiagnosisResult => {
  return {
    id: Number(apiData.id),
    년도학기: String(apiData.년도학기 || ""),
    과목명: String(apiData.과목명 || ""),
    분반: String(apiData.분반 || ""),
    학점: Number(apiData.학점 || 0),
    시간: Number(apiData.시간 || 0),
    수강인원: Number(apiData.수강인원 || 0),
    진단참여율: Number(apiData.진단참여율 || 0),
    만족도: Number(apiData.만족도 || 0),
    난이도: Number(apiData.난이도 || 0),
    과제량: Number(apiData.과제량 || 0),
    교수만족도: Number(apiData.교수만족도 || 0),
    비고: String(apiData.비고 || ""),
  };
};

// 배열 변환 헬퍼
export const adaptDiagnosisResults = (
  apiData: ApiDiagnosisResult[]
): DiagnosisResult[] => {
  return apiData.map(adaptDiagnosisResult);
};
