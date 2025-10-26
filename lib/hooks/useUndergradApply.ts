// 학부연구생 신청 React Query Hooks

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAvailableLabs,
  submitApplication,
  getMyApplications,
} from "../api/undergrad-apply.api";
import { adaptLabInfos } from "../adapters/undergrad-apply.adapter";

// 신청 가능한 연구실 목록 조회
export const useAvailableLabs = () => {
  return useQuery({
    queryKey: ["availableLabs"],
    queryFn: async () => {
      const data = await getAvailableLabs();
      return adaptLabInfos(data);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 신청서 제출
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      // 나의 신청 내역 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
};

// 나의 신청 내역 조회
export const useMyApplications = () => {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: getMyApplications,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
