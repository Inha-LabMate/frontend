// 대학원 컨택 관련 React Query Hooks

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGraduateLabsForContact,
  getContactRecords,
  submitContact,
} from "../api/contact.api";
import {
  adaptContactLabs,
  adaptContactRecords,
} from "../adapters/contact.adapter";

// 연구실 조회
export const useContactLabs = (params?: {
  category?: string;
  semester?: string;
  keyword?: string;
}) => {
  return useQuery({
    queryKey: ["contactLabs", params],
    queryFn: async () => {
      const data = await getGraduateLabsForContact(params);
      return adaptContactLabs(data);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 컨택 내역 조회
export const useContactRecords = (params?: {
  semester?: string;
  department?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["contactRecords", params],
    queryFn: async () => {
      const data = await getContactRecords(params);
      return adaptContactRecords(data);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 컨택 신청
export const useSubmitContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      // 컨택 내역 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["contactRecords"] });
    },
  });
};
