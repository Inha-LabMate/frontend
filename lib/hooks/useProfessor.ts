// 교수 정보 React Query Hooks

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfessorInfo, requestCounseling } from "../api/professor.api";
import { adaptProfessorInfo } from "../adapters/professor.adapter";

// 교수 정보 조회
export const useProfessorInfo = () => {
  return useQuery({
    queryKey: ["professorInfo"],
    queryFn: async () => {
      const data = await getProfessorInfo();
      return adaptProfessorInfo(data);
    },
    staleTime: 1000 * 60 * 10, // 10분
  });
};

// 상담 신청
export const useRequestCounseling = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestCounseling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counselingHistory"] });
    },
  });
};
