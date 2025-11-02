# API 연동 가이드

## 개요
프론트엔드는 백엔드에서 보내주는 JSON 구조를 **그대로** 사용합니다.  
**Adapter 레이어가 없으므로** URL만 변경하면 즉시 연동 가능합니다.

---

## 🚀 빠른 시작

### 1. 환경변수 설정
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

### 2. API 파일에서 주석 해제
각 API 파일(`lib/api/*.api.ts`)에서:
- ✅ 주석 처리된 fetch 코드 해제
- ❌ 더미 데이터 코드 삭제 또는 주석 처리

---

## 📁 API 파일 구조

```
lib/
├── api/
│   ├── resume.api.ts          # 이력서 API
│   ├── professor.api.ts       # 교수 정보 API
│   ├── diagnosis.api.ts       # 강의진단 API
│   ├── contact.api.ts         # 대학원 컨택 API
│   ├── undergrad-apply.api.ts # 학부연구생 신청 API
│   └── research-labs.api.ts   # 연구실 목록 API (JSON 파일)
└── hooks/
    ├── useResume.ts           # 이력서 훅
    ├── useProfessor.ts        # 교수 정보 훅
    ├── useDiagnosis.ts        # 강의진단 훅
    ├── useContact.ts          # 대학원 컨택 훅
    └── useUndergradApply.ts   # 학부연구생 신청 훅
```

---

## 📡 API 엔드포인트 목록

### 이력서 관리 (`resume.api.ts`)

| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 전체 조회 | GET | `/api/resume` | 이력서 전체 데이터 |
| 기본 정보 수정 | PUT | `/api/resume/basic-info` | 기본 정보 수정 |
| 언어 능력 추가 | POST | `/api/resume/language` | 언어 능력 추가 |
| 언어 능력 삭제 | DELETE | `/api/resume/language/:id` | 언어 능력 삭제 |
| 자격증 추가 | POST | `/api/resume/certificate` | 자격증 추가 |
| 자격증 삭제 | DELETE | `/api/resume/certificate/:id` | 자격증 삭제 |
| 수상경력 추가 | POST | `/api/resume/award` | 수상경력 추가 |
| 수상경력 삭제 | DELETE | `/api/resume/award/:id` | 수상경력 삭제 |
| 포트폴리오 추가 | POST | `/api/resume/portfolio` | 포트폴리오 추가 |
| 포트폴리오 삭제 | DELETE | `/api/resume/portfolio/:id` | 포트폴리오 삭제 |
| 자기소개서 저장 | PUT | `/api/resume/cover-letter` | 자기소개서 저장 |

### 교수 정보 (`professor.api.ts`)

| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 교수 정보 조회 | GET | `/api/professor` | 지도교수 정보 |
| 상담 신청 | POST | `/api/professor/counseling` | 상담 신청 |

### 강의진단 (`diagnosis.api.ts`)

| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 진단 결과 조회 | GET | `/api/diagnosis/results` | 강의진단 결과 목록 |
| 상세 조회 | GET | `/api/diagnosis/:id` | 특정 진단 상세 |

### 대학원 컨택 (`contact.api.ts`)

| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 연구실 검색 | GET | `/api/contact/labs` | 연구실 목록 조회 |
| 컨택 내역 조회 | GET | `/api/contact/records` | 컨택 내역 조회 |
| 컨택 신청 | POST | `/api/contact/submit` | 컨택 신청 |

### 학부연구생 신청 (`undergrad-apply.api.ts`)

| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 신청 | POST | `/api/undergrad/apply` | 학부연구생 신청 |
| 연구실 목록 | GET | `/api/undergrad/labs` | 신청 가능 연구실 |

---

## 💡 실제 API 연동 예시

### Before (더미 데이터)
```typescript
getResume: async (): Promise<ApiResume> => {
  // 더미 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ basicInfo: {...}, ... });
    }, 300);
  });
}
```

### After (실제 API)
```typescript
getResume: async (): Promise<ApiResume> => {
  const response = await fetch(`${API_BASE_URL}/api/resume`);
  if (!response.ok) throw new Error('이력서 조회 실패');
  return response.json();
}
```

---

## 📋 JSON 응답 구조

프론트엔드는 아래 구조를 **그대로** 사용합니다.

### 이력서 응답 예시
```json
{
  "basicInfo": {
    "name": "홍길동",
    "studentId": "12345678",
    "major": "컴퓨터공학과",
    "email": "test@inha.ac.kr",
    "phone": "010-1234-5678",
    "address": "인천시"
  },
  "education": {
    "school": "인하대학교",
    "major": "컴퓨터공학과",
    "gpa": "4.0",
    "graduationStatus": "재학"
  },
  "languages": [
    {
      "id": 1,
      "language": "영어",
      "testName": "TOEIC",
      "score": "900",
      "level": "상",
      "acquiredDate": "2024-01-01",
      "expiryDate": "2026-01-01"
    }
  ],
  "certificates": [...],
  "awards": [...],
  "portfolios": [...],
  "coverLetter": {
    "question1": "답변 내용...",
    "question2": "답변 내용...",
    "question3": "답변 내용..."
  }
}
```

### 교수 정보 응답 예시
```json
{
  "koreanName": "안정호",
  "englishName": "Jungho Ahn",
  "position": "교수",
  "department": "컴퓨터공학과",
  "email": "jahn@inha.ac.kr",
  "phone": "032-860-xxxx",
  "office": "5호관 xxx호",
  "researchArea": "인공지능, 머신러닝"
}
```

---

## ⚠️ 중요 사항

### 1. **Adapter 없음**
- 백엔드 JSON 구조를 **그대로** 사용
- 필드명 변환 없음 (예: `name` → `name`)
- Type 정의 = API 응답 구조

### 2. **URL만 변경**
```typescript
// AS-IS
return Promise.resolve(dummyData);

// TO-BE
const response = await fetch(`${API_BASE_URL}/api/endpoint`);
return response.json();
```

### 3. **에러 처리**
```typescript
const response = await fetch(`${API_BASE_URL}/api/endpoint`);
if (!response.ok) {
  throw new Error('API 호출 실패');
}
return response.json();
```

### 4. **React Query 자동 처리**
- 로딩 상태: `isLoading`
- 에러 상태: `error`
- 재시도: 자동
- 캐싱: 자동

---

## 🔍 디버깅

### API 호출 확인
```typescript
// lib/api/resume.api.ts 에서 console.log 추가
const response = await fetch(`${API_BASE_URL}/api/resume`);
console.log('API Response:', await response.json());
```

### 네트워크 탭
1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭 선택
3. API 호출 확인

---

## 📞 문의

API 연동 관련 문의사항은 백엔드 팀에게 연락하세요.

