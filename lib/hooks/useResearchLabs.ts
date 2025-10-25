/**
 * Research Labs React Query Hooks
 * API 호출을 위한 커스텀 훅
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { researchLabsApi } from "../api/research-labs.api";
import {
  adaptUndergradLabs,
  adaptGraduateLabs,
  adaptRecommendedLabs,
  adaptResumeStatus,
} from "../adapters/research-labs.adapter";

/**
 * 학부연구생 연구실 목록 조회
 */
export const useUndergradLabs = (year?: string) => {
  return useQuery({
    queryKey: ["undergrad-labs", year],
    queryFn: async () => {
      const data = await researchLabsApi.getUndergradLabs(year);
      return adaptUndergradLabs(data);
    },
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  });
};

/**
 * 대학원 연구실 목록 조회
 */
export const useGraduateLabs = (year?: string) => {
  return useQuery({
    queryKey: ["graduate-labs", year],
    queryFn: async () => {
      const data = await researchLabsApi.getGraduateLabs(year);
      return adaptGraduateLabs(data);
    },
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 이력서 등록 여부 확인
 */
export const useResumeStatus = () => {
  return useQuery({
    queryKey: ["resume-status"],
    queryFn: async () => {
      const data = await researchLabsApi.checkResumeStatus();
      return adaptResumeStatus(data);
    },
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * AI 기반 연구실 추천
 */
export const useRecommendedLabs = () => {
  return useMutation({
    mutationFn: async () => {
      const data = await researchLabsApi.getRecommendedLabs();
      return adaptRecommendedLabs(data);
    },
  });
};
