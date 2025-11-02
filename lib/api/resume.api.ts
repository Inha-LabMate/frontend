/**
 * Resume API Service
 * 이력서 관리 API
 * 
 * ⚠️ 실제 API 연동 시:
 * 1. .env.local에 NEXT_PUBLIC_API_URL 설정
 * 2. 각 함수의 주석 해제하고 fetch URL 사용
 * 3. 백엔드 JSON 구조 그대로 사용 (Adapter 불필요)
 */

// 실제 API 연동 시 사용
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
  language: string;
  testName: string;
  score: string;
  level: string;
  acquiredDate: string;
  expiryDate?: string;
}

// === 자격증 ===
export interface ApiCertificate {
  id: number;
  name: string;
  issuer: string;
  acquiredDate: string;
  fileUrl?: string;
}

// === 수상경력 ===
export interface ApiAward {
  id: number;
  content: string;
  date: string;
  fileUrl?: string;
}

// === 기타정부파일(포트폴리오) ===
export interface ApiPortfolio {
  id: number;
  type: string;
  content: string;
  fileUrl?: string;
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
   * 🔧 실제 API: GET ${API_BASE_URL}/api/resume
   */
  getResume: async (): Promise<ApiResume> => {
    // 실제 API 연동 시:
    // const response = await fetch(`${API_BASE_URL}/api/resume`);
    // if (!response.ok) throw new Error('이력서 조회 실패');
    // return response.json();

    // 더미 데이터 (개발용)
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
            gpa: "4.0",
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
   * 🔧 실제 API: PUT ${API_BASE_URL}/api/resume/basic-info
   */
  updateBasicInfo: async (_data: ApiBasicInfo): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/basic-info`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_data)
    // });
    // if (!response.ok) throw new Error('기본 정보 수정 실패');
    // return response.json();

    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 언어 능력 추가
   * 🔧 실제 API: POST ${API_BASE_URL}/api/resume/language
   */
  addLanguage: async (data: Omit<ApiLanguage, "id">): Promise<ApiLanguage> => {
    // 실제 API 연동 시:
    // const response = await fetch(`${API_BASE_URL}/api/resume/language`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('언어 능력 추가 실패');
    // return response.json();

    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 언어 능력 삭제
   * 🔧 실제 API: DELETE ${API_BASE_URL}/api/resume/language/:id
   */
  deleteLanguage: async (_id: number): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/language/${_id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('언어 능력 삭제 실패');

    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 자격증 추가
   * 🔧 실제 API: POST ${API_BASE_URL}/api/resume/certificate
   */
  addCertificate: async (
    data: Omit<ApiCertificate, "id">
  ): Promise<ApiCertificate> => {
    // 실제 API 연동 시:
    // const response = await fetch(`${API_BASE_URL}/api/resume/certificate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('자격증 추가 실패');
    // return response.json();

    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 자격증 삭제
   * 🔧 실제 API: DELETE ${API_BASE_URL}/api/resume/certificate/:id
   */
  deleteCertificate: async (_id: number): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/certificate/${_id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('자격증 삭제 실패');

    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 수상경력 추가
   * 🔧 실제 API: POST ${API_BASE_URL}/api/resume/award
   */
  addAward: async (data: Omit<ApiAward, "id">): Promise<ApiAward> => {
    // 실제 API 연동 시:
    // const response = await fetch(`${API_BASE_URL}/api/resume/award`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('수상경력 추가 실패');
    // return response.json();

    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 수상경력 삭제
   * 🔧 실제 API: DELETE ${API_BASE_URL}/api/resume/award/:id
   */
  deleteAward: async (_id: number): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/award/${_id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('수상경력 삭제 실패');

    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 포트폴리오 추가
   * 🔧 실제 API: POST ${API_BASE_URL}/api/resume/portfolio
   */
  addPortfolio: async (
    data: Omit<ApiPortfolio, "id">
  ): Promise<ApiPortfolio> => {
    // 실제 API 연동 시:
    // const response = await fetch(`${API_BASE_URL}/api/resume/portfolio`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('포트폴리오 추가 실패');
    // return response.json();

    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: Date.now() }), 300)
    );
  },

  /**
   * 포트폴리오 삭제
   * 🔧 실제 API: DELETE ${API_BASE_URL}/api/resume/portfolio/:id
   */
  deletePortfolio: async (_id: number): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/portfolio/${_id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('포트폴리오 삭제 실패');

    return new Promise((resolve) => setTimeout(resolve, 300));
  },

  /**
   * 자기소개서 저장
   * 🔧 실제 API: PUT ${API_BASE_URL}/api/resume/cover-letter
   */
  saveCoverLetter: async (_data: ApiCoverLetter): Promise<void> => {
    // 실제 API 연동 시:
    // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
    // const response = await fetch(`${API_BASE_URL}/api/resume/cover-letter`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_data)
    // });
    // if (!response.ok) throw new Error('자기소개서 저장 실패');
    // return response.json();

    return new Promise((resolve) => setTimeout(resolve, 300));
  },
};
