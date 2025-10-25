/**
 * Resume API Service
 * 이력서 관리 API
 */

// import { publicAxiosInstance } from "./axiosInstance";

// === 기본 정보 ===
export interface ApiBasicInfo {
  name: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
  address: string;
}

// === 학적 정보 ===
export interface ApiEducation {
  school: string;
  major: string;
  gpa: string;
  graduationStatus: string;
}

// === 언어 능력 ===
export interface ApiLanguage {
  id: number;
  language: string; // 외국어
  testName: string; // 구사능력 (시험명)
  score: string; // 점수
  level: string; // 등급
  acquiredDate: string; // 취득일자
  expiryDate?: string; // 파생일부
}

// === 자격증 ===
export interface ApiCertificate {
  id: number;
  name: string; // 자격증명
  issuer: string; // 발급처
  acquiredDate: string; // 취득일자
  fileUrl?: string; // 파일첨부
}

// === 수상경력 ===
export interface ApiAward {
  id: number;
  content: string; // 수상경력내용
  date: string; // 수상일자
  fileUrl?: string; // 파일첨부
}

// === 기타정부파일(포트폴리오) ===
export interface ApiPortfolio {
  id: number;
  type: string; // 포트폴리오명
  content: string; // 수상경력내용
  fileUrl?: string; // 파일첨부
}

// === 자기소개서 ===
export interface ApiCoverLetter {
  question1: string;
  question2: string;
  question3: string;
}

// === 전체 이력서 ===
export interface ApiResume {
  basicInfo: ApiBasicInfo;
  education: ApiEducation;
  languages: ApiLanguage[];
  certificates: ApiCertificate[];
  awards: ApiAward[];
  portfolios: ApiPortfolio[];
  coverLetter: ApiCoverLetter;
}

// API 호출 함수들
export const resumeApi = {
  /**
   * 이력서 전체 조회
   */
  getResume: async (): Promise<ApiResume> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // const response = await publicAxiosInstance.get('/resume');
    // return response.data;

    // 임시 더미 데이터
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          basicInfo: {
            name: "한만욱",
            studentId: "12345678",
            major: "인공지능공학과",
            email: "example@inha.ac.kr",
            phone: "010-1234-5678",
            address: "인천광역시 미추홀구",
          },
          education: {
            school: "인하대학교",
            major: "인공지능공학과",
            gpa: "4.5",
            graduationStatus: "재학",
          },
          languages: [],
          certificates: [],
          awards: [],
          portfolios: [],
          coverLetter: {
            question1: "",
            question2: "",
            question3: "",
          },
        });
      }, 300);
    });
  },

  /**
   * 기본 정보 수정
   */
  updateBasicInfo: async (_data: ApiBasicInfo): Promise<void> => {
    // TODO: 실제 API 연동
    // await publicAxiosInstance.put('/resume/basic-info', _data);
    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 언어 능력 추가
   */
  addLanguage: async (data: Omit<ApiLanguage, "id">): Promise<ApiLanguage> => {
    // TODO: 실제 API 연동
    // const response = await publicAxiosInstance.post('/resume/languages', data);
    // return response.data;
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 언어 능력 삭제
   */
  deleteLanguage: async (_id: number): Promise<void> => {
    // TODO: 실제 API 연동
    // await publicAxiosInstance.delete(`/resume/languages/${_id}`);
    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 자격증 추가
   */
  addCertificate: async (
    data: Omit<ApiCertificate, "id">
  ): Promise<ApiCertificate> => {
    // TODO: 실제 API 연동
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 자격증 삭제
   */
  deleteCertificate: async (_id: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 수상경력 추가
   */
  addAward: async (data: Omit<ApiAward, "id">): Promise<ApiAward> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 수상경력 삭제
   */
  deleteAward: async (_id: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 포트폴리오 추가
   */
  addPortfolio: async (
    data: Omit<ApiPortfolio, "id">
  ): Promise<ApiPortfolio> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 포트폴리오 삭제
   */
  deletePortfolio: async (_id: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 자기소개서 저장
   */
  saveCoverLetter: async (_data: ApiCoverLetter): Promise<void> => {
    // TODO: 실제 API 연동
    // await publicAxiosInstance.put('/resume/cover-letter', _data);
    return new Promise((resolve) => setTimeout(resolve, 300));
  },
};
