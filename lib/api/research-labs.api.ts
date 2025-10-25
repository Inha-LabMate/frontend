/**
 * Research Labs API Service
 * 정적 JSON 파일을 사용하여 데이터 로드
 */

// API Response 타입 (서버에서 받는 원본 데이터)
export interface ApiRecommendedLab {
  id: number;
  rank: number;
  department: string;
  labName: string;
  professor: string;
  researchArea: string;
  compatibility: string; // "적합도" (높음/중간/낮음)
  expectedAcceptance: string; // "예상합격률" (높음/중간/낮음)
  reason: string; // "추천이유"
}

export interface ApiResumeStatus {
  hasResume: boolean;
  resumeUrl?: string;
}

// API 호출 함수들
export const researchLabsApi = {
  /**
   * 학부연구생 연구실 목록 조회
   * 정적 JSON 파일에서 데이터 로드
   */
  getUndergradLabs: async (
    year?: string
  ): Promise<Record<string, unknown>[]> => {
    try {
      // 정적 JSON 파일에서 데이터 로드
      const response = await fetch("/data/undergrad-labs.json");
      if (!response.ok) {
        throw new Error("데이터 파일을 찾을 수 없습니다");
      }

      const data = (await response.json()) as Record<string, unknown>[];

      // year 필터링 (JSON 파일의 한글 필드 그대로 반환)
      if (year) {
        return data.filter((item) => item.년도학기 === year);
      }

      return data;
    } catch (error) {
      console.error("학부연구생 데이터 조회 실패:", error);
      return [];
    }
  },

  /**
   * 대학원 연구실 목록 조회
   * 정적 JSON 파일에서 데이터 로드
   */
  getGraduateLabs: async (
    year?: string
  ): Promise<Record<string, unknown>[]> => {
    try {
      // 정적 JSON 파일에서 데이터 로드
      const response = await fetch("/data/graduate-labs.json");
      if (!response.ok) {
        throw new Error("데이터 파일을 찾을 수 없습니다");
      }

      const data = (await response.json()) as Record<string, unknown>[];

      // year 필터링 (JSON 파일의 한글 필드 그대로 반환)
      if (year) {
        return data.filter((item) => item.년도학기 === year);
      }

      return data;
    } catch (error) {
      console.error("대학원 데이터 조회 실패:", error);
      return [];
    }
  },

  /**
   * 이력서 등록 여부 확인
   */
  checkResumeStatus: async (): Promise<ApiResumeStatus> => {
    // TODO: 실제 API 연동 시 구현
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hasResume: true,
          resumeUrl: "/resume",
        });
      }, 300);
    });
  },

  /**
   * AI 기반 연구실 추천 (이력서 기반)
   */
  getRecommendedLabs: async (): Promise<ApiRecommendedLab[]> => {
    // TODO: 실제 API 연동 시 구현
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            rank: 1,
            department: "컴퓨터공학과",
            labName: "금융 인공지능 연구실",
            professor: "김동국 교수님",
            researchArea:
              "금융 시계열 예측, 금융 자연어 처리, 인공지능 기반 포트폴리오 관리, 머신러닝/딥러닝 자동화",
            compatibility: "높음",
            expectedAcceptance: "높음",
            reason: "OO 프로젝트와 연구실의 주제가 매우 유사함",
          },
          {
            id: 2,
            rank: 2,
            department: "컴퓨터공학과",
            labName: "감성 인공지능 연구실",
            professor: "김병령 교수님",
            researchArea:
              "감성 컴퓨팅(Affective Computing), 뇌-컴퓨터 인터페이스(Brain-Computer Interface), 기계학습(Machine Learning)",
            compatibility: "높음",
            expectedAcceptance: "중간",
            reason: "OO 수상경력과 연구실의 주제가 매우 유사함",
          },
          {
            id: 3,
            rank: 3,
            department: "컴퓨터공학과",
            labName: "지능형 클라우드\n및 네트워크 연구실",
            professor: "김영진 교수님",
            researchArea:
              "Mobile/edge/cloud computing, Artificial intelligence, Optimization",
            compatibility: "중간",
            expectedAcceptance: "중간",
            reason: "OO 포트폴리오와 연구실의 주제가 매우 유사함",
          },
        ]);
      }, 800);
    });
  },
};
