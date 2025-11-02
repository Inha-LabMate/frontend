// 교수 정보 API
// URL만 수정하면 실제 API와 연동 가능

// 실제 API 연동 시 사용
// const API_BASE_URL = "/api"; // 실제 API URL로 변경 가능

export interface ApiProfessorInfo {
  [key: string]: string | number | boolean | string[];
}

// 더미 데이터 - 교수 정보
const DUMMY_PROFESSOR: ApiProfessorInfo = {
  name: "안정호",
  department: "컴퓨터공학과",
  position: "교수",
  office: "하이테크관 507호",
  phone: "032-860-7404",
  email: "jhahn@inha.ac.kr",
  researchAreas: [
    "알고리즘",
    "최적화",
    "그래프 이론",
    "조합론",
    "계산복잡도 이론",
  ],
  education: [
    "박사 - University of Illinois at Urbana-Champaign, Computer Science (2005)",
    "석사 - 서울대학교, 컴퓨터공학 (1999)",
    "학사 - 서울대학교, 컴퓨터공학 (1997)",
  ],
  officeHours: "수요일 14:00-16:00 (사전 예약 필수)",
  introduction:
    "안정호 교수는 알고리즘 설계 및 분석, 최적화 이론, 그래프 이론 분야의 전문가입니다. 특히 조합 최적화 문제와 근사 알고리즘 연구에 집중하고 있으며, 이론적 연구와 실제 응용을 연결하는 연구를 수행하고 있습니다.",
};

// 교수 정보 조회
export const getProfessorInfo = async (): Promise<ApiProfessorInfo> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/professor/info`);
  // return response.json();

  // 더미 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 300));
  return DUMMY_PROFESSOR;
};

// 상담 신청
export const requestCounseling = async (_data: {
  studentName: string;
  studentId: string;
  topic: string;
  content: string;
  preferredDate: string;
}): Promise<{ success: boolean; message: string }> => {
  // 실제 API 호출
  // const API_BASE_URL = "/api";
  // const response = await fetch(`${API_BASE_URL}/professor/counseling`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(_data),
  // });
  // return response.json();

  // 더미 응답
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    message: "상담 신청이 완료되었습니다. 교수님께서 확인 후 연락드리겠습니다.",
  };
};
