"use client";

import { useState } from "react";
import Section from "./Section";
import Modal from "./Modal";
import type { Language } from "../../../lib/adapters/resume.adapter";
import {
  useAddLanguage,
  useDeleteLanguage,
} from "../../../lib/hooks/useResume";

interface Props {
  data: Language[];
}

export default function LanguageSection({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addLanguage } = useAddLanguage();
  const { mutate: _deleteLanguage } = useDeleteLanguage();

  const [formData, setFormData] = useState({
    language: "",
    testName: "",
    score: "",
    level: "",
    acquiredDate: "",
    expiryDate: "",
  });

  const handleAdd = () => {
    addLanguage(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({
          language: "",
          testName: "",
          score: "",
          level: "",
          acquiredDate: "",
          expiryDate: "",
        });
      },
    });
  };

  return (
    <>
      <Section title="언어 능력" icon="▶" onAdd={() => setIsModalOpen(true)}>
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            등록된 언어 능력이 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  외국어
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  구사능력
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  시험명
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  점수
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  등급
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  취득일자
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">
                  파생일부
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((lang) => (
                <tr key={lang.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border">
                    {lang.language}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {lang.testName}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {lang.testName}
                  </td>
                  <td className="px-4 py-2 text-center border">{lang.score}</td>
                  <td className="px-4 py-2 text-center border">{lang.level}</td>
                  <td className="px-4 py-2 text-center border">
                    {lang.acquiredDate}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {lang.expiryDate}
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
        title="언어능력">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span> 외국어명
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span> 구사능력
            </label>
            <div className="flex-1 space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="level" value="native" />
                <span className="text-sm">시(영)원어 자(민)어(상)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="level" value="advanced" />
                <span className="text-sm">
                  중(전)문수 자(민)어(보 기,가,능 입,상) 문분 두확
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="level" value="basic" />
                <span className="text-sm">미(영)언어 아(민)어 능 월기2)</span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span> 공인시험
            </label>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="점"
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="급"
                className="px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span> 취득일자
            </label>
            <input
              type="date"
              value={formData.acquiredDate}
              onChange={(e) =>
                setFormData({ ...formData, acquiredDate: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">파생일부</label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
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
