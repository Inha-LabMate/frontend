# API 빠른 참조 가이드

## 🎯 핵심 요약

**백엔드가 보내주는 JSON을 그대로 사용합니다.**
- ✅ Adapter 없음
- ✅ URL만 변경하면 됨
- ✅ 프론트엔드 수정 불필요

---

## 📍 API 엔드포인트 전체 목록

### 이력서 관리
```
GET    /api/resume                    # 이력서 전체 조회
PUT    /api/resume/basic-info         # 기본정보 수정
POST   /api/resume/language           # 언어능력 추가
DELETE /api/resume/language/:id       # 언어능력 삭제
POST   /api/resume/certificate        # 자격증 추가
DELETE /api/resume/certificate/:id    # 자격증 삭제
POST   /api/resume/award              # 수상경력 추가
DELETE /api/resume/award/:id          # 수상경력 삭제
POST   /api/resume/portfolio          # 포트폴리오 추가
DELETE /api/resume/portfolio/:id      # 포트폴리오 삭제
PUT    /api/resume/cover-letter       # 자기소개서 저장
```

### 교수 정보
```
GET    /api/professor                 # 교수 정보 조회
POST   /api/professor/counseling      # 상담 신청
```

### 강의진단
```
GET    /api/diagnosis/results         # 진단 결과 목록
GET    /api/diagnosis/:id             # 진단 상세
```

### 대학원 컨택
```
GET    /api/contact/labs              # 연구실 검색 (query: category, semester, keyword)
GET    /api/contact/records           # 컨택 내역 (query: semester, department, status)
POST   /api/contact/submit            # 컨택 신청
```

### 학부연구생
```
POST   /api/undergrad/apply           # 학부연구생 신청
GET    /api/undergrad/labs            # 신청 가능 연구실 목록
```

---

## 📦 JSON 응답 구조

### 1. 이력서 조회 (GET /api/resume)
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
  "certificates": [
    {
      "id": 1,
      "name": "정보처리기사",
      "issuer": "한국산업인력공단",
      "acquiredDate": "2024-01-01",
      "fileUrl": "https://..."
    }
  ],
  "awards": [
    {
      "id": 1,
      "content": "우수상",
      "date": "2024-01-01",
      "fileUrl": "https://..."
    }
  ],
  "portfolios": [
    {
      "id": 1,
      "type": "웹 프로젝트",
      "content": "프로젝트 설명...",
      "fileUrl": "https://..."
    }
  ],
  "coverLetter": {
    "question1": "답변1...",
    "question2": "답변2...",
    "question3": "답변3..."
  }
}
```

### 2. 교수 정보 (GET /api/professor)
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

### 3. 강의진단 결과 (GET /api/diagnosis/results)
```json
[
  {
    "id": "1",
    "yearSemester": "2024-2",
    "message": "2024학년도 2학기 강의진단이 시작되었습니다.",
    "startDate": "2024-10-20",
    "endDate": "2024-12-31"
  }
]
```

### 4. 연구실 검색 (GET /api/contact/labs)
```json
[
  {
    "id": 1,
    "지원학기": "20261",
    "개설학과": "컴퓨터공학과",
    "세부전공": "인공지능",
    "연구실명": "AI Lab",
    "지도교수": "홍길동",
    "연구내용": "딥러닝 연구",
    "컨택가능": true
  }
]
```

### 5. 컨택 내역 (GET /api/contact/records)
```json
[
  {
    "id": 1,
    "지원학기": "20261",
    "개설학과": "컴퓨터공학과",
    "세부전공": "인공지능",
    "연구실명": "AI Lab",
    "지도교수": "홍길동",
    "컨택신청": "완료"
  }
]
```

### 6. 학부연구생 신청 (POST /api/undergrad/apply)
**Request:**
```json
{
  "name": "홍길동",
  "studentId": "12345678",
  "department": "컴퓨터공학과",
  "grade": "3",
  "phone": "010-1234-5678",
  "email": "test@inha.ac.kr",
  "gpa": "4.0",
  "yearSemester": "20252",
  "preferredLab": "AI Lab",
  "professor": "홍길동",
  "motivation": "지원 동기...",
  "experience": "경험...",
  "interests": "관심 분야..."
}
```
**Response:**
```json
{
  "success": true,
  "message": "신청이 완료되었습니다."
}
```

---

## 🔧 실제 연동 방법

### Step 1: 환경변수 설정
`.env.local` 파일:
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Step 2: API 파일 수정
`lib/api/resume.api.ts` 예시:

**주석 해제:**
```typescript
const response = await fetch(`${API_BASE_URL}/api/resume`);
if (!response.ok) throw new Error('이력서 조회 실패');
return response.json();
```

**더미 데이터 제거:**
```typescript
// return new Promise((resolve) => { ... }); // 이 부분 삭제
```

### Step 3: 완료!
프론트엔드는 **아무것도 수정 안 해도 됨**

---

## 📂 수정할 파일 목록

```
lib/api/
├── resume.api.ts          ⭐ 이력서
├── professor.api.ts       ⭐ 교수 정보
├── diagnosis.api.ts       ⭐ 강의진단
├── contact.api.ts         ⭐ 대학원 컨택
└── undergrad-apply.api.ts ⭐ 학부연구생

※ 각 파일에서 주석 해제하고 더미 데이터 제거
```

---

## ⚡ 빠른 체크리스트

- [ ] `.env.local`에 `NEXT_PUBLIC_API_URL` 설정
- [ ] 각 API 파일에서 fetch 코드 주석 해제
- [ ] 더미 데이터 코드 삭제
- [ ] 브라우저에서 Network 탭으로 API 호출 확인
- [ ] 완료!

---

## 💡 팁

1. **에러 확인**: 브라우저 Console 탭
2. **API 호출 확인**: Network 탭
3. **CORS 문제**: 백엔드에서 설정 필요
4. **인증**: 필요시 headers에 토큰 추가

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

