"use client";

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
          const pdfjsLib = await import('pdfjs-dist');
          
          // Worker 설정
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
          
          // PDF 로드
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          
          let fullText = `[PDF에서 추출된 텍스트]\n\n파일명: ${file.name}\n페이지 수: ${pdf.numPages}페이지\n\n`;
          fullText += "=" .repeat(50) + "\n\n";
          
          // 모든 페이지에서 텍스트 추출
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => ('str' in item ? item.str : ''))
              .join(' ');
            
            if (pageText.trim()) {
              fullText += `\n[페이지 ${i}]\n${pageText}\n`;
            }
          }
          
          fullText += "\n" + "=".repeat(50);
          
          resolve(fullText);
        } catch (error) {
          console.error('PDF 파싱 오류:', error);
          reject(new Error('PDF 텍스트 추출에 실패했습니다.'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  // 노션 링크에서 텍스트 추출 (실제 API 호출)
  const extractTextFromNotion = async (notionUrl: string): Promise<string> => {
    try {
      const response = await fetch('/api/extract-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notionUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '노션 텍스트 추출에 실패했습니다.');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('노션 API 호출 오류:', error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드 가능합니다.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
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
      alert("✅ PDF에서 텍스트를 성공적으로 추출했습니다!");
    } catch (error) {
      console.error("PDF 텍스트 추출 실패:", error);
      const errorMessage = error instanceof Error ? error.message : "PDF 텍스트 추출에 실패했습니다.";
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
      alert("노션 링크를 입력해주세요.");
      return;
    }

    if (!formData.fileUrl.includes("notion.")) {
      alert("올바른 노션 링크를 입력해주세요.\n예시: https://notion.so/...");
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
      alert("✅ 노션 페이지에서 텍스트를 성공적으로 추출했습니다!");
    } catch (error) {
      console.error("노션 텍스트 추출 실패:", error);
      const errorMessage = error instanceof Error ? error.message : "노션 텍스트 추출에 실패했습니다.";
      alert(`❌ ${errorMessage}\n\n💡 노션 페이지가 공개 설정되어 있는지 확인해주세요.`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAdd = () => {
    if (!formData.type || !formData.content) {
      alert("필수 항목을 모두 입력해주세요.");
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
        title="기타정부파일(포트폴리오)"
        icon="▶"
        onAdd={() => setIsModalOpen(true)}>
        {data.length === 0 ? (
          <div className="p-6 text-center text-black">
            등록된 포트폴리오가 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  포트폴리오명
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  내용 미리보기
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  파일/링크
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-black border">
                  소스 타입
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
                        {portfolio.fileUrl.includes("notion") ? "🔗" : "📄"} 보기
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
                        ? "노션"
                        : portfolio.fileUrl
                        ? "PDF"
                        : "직접입력"}
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
        title="기타정부파일(포트폴리오)">
        <div className="space-y-6">
          {/* 포트폴리오명 */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-black">
              <span className="text-red-500">*</span> 포트폴리오명
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-black bg-white"
              placeholder="프로젝트명 또는 포트폴리오 제목"
            />
          </div>

          {/* 파일 소스 선택 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-black">
                포트폴리오 추가 방법 선택
              </div>
              <div className="text-xs text-gray-500">
                자동으로 텍스트가 추출됩니다
              </div>
            </div>
            
            {/* PDF 업로드 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id="pdf-upload"
                  name="source-type"
                  checked={formData.sourceType === "pdf"}
                  onChange={() =>
                    setFormData({ ...formData, sourceType: "pdf" })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="pdf-upload" className="text-sm font-medium text-black">
                  📄 PDF 파일 업로드
                </label>
              </div>
              {formData.sourceType === "pdf" && (
                <div className="ml-6 flex items-center gap-2">
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
                    placeholder="선택된 파일 없음"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-black text-sm"
                  />
                  <label
                    htmlFor="pdf-file-input"
                    className="px-4 py-2 bg-inha-blue text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer text-sm font-medium">
                    파일 선택
                  </label>
                </div>
              )}
            </div>

            {/* 노션 링크 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id="notion-link"
                  name="source-type"
                  checked={formData.sourceType === "notion"}
                  onChange={() =>
                    setFormData({ ...formData, sourceType: "notion" })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="notion-link" className="text-sm font-medium text-black">
                  🔗 노션 페이지 링크
                </label>
                <span className="text-xs text-gray-500">(공개된 페이지만 가능)</span>
              </div>
              {formData.sourceType === "notion" && (
                <div className="ml-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.fileUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, fileUrl: e.target.value })
                      }
                      placeholder="https://notion.so/..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-black text-sm"
                    />
                    <button
                      onClick={handleNotionLinkExtract}
                      disabled={isExtracting || !formData.fileUrl}
                      className="px-4 py-2 bg-inha-blue text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                      {isExtracting ? "추출 중..." : "텍스트 추출"}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                    💡 노션 페이지 공유 방법: 페이지 우측 상단 &quot;공유&quot; → &quot;웹에 게시&quot; 클릭 후 링크 복사
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 추출 상태 표시 */}
          {isExtracting && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-inha-blue"></div>
              <span className="text-sm text-black">
                {formData.sourceType === "pdf"
                  ? "PDF에서 텍스트를 추출하고 있습니다..."
                  : "노션 페이지에서 텍스트를 추출하고 있습니다..."}
              </span>
            </div>
          )}

          {/* 포트폴리오 내용 */}
          <div className="flex items-start gap-4">
            <label className="w-32 text-sm pt-2 text-black">
              <span className="text-red-500">*</span> 포트폴리오 내용
            </label>
            <div className="flex-1">
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none text-black bg-white text-sm"
                placeholder="PDF 업로드 또는 노션 링크에서 자동으로 추출되거나, 직접 입력할 수 있습니다."
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.content.length} / 5000자
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handleAdd}
            disabled={isExtracting}
            className="px-6 py-2 bg-inha-blue text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            확인
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
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
            닫기
          </button>
        </div>
      </Modal>
    </>
  );
}
