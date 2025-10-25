/**
 * Resume Data Adapter
 */

import type {
  ApiResume,
  ApiBasicInfo,
  ApiEducation,
  ApiLanguage,
  ApiCertificate,
  ApiAward,
  ApiPortfolio,
  ApiCoverLetter,
} from "../api/resume.api";

// 앱 내부에서 사용하는 타입 (API 타입과 동일하게 유지)
export type Resume = ApiResume;
export type BasicInfo = ApiBasicInfo;
export type Education = ApiEducation;
export type Language = ApiLanguage;
export type Certificate = ApiCertificate;
export type Award = ApiAward;
export type Portfolio = ApiPortfolio;
export type CoverLetter = ApiCoverLetter;

/**
 * 이력서 어댑터
 */
export const adaptResume = (apiData: ApiResume): Resume => {
  return apiData;
};
