/**
 * Research Labs Data Adapter
 * API 데이터를 앱 내부에서 사용하는 형식으로 변환
 * API 응답 구조가 변경되어도 이 파일만 수정하면 됨
 */

import type {
  ApiResearchLab,
  ApiGraduateLab,
  ApiRecommendedLab,
  ApiResumeStatus,
} from "../api/research-labs.api";

// 앱 내부에서 사용하는 타입 (JSON 파일의 한글 필드 그대로 사용)
export interface ResearchLab {
  id: string;
  연번?: string;
  학과: string;
  연구실명?: string;
  교수명?: string;
  연구내용?: string;
  년도학기?: string;
  [key: string]: any;
}

export interface GraduateLab {
  id: string;
  연번?: string;
  학과: string;
  연구실명?: string;
  지도교수?: string;
  연구내용?: string;
  년도학기?: string;
  [key: string]: any;
}

export interface RecommendedLab {
  id: number;
  rank: number;
  department: string;
  labName: string;
  professor: string;
  researchArea: string;
  compatibility: string;
  expectedAcceptance: string;
  reason: string;
}

export interface ResumeStatus {
  hasResume: boolean;
  resumeUrl?: string;
}

/**
 * 학부연구생 데이터 어댑터
 * JSON 파일의 데이터를 그대로 반환 (한글 필드 유지)
 */
export const adaptUndergradLab = (apiData: any): ResearchLab => {
  return apiData as ResearchLab;
};

export const adaptUndergradLabs = (apiData: any[]): ResearchLab[] => {
  return apiData.map(adaptUndergradLab);
};

/**
 * 대학원 연구실 데이터 어댑터
 * JSON 파일의 데이터를 그대로 반환 (한글 필드 유지)
 */
export const adaptGraduateLab = (apiData: any): GraduateLab => {
  return apiData as GraduateLab;
};

export const adaptGraduateLabs = (apiData: any[]): GraduateLab[] => {
  return apiData.map(adaptGraduateLab);
};

/**
 * 이력서 상태 어댑터
 */
export const adaptResumeStatus = (apiData: ApiResumeStatus): ResumeStatus => {
  return {
    hasResume: apiData.hasResume,
    resumeUrl: apiData.resumeUrl,
  };
};

/**
 * AI 추천 연구실 데이터 어댑터
 */
export const adaptRecommendedLab = (
  apiData: ApiRecommendedLab
): RecommendedLab => {
  return {
    id: apiData.id,
    rank: apiData.rank,
    department: apiData.department || "미정",
    labName: apiData.labName || "",
    professor: apiData.professor || "",
    researchArea: apiData.researchArea || "",
    compatibility: apiData.compatibility || "",
    expectedAcceptance: apiData.expectedAcceptance || "",
    reason: apiData.reason || "",
  };
};

export const adaptRecommendedLabs = (
  apiData: ApiRecommendedLab[]
): RecommendedLab[] => {
  return apiData.map(adaptRecommendedLab);
};
