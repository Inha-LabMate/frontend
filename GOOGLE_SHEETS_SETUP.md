# Google Sheets API 연동 가이드

## 📋 개요

학부연구생 및 대학원 연구실 데이터를 Google Sheets에서 자동으로 가져와 화면에 표시합니다.

## 🔧 설정 방법

### 1. Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** > **Enable APIs and Services** 클릭
4. **Google Sheets API** 검색 및 활성화
5. **Credentials** > **Create Credentials** > **Service Account** 선택
6. Service Account 생성 후 **Keys** 탭에서 JSON 키 다운로드
7. 다운로드한 파일을 프로젝트 루트에 `credential.json`으로 저장

### 2. Google Sheets 준비

#### 학부연구생 시트 구조

시트명: **학부연구생**

| 개설연번 | 개설학과 | 연구실명 | 교수명 | 연구내용 | 년도학기 |
| -------- | -------- | -------- | ------ | -------- | -------- |
| 1        | 간호학과 | ...      | ...    | ...      | 20252    |

#### 대학원 시트 구조

시트명: **대학원**

| 개설연번 | 개설학과 | 연구실명 | 지도교수 | 연구내용 | 년도학기 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 화학과   | ...      | ...      | ...      | 20252    |

### 3. 환경변수 설정

`.env.local` 파일 생성:

```env
# Google Sheets ID (스프레드시트 URL에서 확인)
# https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit
GOOGLE_SHEETS_ID=your_spreadsheet_id_here

# API Server URL
NEXT_PUBLIC_API_SERVER_URL=http://localhost:3000
```

### 4. Service Account 권한 부여

1. Google Sheets 문서 열기
2. 우측 상단 **공유** 버튼 클릭
3. `credential.json`의 `client_email` 값을 복사
4. 해당 이메일에 **뷰어** 또는 **편집자** 권한 부여

## 📁 파일 구조

```
/lib/services/
  └── googleSheets.service.ts    # Google Sheets API 서비스

/app/api/sheets/
  └── route.ts                   # API Route Handler

/lib/api/
  └── research-labs.api.ts       # Google Sheets 데이터 조회 로직
```

## 🚀 사용 방법

### API 엔드포인트

```
GET /api/sheets?type=undergrad&year=20252
GET /api/sheets?type=graduate&year=20252
```

**Parameters:**

- `type`: `undergrad` (학부연구생) 또는 `graduate` (대학원)
- `year`: 년도학기 (optional)

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "department": "간호학과",
      "labName": "...",
      "professor": "...",
      "researchArea": "...",
      "year": "20252"
    }
  ],
  "count": 10
}
```

### 프론트엔드에서 사용

React Query를 통해 자동으로 데이터를 가져옵니다:

```typescript
import { useUndergradLabs, useGraduateLabs } from "@/lib/hooks/useResearchLabs";

// 학부연구생 데이터
const { data: undergradLabs } = useUndergradLabs("20252");

// 대학원 데이터
const { data: graduateLabs } = useGraduateLabs("20252");
```

## 🔍 동작 원리

1. 사용자가 페이지 접속
2. React Query가 자동으로 `/api/sheets` 호출
3. API Route가 Google Sheets API를 통해 데이터 조회
4. 데이터를 JSON 형식으로 변환하여 반환
5. 화면에 표시

## ⚠️ 주의사항

1. **credential.json은 절대 Git에 커밋하지 마세요**
   - 이미 .gitignore에 추가되어 있습니다
2. **Service Account Email에 권한을 부여해야 합니다**
   - 권한이 없으면 403 에러 발생
3. **Google Sheets 구조를 유지해야 합니다**
   - 첫 번째 행은 헤더로 사용됩니다
   - 컬럼명이 변경되면 adapter 코드 수정 필요

## 🐛 트러블슈팅

### 403 Forbidden Error

→ Service Account에 Google Sheets 접근 권한이 없습니다
→ Sheets 공유 설정에서 `client_email` 추가

### 401 Unauthorized Error

→ credential.json 파일이 없거나 잘못되었습니다
→ 파일 경로 및 내용 확인

### Data Not Found

→ GOOGLE_SHEETS_ID 환경변수 확인
→ 시트명이 정확한지 확인 (대소문자 구분)

## 📚 참고 자료

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)
