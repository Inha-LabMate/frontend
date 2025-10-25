/**
 * Google Sheets Service
 * Google Sheets API를 사용하여 데이터를 가져옵니다
 */

import { google } from "googleapis";

// Credential 파일 경로
const CREDENTIALS_PATH = "./credential.json";

/**
 * Google Sheets 인증 및 클라이언트 생성
 */
export async function getGoogleSheetsClient() {
  try {
    // Service Account 인증
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client as never });

    return sheets;
  } catch (error) {
    console.error("Google Sheets 인증 오류:", error);
    throw error;
  }
}

/**
 * 스프레드시트에서 데이터 가져오기
 */
export async function getSheetData(spreadsheetId: string, range: string) {
  try {
    const sheets = await getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    throw error;
  }
}

/**
 * 학부연구생 데이터를 JSON 형식으로 변환
 */
export function convertToUndergradLabsData(rows: (string | number)[][]) {
  if (!rows || rows.length === 0) {
    return [];
  }

  // 첫 번째 행은 헤더로 가정
  const headers = rows[0];
  const data = rows.slice(1);

  return data.map((row, index) => {
    const obj: Record<string, string | number> = { id: index + 1 };

    headers.forEach((header, colIndex) => {
      obj[String(header)] = row[colIndex] || "";
    });

    return obj;
  });
}

/**
 * 대학원 연구실 데이터를 JSON 형식으로 변환
 */
export function convertToGraduateLabsData(rows: (string | number)[][]) {
  if (!rows || rows.length === 0) {
    return [];
  }

  const headers = rows[0];
  const data = rows.slice(1);

  return data.map((row, index) => {
    const obj: Record<string, string | number> = { id: index + 1 };

    headers.forEach((header, colIndex) => {
      obj[String(header)] = row[colIndex] || "";
    });

    return obj;
  });
}
