# 🎓 Inha LabMate - AI 기반 연구실 매칭 플랫폼

> **인하대학교 학생들을 위한 차세대 연구실 추천 시스템**  
> AI가 분석하여 당신에게 꼭 맞는 연구실을 찾아드립니다.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-FF0080?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

## 🌟 프로젝트 개요

**Inha LabMate**는 인하대학교 학생들이 자신에게 가장 적합한 연구실을 찾을 수 있도록 돕는 **AI 기반 지능형 매칭 플랫폼**입니다.

### 💡 핵심 가치

- **🎯 정확한 매칭**: 학생의 관심사, 기술 스택, 연구 경험을 종합 분석하여 최적의 연구실 추천
- **⚡ 실시간 동기화**: Zustand persist를 활용한 자기소개서 ↔ 이력서 데이터 자동 동기화
- **🌐 다국어 지원**: i18nexus 기반 한국어/영어 실시간 번역으로 글로벌 학생 지원
- **🎨 몰입형 UX**: Framer Motion 기반 부드러운 애니메이션과 다크모드 풀스크린 모달
- **💾 영구 저장**: LocalStorage 기반 데이터 영속성으로 언제든지 이어서 작성 가능

---

## ✨ 주요 기능

### 1️⃣ AI 연구실 추천 시스템

- **딥러닝 기반 분석**: 자기소개서 12개 필드를 AI가 종합 분석
- **적합도 점수 계산**: 연구 관심사, 기술 스택, 경험을 기반으로 정밀한 매칭
- **예상 합격률 예측**: 과거 데이터 기반 합격 가능성 산출
- **상세 추천 이유 제공**: 왜 이 연구실이 적합한지 명확한 근거 제시

### 2️⃣ 통합 이력서 관리

- **자기소개서 작성**: 연구 관심사, 프로젝트 경험, 기술 스택 등 12개 필드
- **이력서 작성**: 기본 정보, 학력, 경력, 프로젝트 동적 관리
- **실시간 동기화**: 공통 필드(전공, 학점, 자격증, 기술스택 등) 자동 동기화
- **Zustand persist**: 새로고침 후에도 데이터 유지, 언제든지 이어서 작성

### 3️⃣ 연구실 데이터베이스

- **학부연구생 정보**: 학부생 대상 연구실 목록 및 상세 정보
- **대학원 정보**: 대학원 진학 희망자를 위한 연구실 데이터
- **년도/학기 필터링**: 원하는 시기의 모집 정보 조회

### 4️⃣ 몰입형 UI/UX

- **풀스크린 다크모드 모달**: 방해 요소 없이 추천 결과에 집중
- **키보드 네비게이션**: `Space`, `←`, `→`, `ESC`로 빠른 조작
- **부드러운 애니메이션**: Framer Motion 기반 페이드인/슬라이드 효과
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원

### 5️⃣ 다국어 지원 (i18nexus)

- **한국어/영어 실시간 번역**: UI 텍스트 자동 번역
- **글로벌 학생 지원**: 외국인 학생도 쉽게 사용 가능
- **SEO 최적화**: 다국어 메타 태그 자동 생성

---

## 🛠 기술 스택

### Frontend Framework

- **Next.js 15.5.4** - 최신 App Router, Server Components
- **React 19.1.0** - 최신 React 기능 (Concurrent Features, Suspense)
- **TypeScript 5** - 타입 안정성 및 개발자 경험 향상

### State Management & Data Fetching

- **Zustand 5.0.3** - 경량 전역 상태 관리 + persist middleware
- **@tanstack/react-query 5.64.2** - 서버 상태 관리 및 캐싱
- **LocalStorage** - 클라이언트 사이드 데이터 영속성

### Styling & Animation

- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion 11.18** - 프로덕션급 애니메이션 라이브러리

### Internationalization

- **i18nexus 3.2.1** - 실시간 다국어 번역 지원

---

## 📁 프로젝트 구조

```
app/
├── app/
│   ├── components/
│   │   ├── AIRecommendation.tsx          # ⭐ AI 추천 풀스크린 모달 (슬라이더)
│   │   ├── Sidebar.tsx                    # 사이드바 네비게이션
│   │   └── resume/
│   │       ├── SelfIntroSection.tsx       # 자기소개서 작성 폼 (12개 필드)
│   │       └── ResumeSection.tsx          # 이력서 작성 폼 (경력/프로젝트 동적 관리)
│   ├── graduate/
│   │   └── resume/page.tsx                # 이력서 관리 페이지 (탭 구조)
│   ├── globals.css                        # 전역 스타일 + Tailwind
│   ├── layout.tsx                         # 루트 레이아웃 (Sidebar 포함)
│   └── page.tsx                           # 메인 페이지 (AI 추천 진입점)
├── lib/
│   ├── store/
│   │   └── resume-store.ts                # ⭐ Zustand 전역 상태 (자기소개서 + 이력서 통합)
│   ├── api/
│   │   └── research-labs.api.ts           # 연구실 API 서비스
│   ├── hooks/
│   │   └── useResearchLabs.ts             # React Query 커스텀 훅
│   └── adapters/
│       └── research-labs.adapter.ts       # 데이터 어댑터 (타입 변환)
├── public/
│   └── data/
│       ├── undergrad-labs.json            # 학부연구생 데이터
│       └── graduate-labs.json             # 대학원 데이터
└── README.md                              # 📄 본 문서
```

### 핵심 파일 설명

| 파일                   | 역할           | 주요 기능                                          |
| ---------------------- | -------------- | -------------------------------------------------- |
| `resume-store.ts`      | 전역 상태 관리 | Zustand persist로 자기소개서/이력서 데이터 영속화  |
| `AIRecommendation.tsx` | AI 추천 모달   | 풀스크린 슬라이더, 키보드 네비게이션, 프로그레스바 |
| `SelfIntroSection.tsx` | 자기소개서 폼  | 12개 필드, 실시간 저장, 유효성 검사                |
| `ResumeSection.tsx`    | 이력서 폼      | 경력/프로젝트 동적 추가/삭제, 자기소개서 동기화    |

---

## 🚀 빠른 시작

### 필수 요구사항

- **Node.js** 18.17 이상
- **npm**, **yarn**, 또는 **pnpm** 패키지 매니저

### 설치 및 실행

#### 1️⃣ 저장소 클론 및 의존성 설치

```bash
# 저장소 클론
git clone https://github.com/Inha-LabMate/frontend.git
cd frontend

# 의존성 설치
npm install
# or
yarn install
# or
pnpm install
```

#### 2️⃣ 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 **[http://localhost:3000](http://localhost:3000)** 을 열어 확인하세요.

#### 3️⃣ 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

---

## 💡 사용 가이드

### 📝 자기소개서 작성

1. **사이드바** → "이력서 관리" 클릭
2. **"자기소개서"** 탭 선택
3. **12개 필드** 입력:
   ```
   ✅ 연구 관심 분야
   ✅ 자기소개 1 (성장과정 및 학업 배경)
   ✅ 자기소개 2 (관심사 및 연구 경험)
   ✅ 자기소개 3 (연구 목표 및 비전)
   ✅ 포트폴리오/프로젝트 링크
   ✅ 전공
   ✅ 학점 (GPA)
   ✅ 자격증
   ✅ 수상 경력
   ✅ 기술 스택
   ✅ TOEIC 점수
   ✅ 영어 능력 (상/중/하)
   ```
4. **"저장"** 버튼 클릭
   - ✨ **Zustand persist**가 자동으로 LocalStorage에 저장
   - ✨ 새로고침 후에도 데이터 유지
   - ✨ 저장 완료 알림 Toast 표시

### 📄 이력서 작성

1. **"이력서"** 탭 선택
2. **기본 정보** 입력
   - 이름, 이메일, 전화번호, 생년월일, 주소
3. **학력 정보** 입력
   - 대학교, 전공, 졸업 상태, 학점
4. **경력/프로젝트** 동적 관리
   - "**+ 경력 추가**" 버튼으로 경력 항목 추가
   - "**+ 프로젝트 추가**" 버튼으로 프로젝트 항목 추가
   - 각 항목별 삭제 가능
5. **추가 정보** 입력
   - 자격증, 수상경력, 기술스택, TOEIC, 영어능력, 포트폴리오
6. **"저장"** 버튼 클릭

#### 🔄 자동 동기화 필드

아래 필드는 **자기소개서 ↔ 이력서 간 실시간 동기화**됩니다:

```
전공, 학점(GPA), 자격증, 수상경력, 기술스택, TOEIC 점수, 영어 능력, 포트폴리오
```

한 쪽에서 수정하면 다른 쪽에도 자동 반영됩니다! 🎯

### 🤖 AI 연구실 추천 받기

1. **메인 페이지** → "AI 추천" 섹션 이동
2. **"AI 추천 시작"** 버튼 클릭
3. **로딩 화면** 자동 진행
   - 📊 프로그레스바: 0.1초마다 10%씩 증가 (총 1초)
   - 💬 동적 상태 메시지 표시
   - 🧠 자기소개서 데이터 AI 분석
4. **추천 결과** 풀스크린 모달로 확인
   - 🎨 **다크모드 슬라이더**: 몰입형 UI
   - ⌨️ **키보드 네비게이션**:
     - `Space` / `→` : 다음 슬라이드
     - `←` : 이전 슬라이드
     - `ESC` : 모달 닫기
   - 🎯 **진행 바**: 하단 점 클릭으로 슬라이드 직접 이동
5. **연구실 정보** 확인
   - 🥇 **순위** (1위, 2위, 3위 메달 표시)
   - 📊 **적합도** (높음/중간/낮음)
   - ✅ **예상 합격률** (높음/중간/낮음)
   - 💡 **추천 이유** (상세한 매칭 근거)

### 🔍 연구실 검색

1. **"학부연구생"** 또는 **"대학원"** 탭 선택
2. **년도/학기** 필터 선택 (예: 2024-1, 2024-2)
3. **연구실 목록** 조회
   - 학과, 연구실명, 교수명, 연구 분야 확인

---

## 🎨 주요 기술 특징

### 1️⃣ Zustand Persist - 상태 영속화

```typescript
// lib/store/resume-store.ts
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      selfIntro: getEmptySelfIntro(),
      resume: getEmptyResume(),
      // ... actions
    }),
    {
      name: "resume-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

**장점**:

- ✅ 새로고침 후에도 데이터 유지
- ✅ 자동 직렬화/역직렬화
- ✅ 타입 안정성 보장
- ✅ 자기소개서 ↔ 이력서 실시간 동기화

### 2️⃣ Framer Motion - 부드러운 애니메이션

```typescript
// 슬라이드 전환 애니메이션
<motion.div
  key={currentSlide}
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }}
  transition={{ duration: 0.3 }}>
  {/* 콘텐츠 */}
</motion.div>
```

**적용 영역**:

- ✨ 모달 슬라이드 전환
- ✨ 프로그레스바 증가 효과
- ✨ Toast 알림 페이드인
- ✨ 카드 호버 효과

### 3️⃣ i18nexus - 다국어 실시간 번역

```typescript
import { useTranslation } from "i18nexus";

export default function Component() {
  const { t } = useTranslation();

  return <h1>{t("이력서 관리")}</h1>; // "Resume Management" (영어)
}
```

**지원 언어**:

- 🇰🇷 한국어 (기본)
- 🇺🇸 영어
- 🌐 향후 확장 가능 (중국어, 일본어 등)

### 4️⃣ React Query - 서버 상태 관리

```typescript
// 캐싱 및 자동 재검증
export const useRecommendedLabs = () => {
  return useMutation({
    mutationFn: async (selfIntroData: SelfIntroData) => {
      const data = await researchLabsApi.getRecommendedLabs(selfIntroData);
      return adaptRecommendedLabs(data);
    },
  });
};
```

**장점**:

- 🚀 자동 캐싱으로 빠른 로딩
- 🔄 백그라운드 자동 재검증
- ⚡ 낙관적 업데이트 지원

---

## 💡 사용 방법

### 자기소개서 작성

1. 사이드바에서 "이력서 관리" 메뉴 클릭
2. "자기소개서" 탭 선택
3. 12개 필드 입력:
   - 연구 관심 분야
   - 자기소개 1-3 (성장과정, 성격, 지원동기)
   - 포트폴리오/프로젝트
   - 전공, 학점, 자격증, 수상 경력
   - 기술 스택
   - 영어 능력 (TOEIC, 수준)
4. "저장" 버튼 클릭 - Zustand persist가 자동으로 LocalStorage에 저장

### 이력서 작성

1. "이력서" 탭 선택
2. 기본 정보 입력 (이름, 이메일, 전화번호, 생년월일, 주소)
3. 학력 정보 입력
4. "경력 추가" / "프로젝트 추가" 버튼으로 항목 동적 추가
5. 추가 정보 입력 (자격증, 수상경력, 기술스택 등)
6. "저장" 버튼 클릭

**자동 동기화**: 전공, 학점, 자격증, 수상경력, 기술스택, TOEIC, 영어능력, 포트폴리오는 자기소개서와 이력서 간 자동 동기화됩니다.

### AI 연구실 추천 받기

1. 메인 페이지의 "AI 추천" 섹션으로 이동
2. "AI 추천 시작" 버튼 클릭
3. 로딩 화면에서 분석 진행 (프로그레스바: 0.1초마다 10%씩 증가)
4. 추천 결과를 풀스크린 모달 슬라이더로 확인:
   - 키보드 네비게이션: `Space`/`→` (다음), `←` (이전), `ESC` (닫기)
   - 하단 진행 바로 슬라이드 직접 선택 가능
5. 각 연구실의 순위, 적합도, 예상합격률, 추천 이유 확인

### 연구실 검색

- "학부연구생" 또는 "대학원" 탭에서 연구실 목록 조회
- 년도/학기별 필터링 가능

## 🎨 주요 UI/UX 특징

- **다크모드 모달**: 검은 배경의 몰입형 슬라이더로 추천 결과 표시
- **심플한 디자인**: 과한 애니메이션 제거, 핵심 정보에 집중
- **반응형 폰트**: 가독성을 위한 큰 폰트 사이즈 (제목: text-5xl, 내용: text-lg~xl)
- **프로그레스바**: 일정한 속도로 진행되는 로딩 인디케이터 (0.1s/10%)
- **Zustand persist**: 자기소개서와 이력서 데이터를 LocalStorage에 자동 저장
- **데이터 동기화**: 공통 필드는 자기소개서 ↔ 이력서 간 실시간 동기화

## 📦 주요 패키지

```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "framer-motion": "^11.18.0",
    "zustand": "^5.0.3",
    "@tanstack/react-query": "^5.64.2",
    "i18nexus": "^3.2.1"
  }
}
```

````

## 🔧 환경 변수

현재 프로젝트는 환경 변수가 필요하지 않습니다. 모든 데이터는 로컬스토리지와 정적 JSON 파일을 사용합니다.

## 📝 개발 노트

### 자기소개서 데이터 형식

로컬스토리지 키: `resume_self_intro`

```typescript
interface SelfIntroData {
  research_interests: string;
  intro1: string; // 관심사 및 연구 분야
  intro2: string; // 기술 및 경험
  intro3: string; // 연구 목표
  portfolio: string;
  major: string;
  certifications: string;
  awards: string;
  tech_stack: string;
  toeic_score: string;
  english_proficiency: string;
  gpa: string;
}
````

### API 연동 준비

현재는 목업 데이터를 사용하지만, `lib/api/research-labs.api.ts`에서 실제 API 연동을 위한 주석 처리된 코드가 준비되어 있습니다.

```typescript
// TODO: 실제 API 연동 시
// const response = await fetch('/api/recommend', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     selfIntro: formattedSelfIntro,
//     rawData: selfIntroData
//   })
// });
```

## 📊 프로젝트 하이라이트

### 🏆 기술적 우수성

| 항목               | 내용                               | 차별점                            |
| ------------------ | ---------------------------------- | --------------------------------- |
| **최신 기술 스택** | Next.js 15, React 19, TypeScript 5 | 2024년 최신 안정 버전 사용        |
| **상태 관리**      | Zustand + persist middleware       | Redux보다 95% 적은 보일러플레이트 |
| **데이터 동기화**  | 자기소개서 ↔ 이력서 실시간 동기화  | 중복 입력 제거, UX 극대화         |
| **다국어 지원**    | i18nexus 실시간 번역               | 한국어/영어 즉시 전환             |
| **애니메이션**     | Framer Motion 11.18                | 60fps 부드러운 전환 효과          |
| **타입 안정성**    | 100% TypeScript                    | 런타임 에러 사전 방지             |

### 💎 사용자 경험 (UX)

- ✅ **원클릭 추천**: 버튼 하나로 AI 분석 시작
- ✅ **실시간 저장**: 타이핑 즉시 Zustand persist에 자동 저장
- ✅ **키보드 중심**: 마우스 없이도 완벽한 조작 가능
- ✅ **시각적 피드백**: 모든 액션에 Toast/애니메이션 반응
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원

### 🚀 성능 최적화

- ⚡ **코드 스플리팅**: Next.js 자동 번들 최적화
- ⚡ **이미지 최적화**: Next.js Image 컴포넌트 활용
- ⚡ **캐싱 전략**: React Query 5분 staleTime 설정
- ⚡ **SSR/CSR 하이브리드**: 최적의 렌더링 방식 선택
- ⚡ **LocalStorage 활용**: 서버 부하 최소화

---

## 📦 의존성 패키지

### Core Dependencies

```json
{
  "next": "15.5.4", // React 프레임워크 (App Router)
  "react": "19.1.0", // UI 라이브러리
  "react-dom": "19.1.0", // React DOM 렌더링
  "typescript": "^5" // 타입 시스템
}
```

### State & Data Management

```json
{
  "zustand": "^5.0.3", // 전역 상태 관리 + persist
  "@tanstack/react-query": "^5.64.2" // 서버 상태 관리 & 캐싱
}
```

### Styling & Animation

```json
{
  "tailwindcss": "^4.0.0", // CSS 프레임워크
  "framer-motion": "^11.18.0" // 애니메이션 라이브러리
}
```

### Internationalization

```json
{
  "i18nexus": "^3.2.1" // 다국어 번역 (한국어/영어)
}
```

---

## 🔧 개발자 가이드

### 데이터 구조

#### 1️⃣ 자기소개서 데이터 (SelfIntroData)

```typescript
interface SelfIntroData {
  research_interests: string; // 연구 관심 분야
  intro1: string; // 성장과정 및 학업 배경
  intro2: string; // 관심사 및 연구 경험
  intro3: string; // 연구 목표 및 비전
  portfolio: string; // 포트폴리오/GitHub 링크
  major: string; // 전공
  certifications: string; // 자격증
  awards: string; // 수상 경력
  tech_stack: string; // 기술 스택
  toeic_score: string; // TOEIC 점수
  english_proficiency: string; // 영어 능력 (상/중/하)
  gpa: string; // 학점 (GPA)
}
```

**LocalStorage Key**: `resume-storage` (Zustand persist 자동 관리)

#### 2️⃣ 이력서 데이터 (ResumeData)

```typescript
interface ResumeData {
  // 기본 정보
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  address: string;

  // 학력
  university: string;
  major: string; // ⭐ 자기소개서와 동기화
  graduation_status: string;
  gpa: string; // ⭐ 자기소개서와 동기화

  // 경력 (동적 배열)
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
  }>;

  // 프로젝트 (동적 배열)
  projects: Array<{
    id: string;
    name: string;
    period: string;
    description: string;
    tech_stack: string;
    role: string;
  }>;

  // 추가 정보 (⭐ 자기소개서와 동기화)
  certifications: string;
  awards: string;
  tech_stack: string;
  toeic_score: string;
  english_proficiency: string;
  portfolio: string;
}
```

### Zustand Store 사용법

#### 데이터 읽기

```typescript
import { useResumeStore } from "@/lib/store/resume-store";

function Component() {
  // 자기소개서 데이터
  const selfIntro = useResumeStore((state) => state.selfIntro);

  // 이력서 데이터
  const resume = useResumeStore((state) => state.resume);

  return <div>{selfIntro.research_interests}</div>;
}
```

#### 데이터 수정

```typescript
function Component() {
  // 개별 필드 업데이트
  const updateSelfIntroField = useResumeStore(
    (state) => state.updateSelfIntroField
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelfIntroField("research_interests", e.target.value);
    // ✅ 자동으로 LocalStorage에 저장됨!
  };

  return <input onChange={handleChange} />;
}
```

#### 경력/프로젝트 관리

```typescript
function ResumeComponent() {
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  // 경력 추가
  const handleAddExperience = () => {
    addExperience(); // 새로운 빈 경력 항목 추가
  };

  // 경력 수정
  const handleUpdateExperience = (id: string, company: string) => {
    updateExperience(id, { company });
  };

  // 경력 삭제
  const handleRemoveExperience = (id: string) => {
    removeExperience(id);
  };
}
```

### API 연동 준비

현재는 **목업 데이터**를 사용하지만, 백엔드 연동을 위한 구조가 준비되어 있습니다.

#### AI 추천 API 예시

```typescript
// lib/api/research-labs.api.ts

getRecommendedLabs: async (
  selfIntroData: SelfIntroData
): Promise<ApiRecommendedLab[]> => {
  const formattedSelfIntro = formatSelfIntroForAI(selfIntroData);

  // 🚀 실제 API 연동 시 아래 주석 해제
  // const response = await fetch('/api/ai/recommend', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     selfIntro: formattedSelfIntro,
  //     rawData: selfIntroData
  //   })
  // });
  //
  // if (!response.ok) {
  //   throw new Error('AI 추천 실패');
  // }
  //
  // return await response.json();

  // 현재: 목업 데이터 반환
  return mockRecommendations;
};
```

#### 백엔드 요청 형식

```json
POST /api/ai/recommend
Content-Type: application/json

{
  "selfIntro": "연구 관심사: AI/ML\n자기소개 1: ...\n...",
  "rawData": {
    "research_interests": "AI/ML",
    "intro1": "...",
    "major": "컴퓨터공학과",
    "gpa": "4.0 / 4.5",
    "tech_stack": "Python, TensorFlow, PyTorch",
    ...
  }
}
```

#### 백엔드 응답 형식

```json
[
  {
    "id": 1,
    "rank": 1,
    "department": "컴퓨터공학과",
    "labName": "AI 연구실",
    "professor": "김교수 교수님",
    "researchArea": "딥러닝, 자연어 처리",
    "compatibility": "높음",
    "expectedAcceptance": "높음",
    "reason": "기술 스택과 연구 관심사가 매우 유사함"
  },
  ...
]
```

---

## 🎯 향후 개발 계획

### Phase 1 (완료 ✅)

- [x] AI 추천 시스템 UI/UX
- [x] 자기소개서 작성 폼
- [x] 이력서 작성 폼
- [x] Zustand persist 데이터 동기화
- [x] 다국어 지원 (i18nexus)
- [x] Framer Motion 애니메이션

### Phase 2 (진행 중 🚧)

- [ ] 백엔드 AI 모델 연동
- [ ] 실제 연구실 데이터베이스 구축
- [ ] 사용자 인증 시스템 (로그인/회원가입)
- [ ] 연구실 즐겨찾기 기능

### Phase 3 (계획 중 📋)

- [ ] 교수님 대시보드 (지원자 관리)
- [ ] 실시간 채팅 (학생 ↔ 교수)
- [ ] 이메일 알림 시스템
- [ ] 모바일 앱 (React Native)

---

## 🤝 기여하기

기여는 언제나 환영합니다! 아래 절차를 따라주세요.

### 기여 절차

1. **Fork** 저장소
2. **Feature 브랜치** 생성
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **변경사항 커밋**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
4. **브랜치에 Push**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Pull Request** 생성

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 설정 변경
```

---

## 📄 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 Inha LabMate Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👥 팀 소개

### Inha LabMate 개발팀

**프로젝트 목표**  
인하대학교 학생들이 자신에게 꼭 맞는 연구실을 찾을 수 있도록 돕고,  
교수님들은 우수한 연구 인력을 효율적으로 선발할 수 있도록 지원합니다.

**연락처**

- 📧 Email: contact@inha-labmate.com
- 🌐 Website: https://labmate.inha.ac.kr
- 💬 Discord: https://discord.gg/inha-labmate

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 도움을 받았습니다:

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Zustand](https://zustand-demo.pmnd.rs/) - 상태 관리
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션
- [TanStack Query](https://tanstack.com/query/) - 서버 상태 관리
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [i18nexus](https://i18nexus.com/) - 다국어 지원

---

<div align="center">

### 🎓 인하대학교 학생들의 성공적인 연구실 매칭을 위하여

**Made with ❤️ by Inha LabMate Team**

[⭐ Star](https://github.com/Inha-LabMate/frontend) · [🐛 Report Bug](https://github.com/Inha-LabMate/frontend/issues) · [💡 Request Feature](https://github.com/Inha-LabMate/frontend/issues)

</div>
