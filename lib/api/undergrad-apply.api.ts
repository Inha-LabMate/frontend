// 학부연구생 신청 API
// URL만 수정하면 실제 API와 연동 가능

// 실제 API 연동 시 사용
// const API_BASE_URL = "/api"; // 실제 API URL로 변경 가능

export interface ApiApplicationForm {
  [key: string]: string | number | boolean;
}

export interface ApiLabInfo {
  [key: string]: string | number | boolean;
}

// 더미 데이터 - 신청 가능한 연구실 목록
const DUMMY_LABS: ApiLabInfo[] = [
  {
    id: 1,
    연구실명: "조합적 알고리즘 연구실",
    지도교수: "안정호",
    학과: "컴퓨터공학과",
    모집인원: 2,
    지원자수: 5,
    연구분야: "알고리즘, 최적화, 그래프 이론",
  },
  {
    id: 2,
    연구실명: "인공지능 연구실",
    지도교수: "김영수",
    학과: "컴퓨터공학과",
    모집인원: 3,
    지원자수: 8,
    연구분야: "머신러닝, 딥러닝, 자연어처리",
  },
  {
    id: 3,
    연구실명: "소프트웨어공학 연구실",
    지도교수: "이민지",
    학과: "컴퓨터공학과",
    모집인원: 2,
    지원자수: 3,
    연구분야: "소프트웨어 테스팅, 유지보수",
  },
];

// 연구실 목록 조회
export const getAvailableLabs = async (): Promise<ApiLabInfo[]> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/undergrad-apply/labs`);
  // return response.json();

  // 더미 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 300));
  return DUMMY_LABS;
};

// 신청서 제출
export const submitApplication = async (
  _data: Record<string, unknown>
): Promise<{ success: boolean; message: string; applicationId?: number }> => {
  // 실제 API 호출
  // const API_BASE_URL = "/api";
  // const response = await fetch(`${API_BASE_URL}/undergrad-apply/submit`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(_data),
  // });
  // return response.json();

  // 더미 응답
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: "학부연구생 신청이 완료되었습니다!",
    applicationId: Math.floor(Math.random() * 10000),
  };
};

// 나의 신청 내역 조회
export const getMyApplications = async (): Promise<ApiApplicationForm[]> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/undergrad-apply/my-applications`);
  // return response.json();

  // 더미 데이터
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [];
};
