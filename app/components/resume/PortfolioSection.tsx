"use client";
import { useTranslation } from "i18nexus";

import { useState, useRef } from "react";
import Section from "./Section";
import Modal from "./Modal";
import type { Portfolio } from "../../../lib/adapters/resume.adapter";
import {
  useAddPortfolio,
  useDeletePortfolio,
} from "../../../lib/hooks/useResume";

interface Props {
  data: Portfolio[];
}

export default function PortfolioSection({ data }: Props) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addPortfolio } = useAddPortfolio();
  const { mutate: _deletePortfolio } = useDeletePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    type: "",
    content: "",
    fileUrl: "",
    fileName: "",
    sourceType: "pdf" as "pdf" | "notion",
  });

  const [isExtracting, setIsExtracting] = useState(false);

  // PDF 텍스트 추출 함수 (실제 PDF.js 사용)
  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;

          // PDF.js 동적 import
          const pdfjsLib = await import("pdfjs-dist");

          // Worker 설정 - HTTPS 명시적으로 사용
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

          // PDF 로드
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

          let fullText = t(
            "[PDF에서 추출된 텍스트]\\n\\n파일명: {{file_name}}\\n페이지 수: {{pdf_numPages}}페이지\\n\\n",
            { file_name: file.name, pdf_numPages: pdf.numPages }
          );
          fullText += "=".repeat(50) + "\n\n";

          // 모든 페이지에서 텍스트 추출
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => ("str" in item ? item.str : ""))
              .join(" ");

            if (pageText.trim()) {
              fullText += t("\\n[페이지 {{i}}]\\n{{pageText}}\\n", {
                i: i,
                pageText: pageText,
              });
            }
          }

          fullText += "\n" + "=".repeat(50);

          resolve(fullText);
        } catch (error) {
          console.error(t("PDF 파싱 오류:"), error);
          reject(new Error(t("PDF 텍스트 추출에 실패했습니다.")));
        }
      };

      reader.onerror = () => {
        reject(new Error(t("파일을 읽는 중 오류가 발생했습니다.")));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // 노션 링크에서 텍스트 추출 (실제 API 호출)
  const extractTextFromNotion = async (notionUrl: string): Promise<string> => {
    try {
      const response = await fetch("/api/extract-notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notionUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t("노션 텍스트 추출에 실패했습니다."));
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error(t("노션 API 호출 오류:"), error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert(t("PDF 파일만 업로드 가능합니다."));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(t("파일 크기는 10MB 이하여야 합니다."));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsExtracting(true);
    try {
      const extractedText = await extractTextFromPDF(file);
      setFormData({
        ...formData,
        content: extractedText,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        sourceType: "pdf",
      });
      alert(t("✅ PDF에서 텍스트를 성공적으로 추출했습니다!"));
    } catch (error) {
      console.error(t("PDF 텍스트 추출 실패:"), error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("PDF 텍스트 추출에 실패했습니다.");
      alert(`❌ ${errorMessage}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const handleNotionLinkExtract = async () => {
    if (!formData.fileUrl) {
      alert(t("노션 링크를 입력해주세요."));
      return;
    }

    if (!formData.fileUrl.includes("notion.")) {
      alert(t("올바른 노션 링크를 입력해주세요.\n예시: https://notion.so/..."));
      return;
    }

    setIsExtracting(true);
    try {
      const extractedText = await extractTextFromNotion(formData.fileUrl);
      setFormData({
        ...formData,
        content: extractedText,
        sourceType: "notion",
      });
      alert(t("✅ 노션 페이지에서 텍스트를 성공적으로 추출했습니다!"));
    } catch (error) {
      console.error(t("노션 텍스트 추출 실패:"), error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("노션 텍스트 추출에 실패했습니다.");
      alert(
        t(
          "❌ {{errorMessage}}\\n\\n💡 노션 페이지가 공개 설정되어 있는지 확인해주세요.",
          { errorMessage: errorMessage }
        )
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAdd = () => {
    if (!formData.type || !formData.content) {
      alert(t("필수 항목을 모두 입력해주세요."));
      return;
    }

    addPortfolio(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({
          type: "",
          content: "",
          fileUrl: "",
          fileName: "",
          sourceType: "pdf",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <>
      <Section
        title={t("기타정부파일(포트폴리오)")}
        icon="▶"
        onAdd={() => setIsModalOpen(true)}>
        {data.length === 0 ? (
          <div className="p-6 text-center text-black">
            {t("등록된 포트폴리오가 없습니다.")}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  {t("포트폴리오명")}
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  {t("내용 미리보기")}
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  {t("파일/링크")}
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  {t("소스 타입")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((portfolio) => (
                <tr key={portfolio.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center text-black border font-medium">
                    {portfolio.type}
                  </td>
                  <td className="px-4 py-2 text-left text-black border text-sm">
                    <div className="max-w-md truncate">
                      {portfolio.content.substring(0, 100)}
                      {portfolio.content.length > 100 ? "..." : ""}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center text-black border">
                    {portfolio.fileUrl ? (
                      <a
                        href={portfolio.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-inha-blue hover:underline inline-flex items-center gap-1">
                        {portfolio.fileUrl.includes("notion") ? "🔗" : "📄"}
                        {t("보기")}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        portfolio.fileUrl?.includes("notion")
                          ? "bg-gray-100 text-gray-700"
                          : portfolio.fileUrl?.includes("blob:")
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                      {portfolio.fileUrl?.includes("notion")
                        ? t("노션")
                        : portfolio.fileUrl
                        ? "PDF"
                        : t("직접입력")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("기타정부파일(포트폴리오)")}>
        <div className="space-y-6">
          {/* 포트폴리오명 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-black">
              <span className="text-red-500">*</span>
              {t("포트폴리오명")}
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              placeholder={t("프로젝트명 또는 포트폴리오 제목")}
            />
          </div>

          {/* PDF 업로드 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-black">{t("PDF 파일")}</label>
            <div className="flex-1 flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-file-input"
              />

              <input
                type="text"
                readOnly
                value={formData.fileName}
                placeholder={t("선택된 파일 없음")}
                className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-50 text-black text-sm"
              />

              <label
                htmlFor="pdf-file-input"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer text-sm font-medium">
                {t("파일찾기")}
              </label>
            </div>
          </div>

          {/* 노션 링크 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-black">{t("노션 링크")}</label>
            <div className="flex-1 flex gap-2">
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                placeholder="https://notion.so/..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-black text-sm focus:ring-2 focus:ring-inha-blue focus:border-transparent"
              />

              <button
                onClick={handleNotionLinkExtract}
                disabled={isExtracting || !formData.fileUrl}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {t("텍스트 추출")}
              </button>
            </div>
          </div>

          {/* 추출 상태 표시 */}
          {isExtracting && (
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="flex-1 bg-blue-50 border border-blue-200 rounded p-3 flex items-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-inha-blue"></div>
                <span className="text-sm text-gray-700">
                  {t("텍스트를 추출하고 있습니다...")}
                </span>
              </div>
            </div>
          )}

          {/* 포트폴리오 내용 */}
          <div className="flex items-start gap-4">
            <label className="w-32 text-sm pt-2 text-black">
              <span className="text-red-500">*</span>
              {t("포트폴리오 내용")}
            </label>
            <div className="flex-1">
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none text-black bg-white text-sm focus:ring-2 focus:ring-inha-blue focus:border-transparent"
                placeholder={t(
                  "PDF 업로드 또는 노션 링크에서 자동으로 추출되거나, 직접 입력할 수 있습니다."
                )}
              />

              <div className="text-xs text-gray-500 mt-1">
                {formData.content.length}
                {t("자")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handleAdd}
            disabled={isExtracting}
            className="px-6 py-2 bg-red-500 text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {t("확인")}
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setFormData({
                type: "",
                content: "",
                fileUrl: "",
                fileName: "",
                sourceType: "pdf",
              });
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:opacity-90 transition-opacity">
            {t("닫기")}
          </button>
        </div>
      </Modal>
    </>
  );
}
