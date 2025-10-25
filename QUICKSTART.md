# 빠른 시작 가이드

## 🚀 데이터 다운로드 설정

### 1단계: 환경변수 설정

`.env.local` 파일을 생성하고 다음을 추가하세요:

```env
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
```

### 2단계: credential.json 확인

프로젝트 루트에 `credential.json` 파일이 있는지 확인하세요.

### 3단계: 데이터 다운로드

```bash
npm run download:data
```

### 4단계: 개발 서버 실행

```bash
npm run dev
```

## 📝 상세 가이드

- **데이터 다운로드**: `DATA_DOWNLOAD_GUIDE.md` 참조
- **Google Sheets API 설정**: `GOOGLE_SHEETS_SETUP.md` 참조 (레거시)

## ⚠️ 중요사항

- Google Sheets 데이터 수정 후 반드시 `npm run download:data` 재실행
- 빌드 시 자동으로 데이터 다운로드됨 (`npm run build`)
- credential.json은 Git에 커밋하지 마세요 (.gitignore에 포함됨)
