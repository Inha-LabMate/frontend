// 강의진단 결과 React Query Hooks

import { useQuery } from "@tanstack/react-query";
import { getDiagnosisResults, getDiagnosisDetail } from "../api/diagnosis.api";
import {
  adaptDiagnosisResults,
  adaptDiagnosisResult,
} from "../adapters/diagnosis.adapter";

// 강의진단 결과 목록 조회
export const useDiagnosisResults = (params?: {
  year?: string;
  semester?: string;
}) => {
  return useQuery({
    queryKey: ["diagnosisResults", params],
    queryFn: async () => {
      const data = await getDiagnosisResults(params);
      return adaptDiagnosisResults(data);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 강의진단 상세 조회
export const useDiagnosisDetail = (id: number) => {
  return useQuery({
    queryKey: ["diagnosisDetail", id],
    queryFn: async () => {
      const data = await getDiagnosisDetail(id);
      return adaptDiagnosisResult(data);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
