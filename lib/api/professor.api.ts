// 교수 정보 API
// URL만 수정하면 실제 API와 연동 가능

// 실제 API 연동 시 사용
// const API_BASE_URL = "/api"; // 실제 API URL로 변경 가능

export interface ApiProfessorInfo {
  [key: string]: string | number | boolean | string[];
}

// 더미 데이터 - 교수 정보
const DUMMY_PROFESSOR: ApiProfessorInfo = {
  name: "김민수",
  department: "전자공학과",
  position: "부교수",
  office: "공대 7호관 320호",
  phone: "02-1234-5678",
  email: "mskim@university.ac.kr",
  researchAreas: ["인공지능", "머신러닝", "컴퓨터 비전", "딥러닝", "패턴 인식"],
  education: [
    "박사 - KAIST, 전기및전자공학 (2015)",
    "석사 - KAIST, 전기및전자공학 (2010)",
    "학사 - 연세대학교, 전자공학 (2008)",
  ],
  officeHours: "화요일 10:00-12:00, 목요일 15:00-17:00",
  introduction:
    "김민수 교수는 인공지능 및 머신러닝 분야, 특히 컴퓨터 비전과 딥러닝 응용 연구에 주력하고 있습니다. 자율주행 자동차의 시각 인지 시스템 및 의료 영상 분석을 위한 딥러닝 모델 개발 연구를 활발히 수행 중입니다.",
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
