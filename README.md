# Inha LabMate - 연구실 매칭 플랫폼

인하대학교 학생들을 위한 AI 기반 연구실 추천 및 매칭 플랫폼입니다.

## 📋 프로젝트 소개

Inha LabMate는 학생들의 관심사, 기술 스택, 연구 분야를 분석하여 최적의 연구실을 추천해주는 웹 애플리케이션입니다.

### 주요 기능

- **AI 연구실 추천**: 자기소개서 정보를 기반으로 적합한 연구실을 AI가 분석하여 추천
- **자기소개서 작성**: 연구 관심사, 기술 스택, 프로젝트 경험 등을 체계적으로 작성
- **연구실 검색**: 학부연구생 및 대학원 연구실 정보 조회
- **로컬스토리지 저장**: 작성한 자기소개서 데이터를 브라우저에 안전하게 보관

## 🛠 기술 스택

- **Frontend**: Next.js 15.5.4, React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **State Management**: React Query (@tanstack/react-query)
- **Data Storage**: LocalStorage (자기소개서 데이터)

## 📁 프로젝트 구조

```
app/
├── app/
│   ├── components/
│   │   ├── AIRecommendation.tsx      # AI 추천 메인 컴포넌트 (모달 슬라이더)
│   │   ├── Sidebar.tsx                # 사이드바 네비게이션
│   │   └── resume/
│   │       └── SelfIntroSection.tsx   # 자기소개서 작성 폼
│   ├── globals.css                    # 전역 스타일
│   ├── layout.tsx                     # 루트 레이아웃
│   └── page.tsx                       # 메인 페이지
├── lib/
│   ├── api/
│   │   └── research-labs.api.ts       # 연구실 API 서비스
│   ├── hooks/
│   │   └── useResearchLabs.ts         # React Query 훅
│   ├── utils/
│   │   └── resume-storage.ts          # 자기소개서 로컬스토리지 유틸
│   └── adapters/
│       └── resume.adapter.ts          # 타입 정의
├── public/
│   └── data/
│       ├── undergrad-labs.json        # 학부연구생 데이터
│       └── graduate-labs.json         # 대학원 데이터
├── package.json
└── README.md
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### 4. 프로덕션 실행

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 💡 사용 방법

### 자기소개서 작성

1. 사이드바에서 "이력서 관리" 메뉴 클릭
2. 자기소개서 섹션에서 다음 정보 입력:
   - 연구 관심 분야
   - 자기소개 (관심사, 기술/경험, 연구 목표)
   - 포트폴리오/프로젝트
   - 전공, 학점, 자격증, 수상 경력
   - 기술 스택
   - 영어 능력 (TOEIC, 수준)
3. "저장" 버튼 클릭하여 로컬스토리지에 저장

### AI 연구실 추천 받기

1. 메인 페이지의 "AI 추천" 섹션으로 이동
2. "AI 추천 시작" 버튼 클릭
3. 로딩 화면에서 분석 진행 (프로그레스바: 0.1초마다 2%씩 증가)
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
- **프로그레스바**: 일정한 속도로 진행되는 로딩 인디케이터
- **로컬스토리지**: 서버 없이 클라이언트 측에서 데이터 관리

## 📦 주요 패키지

```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "framer-motion": "^11.18.0",
    "@tanstack/react-query": "^5.64.2",
    "i18nexus": "^3.2.1"
  }
}
```

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
```

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

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.

## 👥 팀

Inha-LabMate 개발팀

---

**인하대학교 학생들의 성공적인 연구실 매칭을 위하여** 🎓
