/**
 * Resume React Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../api/resume.api";
import { adaptResume } from "../adapters/resume.adapter";
import type {
  ApiLanguage,
  ApiCertificate,
  ApiAward,
  ApiPortfolio,
  ApiCoverLetter,
  ApiBasicInfo,
} from "../api/resume.api";

/**
 * 이력서 전체 조회
 */
export const useResume = () => {
  return useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const data = await resumeApi.getResume();
      return adaptResume(data);
    },
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 기본 정보 수정
 */
export const useUpdateBasicInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApiBasicInfo) => resumeApi.updateBasicInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 언어 능력 추가
 */
export const useAddLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ApiLanguage, "id">) => resumeApi.addLanguage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 언어 능력 삭제
 */
export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resumeApi.deleteLanguage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 자격증 추가
 */
export const useAddCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ApiCertificate, "id">) =>
      resumeApi.addCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 자격증 삭제
 */
export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resumeApi.deleteCertificate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 수상경력 추가
 */
export const useAddAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ApiAward, "id">) => resumeApi.addAward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 수상경력 삭제
 */
export const useDeleteAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resumeApi.deleteAward(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 포트폴리오 추가
 */
export const useAddPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ApiPortfolio, "id">) =>
      resumeApi.addPortfolio(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 포트폴리오 삭제
 */
export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resumeApi.deletePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};

/**
 * 자기소개서 저장
 */
export const useSaveCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApiCoverLetter) => resumeApi.saveCoverLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
};
