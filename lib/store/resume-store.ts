import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export interface ResumeData {
  // 기본 정보
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  address: string;

  // 학력
  university: string;
  major: string;
  graduation_status: string; // 졸업, 재학, 휴학 등
  gpa: string;

  // 경력
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
  }>;

  // 프로젝트
  projects: Array<{
    id: string;
    name: string;
    period: string;
    description: string;
    tech_stack: string;
    role: string;
  }>;

  // 자격증
  certifications: string;

  // 수상 경력
  awards: string;

  // 기술 스택
  tech_stack: string;

  // 어학 능력
  toeic_score: string;
  english_proficiency: string;

  // 포트폴리오
  portfolio: string;
}

interface ResumeStore {
  // 자기소개서 데이터
  selfIntro: SelfIntroData;
  setSelfIntro: (data: SelfIntroData) => void;
  updateSelfIntroField: (field: keyof SelfIntroData, value: string) => void;
  resetSelfIntro: () => void;

  // 이력서 데이터
  resume: ResumeData;
  setResume: (data: ResumeData) => void;
  updateResumeField: <K extends keyof ResumeData>(
    field: K,
    value: ResumeData[K]
  ) => void;
  resetResume: () => void;

  // 경력 관리
  addExperience: () => void;
  updateExperience: (
    id: string,
    data: Partial<ResumeData["experiences"][0]>
  ) => void;
  removeExperience: (id: string) => void;

  // 프로젝트 관리
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void;
  removeProject: (id: string) => void;
}

const getEmptySelfIntro = (): SelfIntroData => ({
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
});

const getEmptyResume = (): ResumeData => ({
  name: "",
  email: "",
  phone: "",
  birth_date: "",
  address: "",
  university: "",
  major: "",
  graduation_status: "",
  gpa: "",
  experiences: [],
  projects: [],
  certifications: "",
  awards: "",
  tech_stack: "",
  toeic_score: "",
  english_proficiency: "",
  portfolio: "",
});

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      // 초기 상태
      selfIntro: getEmptySelfIntro(),
      resume: getEmptyResume(),

      // 자기소개서 액션
      setSelfIntro: (data) => set({ selfIntro: data }),

      updateSelfIntroField: (field, value) =>
        set((state) => {
          const newSelfIntro = { ...state.selfIntro, [field]: value };

          // 이력서와 공유하는 필드 동기화
          const syncedResume = { ...state.resume };
          if (field === "major") syncedResume.major = value;
          if (field === "gpa") syncedResume.gpa = value;
          if (field === "certifications") syncedResume.certifications = value;
          if (field === "awards") syncedResume.awards = value;
          if (field === "tech_stack") syncedResume.tech_stack = value;
          if (field === "toeic_score") syncedResume.toeic_score = value;
          if (field === "english_proficiency")
            syncedResume.english_proficiency = value;
          if (field === "portfolio") syncedResume.portfolio = value;

          return {
            selfIntro: newSelfIntro,
            resume: syncedResume,
          };
        }),

      resetSelfIntro: () => set({ selfIntro: getEmptySelfIntro() }),

      // 이력서 액션
      setResume: (data) => set({ resume: data }),

      updateResumeField: (field, value) =>
        set((state) => {
          const newResume = { ...state.resume, [field]: value };

          // 자기소개서와 공유하는 필드 동기화
          const syncedSelfIntro = { ...state.selfIntro };
          if (field === "major") syncedSelfIntro.major = value as string;
          if (field === "gpa") syncedSelfIntro.gpa = value as string;
          if (field === "certifications")
            syncedSelfIntro.certifications = value as string;
          if (field === "awards") syncedSelfIntro.awards = value as string;
          if (field === "tech_stack")
            syncedSelfIntro.tech_stack = value as string;
          if (field === "toeic_score")
            syncedSelfIntro.toeic_score = value as string;
          if (field === "english_proficiency")
            syncedSelfIntro.english_proficiency = value as string;
          if (field === "portfolio")
            syncedSelfIntro.portfolio = value as string;

          return {
            resume: newResume,
            selfIntro: syncedSelfIntro,
          };
        }),

      resetResume: () => set({ resume: getEmptyResume() }),

      // 경력 관리
      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: [
              ...state.resume.experiences,
              {
                id: Date.now().toString(),
                company: "",
                position: "",
                start_date: "",
                end_date: "",
                description: "",
              },
            ],
          },
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...data } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      // 프로젝트 관리
      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              {
                id: Date.now().toString(),
                name: "",
                period: "",
                description: "",
                tech_stack: "",
                role: "",
              },
            ],
          },
        })),

      updateProject: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((proj) =>
              proj.id === id ? { ...proj, ...data } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((proj) => proj.id !== id),
          },
        })),
    }),
    {
      name: "resume-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 자기소개서 데이터를 AI API 형식으로 변환하는 헬퍼 함수
export function formatSelfIntroForAI(data: SelfIntroData): string {
  return `
연구 관심사: ${data.research_interests}

자기소개 1: ${data.intro1}

자기소개 2: ${data.intro2}

자기소개 3: ${data.intro3}

포트폴리오: ${data.portfolio}

전공: ${data.major}

자격증: ${data.certifications}

수상 경력: ${data.awards}

기술 스택: ${data.tech_stack}

TOEIC 점수: ${data.toeic_score}

영어 능력: ${data.english_proficiency}

학점: ${data.gpa}
  `.trim();
}
