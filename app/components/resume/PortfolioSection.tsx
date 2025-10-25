"use client";

import { useState } from "react";
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
  const { mutate: deletePortfolio } = useDeletePortfolio();

  const [formData, setFormData] = useState({
    type: "",
    content: "",
    fileUrl: "",
  });

  const handleAdd = () => {
    addPortfolio(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({ type: "", content: "", fileUrl: "" });
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
          <div className="p-6 text-center text-gray-500">
            등록된 포트폴리오가 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  포트폴리오명
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  내용
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  파일첨부
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((portfolio) => (
                <tr key={portfolio.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border">
                    {portfolio.type}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {portfolio.content}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {portfolio.fileUrl ? (
                      <a
                        href={portfolio.fileUrl}
                        className="text-inha-blue hover:underline">
                        파일보기
                      </a>
                    ) : (
                      "-"
                    )}
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
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span> 포트폴리오명
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-start gap-4">
            <label className="w-32 text-sm pt-2">
              <span className="text-red-500">*</span> 수상경력내용
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="flex-1 px-3 py-2 border border-gray-300 rounded resize-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">파일첨부</label>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-50"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap">
                파일찾기
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-red-500 text-white rounded hover:opacity-90 transition-opacity">
            확인
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:opacity-90 transition-opacity">
            닫기
          </button>
        </div>
      </Modal>
    </>
  );
}
