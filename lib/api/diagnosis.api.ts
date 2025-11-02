// 강의진단 결과 API
// URL만 수정하면 실제 API와 연동 가능

// 실제 API 연동 시 사용
// const API_BASE_URL = "/api"; // 실제 API URL로 변경 가능

export interface ApiDiagnosisResult {
  [key: string]: string | number | boolean;
}

// 더미 데이터 - 강의진단 결과
const DUMMY_DIAGNOSIS: ApiDiagnosisResult[] = [
  {
    id: 1,
    년도학기: "2024-2",
    과목명: "알고리즘",
    분반: "01",
    학점: 3,
    시간: 3,
    수강인원: 45,
    진단참여율: 88.9,
    만족도: 4.5,
    난이도: 4.2,
    과제량: 4.0,
    교수만족도: 4.6,
    비고: "우수",
  },
  {
    id: 2,
    년도학기: "2024-2",
    과목명: "자료구조",
    분반: "02",
    학점: 3,
    시간: 3,
    수강인원: 52,
    진단참여율: 92.3,
    만족도: 4.7,
    난이도: 3.8,
    과제량: 3.5,
    교수만족도: 4.8,
    비고: "우수",
  },
  {
    id: 3,
    년도학기: "2024-1",
    과목명: "이산수학",
    분반: "01",
    학점: 3,
    시간: 3,
    수강인원: 38,
    진단참여율: 84.2,
    만족도: 4.3,
    난이도: 4.5,
    과제량: 4.2,
    교수만족도: 4.4,
    비고: "양호",
  },
];

// 강의진단 결과 조회
export const getDiagnosisResults = async (params?: {
  year?: string;
  semester?: string;
}): Promise<ApiDiagnosisResult[]> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/course/diagnosis?year=${params?.year}&semester=${params?.semester}`);
  // return response.json();

  // 더미 데이터 반환 (필터링)
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...DUMMY_DIAGNOSIS];

  if (params?.year && params?.semester) {
    const yearSemester = `${params.year}-${params.semester}`;
    filtered = filtered.filter((d) => d.년도학기 === yearSemester);
  }

  return filtered;
};

// 강의진단 상세 조회
export const getDiagnosisDetail = async (
  id: number
): Promise<ApiDiagnosisResult> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/course/diagnosis/${id}`);
  // return response.json();

  // 더미 데이터
  await new Promise((resolve) => setTimeout(resolve, 300));
  const result = DUMMY_DIAGNOSIS.find((d) => d.id === id);
  if (!result) throw new Error("진단 결과를 찾을 수 없습니다.");
  return result;
};
