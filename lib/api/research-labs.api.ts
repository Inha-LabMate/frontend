/**
 * Research Labs API Service
 * 정적 JSON 파일을 사용하여 데이터 로드
 */

import {
  formatSelfIntroForAI,
  type SelfIntroData,
} from "../store/resume-store";

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
      }, 800);
    });
  },

  /**
   * AI 기반 연구실 추천 (이력서 기반)
   * @param selfIntroData - Zustand store에서 전달받은 자기소개서 데이터
   */
  getRecommendedLabs: async (
    selfIntroData: SelfIntroData
  ): Promise<ApiRecommendedLab[]> => {
    const formattedSelfIntro = formatSelfIntroForAI(selfIntroData);

    console.log("📄 자기소개서 데이터 (포맷팅됨):\n", formattedSelfIntro);

    // TODO: 실제 API 연동 시 자기소개서 데이터를 백엔드로 전송
    // const response = await fetch('/api/recommend', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     selfIntro: formattedSelfIntro,
    //     rawData: selfIntroData
    //   })
    // });

    return new Promise((resolve) => {
      setTimeout(() => {
        // 자기소개서 데이터 기반 추천 이유 생성
        const getRecommendationReason = (rank: number) => {
          const hasProjects =
            selfIntroData.portfolio && selfIntroData.portfolio.length > 50;
          const hasAwards =
            selfIntroData.awards && selfIntroData.awards.length > 5;
          const hasTechStack =
            selfIntroData.tech_stack && selfIntroData.tech_stack.length > 5;
          const hasResearchInterest =
            selfIntroData.research_interests &&
            selfIntroData.research_interests.length > 5;

          if (rank === 1) {
            if (hasProjects) {
              return `작성하신 프로젝트 경험이 연구실의 주제와 매우 잘 부합합니다. 특히 기술 스택과 연구 방향이 일치하여 즉시 연구에 기여하실 수 있습니다.`;
            } else if (hasResearchInterest) {
              return `귀하의 연구 관심 분야가 연구실의 핵심 주제와 매우 유사합니다. 지원자의 학업 배경과 연구 목표가 연구실의 방향성과 완벽하게 일치합니다.`;
            }
            return `학점, 기술 스택, 연구 관심사가 종합적으로 연구실 요구사항과 매우 잘 부합합니다.`;
          } else if (rank === 2) {
            if (hasAwards) {
              return `수상 경력이 연구실의 연구 분야와 관련성이 높습니다. 해당 분야에 대한 이해도와 열정이 돋보입니다.`;
            } else if (hasTechStack) {
              return `보유하신 기술 스택이 연구실에서 진행 중인 프로젝트에 적합합니다. 빠른 적응이 가능할 것으로 예상됩니다.`;
            }
            return `학업 성적과 연구 관심사가 연구실의 방향성과 잘 맞습니다.`;
          } else {
            if (hasTechStack) {
              return `기술 스택과 학업 배경이 연구실의 기본 요구사항을 충족합니다. 추가 학습을 통해 연구에 기여하실 수 있습니다.`;
            }
            return `연구 관심사와 기본 역량이 연구실의 연구 분야와 관련성이 있습니다.`;
          }
        };

        resolve([
          {
            id: 1,
            rank: 1,
            department: "전기컴퓨터공학과",
            labName: "고성능 임베디드 시스템 연구실",
            professor: "박준석 교수님",
            researchArea:
              "임베디드 시스템 설계 및 최적화, IoT 센서 네트워크, 실시간 운영체제(RTOS), 에지 컴퓨팅, 저전력 하드웨어 가속기 개발",
            compatibility: "높음",
            expectedAcceptance: "높음",
            reason: getRecommendationReason(1),
          },
          {
            id: 2,
            rank: 2,
            department: "전기컴퓨터공학과",
            labName: "지능형 전력 시스템 연구실",
            professor: "이상훈 교수님",
            researchArea:
              "스마트 그리드 제어 시스템, 신재생 에너지 통합 기술, 전력 품질 분석 및 개선, 배터리 관리 시스템(BMS), 전력 변환 장치 설계",
            compatibility: "높음",
            expectedAcceptance: "중간",
            reason: getRecommendationReason(2),
          },
          {
            id: 3,
            rank: 3,
            department: "전기컴퓨터공학과",
            labName: "차세대 통신 및 신호처리 연구실",
            professor: "김현우 교수님",
            researchArea:
              "5G/6G 무선 통신 시스템, MIMO 안테나 설계, 디지털 신호처리(DSP), 채널 코딩 및 변조 기법, 초고속 통신 프로토콜 개발",
            compatibility: "중간",
            expectedAcceptance: "중간",
            reason: getRecommendationReason(3),
          },
        ]);
      }, 800);
    });
  },
};

export default researchLabsApi;
