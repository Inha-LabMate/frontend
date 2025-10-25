# Google Sheets 데이터 다운로드 가이드

## 📋 개요

빌드/배포 전에 Google Sheets에서 데이터를 다운로드하여 정적 JSON 파일로 저장합니다.
런타임 API 호출이 아닌 빌드 타임 정적 데이터 방식을 사용합니다.

## 🚀 빠른 시작

### 1. 환경 설정

`.env.local` 파일 생성:

```env
# Google Sheets ID (스프레드시트 URL에서 확인)
# https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
```

### 2. credential.json 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 Service Account JSON 키 다운로드
2. 프로젝트 루트에 `credential.json`으로 저장
3. ⚠️ **이 파일은 .gitignore에 추가되어 있으니 Git에 커밋하지 마세요!**

### 3. Google Sheets 권한 부여

1. Google Sheets 문서 열기
2. 우측 상단 **공유** 버튼 클릭
3. `credential.json`의 `client_email` 값 복사
4. 해당 이메일에 **뷰어** 권한 부여

### 4. Google Sheets 구조

#### 학부연구생 시트

시트명: **학부연구생**

| 개설연번 | 개설학과 | 연구실명 | 교수명 | 연구내용 | 년도학기 |
| -------- | -------- | -------- | ------ | -------- | -------- |
| 1        | 간호학과 | ...      | ...    | ...      | 20252    |

#### 대학원 시트

시트명: **대학원**

| 개설연번 | 개설학과 | 연구실명 | 지도교수 | 연구내용 | 년도학기 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 화학과   | ...      | ...      | ...      | 20252    |

## 📦 사용 방법

### 데이터 다운로드

```bash
# 수동으로 데이터 다운로드
npm run download:data

# 빌드 시 자동으로 다운로드 (권장)
npm run build
```

### 실행 순서

1. **개발 환경**

   ```bash
   npm run download:data  # 데이터 다운로드
   npm run dev            # 개발 서버 실행
   ```

2. **프로덕션 빌드**
   ```bash
   npm run build  # 자동으로 데이터 다운로드 → 빌드
   npm start      # 프로덕션 서버 실행
   ```

## 📁 생성되는 파일

데이터 다운로드 시 다음 파일들이 생성됩니다:

```
/public/data/
  ├── undergrad-labs.json    # 학부연구생 데이터
  └── graduate-labs.json     # 대학원 데이터
```

### 데이터 구조

```json
// undergrad-labs.json
[
  {
    "id": "undergrad_1",
    "연번": "1",
    "학과": "간호학과",
    "연구실명": "...",
    "교수명": "...",
    "연구내용": "...",
    "년도학기": "20252"
  }
]

// graduate-labs.json
[
  {
    "id": "graduate_1",
    "연번": "1",
    "학과": "화학과",
    "연구실명": "...",
    "지도교수": "...",
    "연구내용": "...",
    "년도학기": "20252"
  }
]
```

## 🔄 작동 원리

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│ Google       │────▶│ Download Script │────▶│ Static JSON  │
│ Sheets       │     │ (Build Time)    │     │ Files        │
└──────────────┘     └─────────────────┘     └──────────────┘
                                                      │
                                                      ▼
                                              ┌──────────────┐
                                              │ Next.js App  │
                                              │ (Runtime)    │
                                              └──────────────┘
```

1. **빌드 전**: `npm run download:data` 실행
2. **다운로드**: Google Sheets API로 데이터 가져오기
3. **변환**: 데이터 래핑 및 정규화
4. **저장**: `/public/data/` 폴더에 JSON 파일 저장
5. **빌드**: Next.js가 정적 파일로 포함
6. **런타임**: fetch로 정적 JSON 파일 로드

## 💡 장점

1. **성능**: 런타임 API 호출 없이 정적 파일 사용
2. **안정성**: Google Sheets API 장애와 무관
3. **속도**: CDN을 통한 빠른 파일 로딩
4. **비용**: API 호출 횟수 제한 없음
5. **보안**: credential.json이 프로덕션 환경에 불필요

## ⚠️ 주의사항

1. **데이터 업데이트**

   - Google Sheets 수정 후 반드시 `npm run download:data` 재실행
   - 자동 동기화되지 않으므로 수동 업데이트 필요

2. **빌드 전 필수**

   - 배포 전에 최신 데이터 다운로드 확인
   - CI/CD 파이프라인에 `download:data` 스크립트 포함

3. **credential.json 보안**
   - .gitignore에 포함되어 있음
   - 절대 Git에 커밋하지 마세요
   - 팀원과 공유 시 안전한 방법 사용

## 🐛 트러블슈팅

### ❌ "GOOGLE_SHEETS_ID 환경변수가 설정되지 않았습니다"

→ `.env.local` 파일 생성 및 GOOGLE_SHEETS_ID 설정 확인

### ❌ "credential.json 파일을 찾을 수 없습니다"

→ 프로젝트 루트에 credential.json 파일 확인

### ❌ 403 Forbidden Error

→ Service Account Email에 Google Sheets 접근 권한 부여

### ❌ "데이터 파일을 찾을 수 없습니다"

→ `npm run download:data` 실행하여 데이터 다운로드

## 📚 관련 파일

```
/scripts/
  └── download-sheets-data.js    # 다운로드 스크립트

/lib/api/
  └── research-labs.api.ts       # 정적 JSON 파일 로드

/lib/services/
  └── googleSheets.service.ts    # Google Sheets API 서비스

/public/data/
  ├── undergrad-labs.json        # 생성됨 (Git 무시)
  └── graduate-labs.json         # 생성됨 (Git 무시)
```

## 🔗 참고 자료

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)
- [Next.js Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving)
