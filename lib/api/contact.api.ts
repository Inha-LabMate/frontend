// 대학원 컨택 API
// URL만 수정하면 실제 API와 연동 가능

const API_BASE_URL = "/api"; // 실제 API URL로 변경 가능

export interface ApiContactLab {
  [key: string]: string | number | boolean;
}

export interface ApiContactRecord {
  [key: string]: string | number | boolean;
}

// 더미 데이터 (실제로는 API에서 받아옴)
const DUMMY_LABS: ApiContactLab[] = [
  {
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "인공지능공학",
    연구실명: "금융 인공지능 연구실",
    지도교수: "김동국",
    컨택가능: true,
  },
  {
    지원학기: "20261",
    개설학과: "컴퓨터공학과",
    세부전공: "소프트웨어공학",
    연구실명: "분산시스템 연구실",
    지도교수: "이영희",
    컨택가능: true,
  },
  {
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "컴퓨터비전",
    연구실명: "영상처리 연구실",
    지도교수: "박철수",
    컨택가능: true,
  },
  {
    지원학기: "20261",
    개설학과: "컴퓨터공학과",
    세부전공: "데이터사이언스",
    연구실명: "빅데이터 분석 연구실",
    지도교수: "정민수",
    컨택가능: true,
  },
  {
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "네트워크보안",
    연구실명: "사이버보안 연구실",
    지도교수: "강준호",
    컨택가능: false,
  },
];

const DUMMY_CONTACTS: ApiContactRecord[] = [
  {
    id: 1,
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "인공지능공학",
    연구실명: "금융 인공지능 연구실",
    지도교수: "김동국",
    컨택신청: "완료",
    신청일자: "2024-10-15",
    이력서연동: true,
    자기소개서연동: true,
    내용: "안녕하세요. 귀 연구실의 금융 AI 연구에 관심이 많아 지원하고자 합니다.",
  },
  {
    id: 2,
    지원학기: "20261",
    개설학과: "컴퓨터공학과",
    세부전공: "소프트웨어공학",
    연구실명: "분산시스템 연구실",
    지도교수: "이영희",
    컨택신청: "대기",
    신청일자: "2024-10-20",
    이력서연동: true,
    자기소개서연동: false,
    내용: "분산 시스템과 클라우드 컴퓨팅에 관심이 있어 지원합니다.",
  },
  {
    id: 3,
    지원학기: "20261",
    개설학과: "전기컴퓨터공학과",
    세부전공: "컴퓨터비전",
    연구실명: "영상처리 연구실",
    지도교수: "박철수",
    컨택신청: "완료",
    신청일자: "2024-10-18",
    이력서연동: true,
    자기소개서연동: true,
    내용: "컴퓨터 비전과 딥러닝을 활용한 연구를 하고 싶습니다.",
  },
];

// 연구실 조회
export const getGraduateLabsForContact = async (params?: {
  category?: string;
  semester?: string;
  keyword?: string;
}): Promise<ApiContactLab[]> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/graduate/labs?category=${params?.category}&semester=${params?.semester}&keyword=${params?.keyword}`);
  // return response.json();

  // 더미 데이터 반환 (필터링 로직 추가 가능)
  await new Promise((resolve) => setTimeout(resolve, 300)); // API 호출 시뮬레이션

  let filtered = [...DUMMY_LABS];

  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (lab) =>
        String(lab.연구실명).toLowerCase().includes(keyword) ||
        String(lab.지도교수).toLowerCase().includes(keyword) ||
        String(lab.개설학과).toLowerCase().includes(keyword)
    );
  }

  return filtered;
};

// 컨택 내역 조회
export const getContactRecords = async (params?: {
  semester?: string;
  department?: string;
  status?: string;
}): Promise<ApiContactRecord[]> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/contact/records?semester=${params?.semester}&department=${params?.department}&status=${params?.status}`);
  // return response.json();

  // 더미 데이터 반환 (필터링 로직)
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...DUMMY_CONTACTS];

  if (params?.semester && params.semester !== "전체") {
    filtered = filtered.filter((c) => c.지원학기 === params.semester);
  }

  if (params?.department && params.department !== "전체") {
    filtered = filtered.filter((c) => c.개설학과 === params.department);
  }

  if (params?.status && params.status !== "전체") {
    filtered = filtered.filter((c) => c.컨택신청 === params.status);
  }

  return filtered;
};

// 컨택 신청
export const submitContact = async (
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string }> => {
  // 실제 API 호출
  // const response = await fetch(`${API_BASE_URL}/contact/submit`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // 더미 응답
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, message: "컨택 신청이 완료되었습니다." };
};
