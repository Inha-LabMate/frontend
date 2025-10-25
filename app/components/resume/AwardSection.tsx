"use client";

import { useState } from "react";
import Section from "./Section";
import Modal from "./Modal";
import type { Award } from "../../../lib/adapters/resume.adapter";
import { useAddAward, useDeleteAward } from "../../../lib/hooks/useResume";

interface Props {
  data: Award[];
}

export default function AwardSection({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addAward } = useAddAward();
  const { mutate: _deleteAward } = useDeleteAward();

  const [formData, setFormData] = useState({
    content: "",
    date: "",
    fileUrl: "",
  });

  const handleAdd = () => {
    addAward(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({ content: "", date: "", fileUrl: "" });
      },
    });
  };

  return (
    <>
      <Section title="수상경력" icon="▶" onAdd={() => setIsModalOpen(true)}>
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            등록된 수상경력이 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  수상경력내용
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  수상일자
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  파일첨부
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((award) => (
                <tr key={award.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border">
                    {award.content}
                  </td>
                  <td className="px-4 py-2 text-center border">{award.date}</td>
                  <td className="px-4 py-2 text-center border">
                    {award.fileUrl ? (
                      <a
                        href={award.fileUrl}
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
        title="수상경력">
        <div className="space-y-4">
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
