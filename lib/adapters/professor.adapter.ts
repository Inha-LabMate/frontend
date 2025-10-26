// 교수 정보 데이터 어댑터

import type { ApiProfessorInfo } from "../api/professor.api";

export interface ProfessorInfo {
  name: string;
  department: string;
  position: string;
  office: string;
  phone: string;
  email: string;
  researchAreas: string[];
  education: string[];
  officeHours: string;
  introduction: string;
}

// API 데이터 -> 프론트엔드 데이터 변환
export const adaptProfessorInfo = (
  apiData: ApiProfessorInfo
): ProfessorInfo => {
  return {
    name: String(apiData.name || ""),
    department: String(apiData.department || ""),
    position: String(apiData.position || ""),
    office: String(apiData.office || ""),
    phone: String(apiData.phone || ""),
    email: String(apiData.email || ""),
    researchAreas: Array.isArray(apiData.researchAreas)
      ? apiData.researchAreas.map(String)
      : [],
    education: Array.isArray(apiData.education)
      ? apiData.education.map(String)
      : [],
    officeHours: String(apiData.officeHours || ""),
    introduction: String(apiData.introduction || ""),
  };
};
