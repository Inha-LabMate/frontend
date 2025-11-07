/**
 * 자기소개서 데이터 로컬스토리지 관리 유틸리티
 */

export interface SelfIntroData {
  research_interests: string;
  intro1: string;
  intro2: string;
  intro3: string;
  portfolio: string;
  major: string;
  certifications: string;
  awards: string;
  tech_stack: string;
  toeic_score: string;
  english_proficiency: string;
  gpa: string;
}

const STORAGE_KEY = "resume_self_intro";

/**
 * 로컬스토리지에서 자기소개서 데이터 불러오기
 */
export function getSelfIntroFromStorage(): SelfIntroData {
  if (typeof window === "undefined") {
    console.warn("서버 사이드에서는 localStorage를 사용할 수 없습니다.");
    return getEmptySelfIntro();
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      console.log("📭 저장된 자기소개서 데이터가 없습니다.");
      return getEmptySelfIntro();
    }

    const parsed = JSON.parse(data) as SelfIntroData;
    console.log("✅ 자기소개서 불러오기 성공:", STORAGE_KEY);
    return parsed;
  } catch (error) {
    console.error("❌ 자기소개서 데이터 불러오기 실패:", error);
    return getEmptySelfIntro();
  }
}

/**
 * 자기소개서 데이터를 로컬스토리지에 저장
 */
export function saveSelfIntroToStorage(data: SelfIntroData): boolean {
  if (typeof window === "undefined") {
    console.warn("서버 사이드에서는 localStorage를 사용할 수 없습니다.");
    return false;
  }

  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonString);

    // 저장 검증
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === jsonString) {
      console.log("✅ 자기소개서 저장 성공:", STORAGE_KEY);
      return true;
    } else {
      console.error("❌ 저장 검증 실패: 저장된 데이터가 일치하지 않습니다.");
      return false;
    }
  } catch (error) {
    console.error("❌ 자기소개서 데이터 저장 실패:", error);
    return false;
  }
}

/**
 * 로컬스토리지에서 자기소개서 데이터 삭제
 */
export function deleteSelfIntroFromStorage(): boolean {
  if (typeof window === "undefined") {
    console.warn("서버 사이드에서는 localStorage를 사용할 수 없습니다.");
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);

    // 삭제 검증
    const check = localStorage.getItem(STORAGE_KEY);
    if (check === null) {
      console.log("✅ 자기소개서 삭제 성공:", STORAGE_KEY);
      return true;
    } else {
      console.error("❌ 삭제 검증 실패: 데이터가 여전히 존재합니다.");
      return false;
    }
  } catch (error) {
    console.error("❌ 자기소개서 데이터 삭제 실패:", error);
    return false;
  }
}

/**
 * 빈 자기소개서 데이터 반환
 */
export function getEmptySelfIntro(): SelfIntroData {
  return {
    research_interests: "",
    intro1: "",
    intro2: "",
    intro3: "",
    portfolio: "",
    major: "",
    certifications: "",
    awards: "",
    tech_stack: "",
    toeic_score: "",
    english_proficiency: "",
    gpa: "",
  };
}

/**
 * AI 추천 API용 자기소개서 데이터 포맷팅
 */
export function formatSelfIntroForAI(data: SelfIntroData): string {
  const parts: string[] = [];

  if (data.research_interests) {
    parts.push(`[연구 관심 분야]\n${data.research_interests}`);
  }

  if (data.intro1) {
    parts.push(`[자기소개 1 - 관심사 및 연구 분야]\n${data.intro1}`);
  }

  if (data.intro2) {
    parts.push(`[자기소개 2 - 기술 및 경험]\n${data.intro2}`);
  }

  if (data.intro3) {
    parts.push(`[자기소개 3 - 연구 목표]\n${data.intro3}`);
  }

  if (data.portfolio) {
    parts.push(`[포트폴리오/프로젝트]\n${data.portfolio}`);
  }

  if (data.major) {
    parts.push(`[전공]\n${data.major}`);
  }

  if (data.certifications) {
    parts.push(`[자격증]\n${data.certifications}`);
  }

  if (data.awards) {
    parts.push(`[수상 경력]\n${data.awards}`);
  }

  if (data.tech_stack) {
    parts.push(`[기술 스택]\n${data.tech_stack}`);
  }

  if (data.toeic_score) {
    parts.push(`[TOEIC 점수]\n${data.toeic_score}`);
  }

  if (data.english_proficiency) {
    parts.push(`[영어 능력]\n${data.english_proficiency}`);
  }

  if (data.gpa) {
    parts.push(`[학점]\n${data.gpa}`);
  }

  return parts.join("\n\n");
}
