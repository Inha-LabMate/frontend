#!/usr/bin/env node

/**
 * Google Sheets 데이터 다운로드 스크립트
 * 빌드 전에 실행하여 정적 JSON 파일 생성
 */

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// 환경변수 로드
require("dotenv").config({ path: ".env.local" });

const CREDENTIALS_PATH = "./scripts/credential.json";
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const OUTPUT_DIR = "./public/data";

// 출력 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Google Sheets 인증
 */
async function authorize() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    return google.sheets({ version: "v4", auth: client });
  } catch (error) {
    console.error("❌ 인증 실패:", error.message);
    throw error;
  }
}

/**
 * 시트 데이터 가져오기
 */
async function getSheetData(sheets, range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`❌ ${range} 데이터 가져오기 실패:`, error.message);
    return [];
  }
}

/**
 * 데이터를 JSON 형식으로 변환
 */
function convertToJSON(rows, idPrefix = "") {
  if (!rows || rows.length === 0) {
    return [];
  }

  const headers = rows[0];
  const data = rows.slice(1);

  return data
    .filter((row) => row.length > 0) // 빈 행 제외
    .map((row, index) => {
      const obj = {
        id: `${idPrefix}${index + 1}`,
      };

      headers.forEach((header, colIndex) => {
        const value = row[colIndex] || "";
        obj[header] = value;
      });

      return obj;
    });
}

/**
 * 학부연구생 데이터를 표준 형식으로 래핑
 */
function wrapUndergradData(data) {
  return data.map((item) => ({
    id: item.id,
    연번: item.개설연번 || item.연번 || "",
    학과: item.개설학과 || item.학과 || "",
    연구실명: item.연구실명 || "",
    교수명: item.교수명 || item.지도교수 || item.연구실지도교수 || "",
    연구내용: item.연구내용 || item.내용 || "",
    년도학기: item.년도학기 || item.학년 || "",
  }));
}

/**
 * 대학원 데이터를 표준 형식으로 래핑
 */
function wrapGraduateData(data) {
  return data.map((item) => ({
    id: item.id,
    연번: item.개설연번 || item.연번 || "",
    학과: item.개설학과 || item.학과 || item.운영학과 || "",
    연구실명: item.연구실명 || "",
    "연구실 지도교수":
      item["연구실 지도교수"] || item.지도교수 || item.교수명 || "",
    연구내용: item.연구내용 || item.연구분야 || "",
    년도학기: item.년도학기 || item.학년 || "",
  }));
}

/**
 * 메인 함수
 */
async function main() {
  console.log("🚀 Google Sheets 데이터 다운로드 시작...\n");

  if (!SPREADSHEET_ID) {
    console.error("❌ GOOGLE_SHEETS_ID 환경변수가 설정되지 않았습니다.");
    console.error("   .env.local 파일을 확인해주세요.");
    process.exit(1);
  }

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error("❌ credential.json 파일을 찾을 수 없습니다.");
    console.error(`   경로: ${path.resolve(CREDENTIALS_PATH)}`);
    process.exit(1);
  }

  try {
    const sheets = await authorize();
    console.log("✅ Google Sheets 인증 성공\n");

    // 스프레드시트의 모든 시트 이름 가져오기
    console.log("📋 스프레드시트 정보 확인 중...");
    const { google: googleApi } = require("googleapis");
    const sheetsApi = googleApi.sheets({
      version: "v4",
      auth: sheets.context._options.auth,
    });

    const spreadsheet = await sheetsApi.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetNames = spreadsheet.data.sheets.map(
      (sheet) => sheet.properties.title
    );
    console.log(
      `📄 사용 가능한 시트 (${sheetNames.length}개):`,
      sheetNames.join(", ")
    );
    console.log("");

    // 학부연구생 시트 찾기 (첫 번째 시트를 기본값으로)
    const undergradSheetName =
      sheetNames.find(
        (name) =>
          name.includes("학부") || name.toLowerCase().includes("undergrad")
      ) || sheetNames[0];

    // 학부연구생 데이터 다운로드
    console.log(
      `📥 학부연구생 데이터 다운로드 중... (시트: "${undergradSheetName}")`
    );
    const undergradRows = await getSheetData(
      sheets,
      `${undergradSheetName}!A:Z`
    );
    const undergradData = convertToJSON(undergradRows, "undergrad_");
    const wrappedUndergradData = wrapUndergradData(undergradData);

    const undergradOutput = path.join(OUTPUT_DIR, "undergrad-labs.json");
    fs.writeFileSync(
      undergradOutput,
      JSON.stringify(wrappedUndergradData, null, 2),
      "utf8"
    );
    console.log(
      `✅ 학부연구생 데이터 저장 완료: ${wrappedUndergradData.length}개 항목`
    );
    console.log(`   파일: ${undergradOutput}\n`);

    // 대학원 시트 찾기 (두 번째 시트를 기본값으로, 없으면 첫 번째)
    const graduateSheetName =
      sheetNames.find(
        (name) =>
          name.includes("대학원") || name.toLowerCase().includes("graduate")
      ) ||
      sheetNames[1] ||
      sheetNames[0];

    // 대학원 데이터 다운로드
    console.log(
      `📥 대학원 연구실 데이터 다운로드 중... (시트: "${graduateSheetName}")`
    );
    const graduateRows = await getSheetData(sheets, `${graduateSheetName}!A:Z`);
    const graduateData = convertToJSON(graduateRows, "graduate_");
    const wrappedGraduateData = wrapGraduateData(graduateData);

    const graduateOutput = path.join(OUTPUT_DIR, "graduate-labs.json");
    fs.writeFileSync(
      graduateOutput,
      JSON.stringify(wrappedGraduateData, null, 2),
      "utf8"
    );
    console.log(
      `✅ 대학원 데이터 저장 완료: ${wrappedGraduateData.length}개 항목`
    );
    console.log(`   파일: ${graduateOutput}\n`);

    console.log("🎉 모든 데이터 다운로드 완료!");
    console.log("\n📂 생성된 파일:");
    console.log(`   - ${undergradOutput}`);
    console.log(`   - ${graduateOutput}`);
  } catch (error) {
    console.error("\n❌ 오류 발생:", error.message);
    console.error("상세 정보:", error);
    process.exit(1);
  }
}

// 스크립트 실행
main();
