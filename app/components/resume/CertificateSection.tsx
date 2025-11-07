"use client";import { useTranslation } from "i18nexus";

import { useState } from "react";
import Section from "./Section";
import Modal from "./Modal";
import type { Certificate } from "../../../lib/adapters/resume.adapter";
import {
  useAddCertificate,
  useDeleteCertificate } from
"../../../lib/hooks/useResume";

interface Props {
  data: Certificate[];
}

export default function CertificateSection({ data }: Props) {const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addCertificate } = useAddCertificate();
  const { mutate: _deleteCertificate } = useDeleteCertificate();

  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    acquiredDate: "",
    fileUrl: ""
  });

  const handleAdd = () => {
    addCertificate(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({ name: "", issuer: "", acquiredDate: "", fileUrl: "" });
      }
    });
  };

  return (
    <>
      <Section title={t("자격증")} icon="/play-circle.svg" onAdd={() => setIsModalOpen(true)}>
        {data.length === 0 ?
        <div className="p-6 text-center text-gray-500">{t("등록된 자격증이 없습니다.")}

        </div> :

        <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium border">{t("자격증명")}

              </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">{t("발급처")}

              </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">{t("취득일자")}

              </th>
                <th className="px-4 py-2 text-center text-sm font-medium border">{t("파일첨부")}

              </th>
              </tr>
            </thead>
            <tbody>
              {data.map((cert) =>
            <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border">{cert.name}</td>
                  <td className="px-4 py-2 text-center border">
                    {cert.issuer}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {cert.acquiredDate}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {cert.fileUrl ?
                <a
                  href={cert.fileUrl}
                  className="text-inha-blue hover:underline">{t("파일보기")}

                </a> :

                "-"
                }
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        }
      </Section>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("자격증")}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span>{t("자격증명")}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded" />

          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span>{t("발급처")}
            </label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) =>
              setFormData({ ...formData, issuer: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded" />

          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">
              <span className="text-red-500">*</span>{t("취득일자")}
            </label>
            <input
              type="date"
              value={formData.acquiredDate}
              onChange={(e) =>
              setFormData({ ...formData, acquiredDate: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded" />

          </div>
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm">{t("파일첨부")}</label>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-50" />

              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors whitespace-nowrap">{t("파일찾기")}

              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-red-500 text-white rounded hover:opacity-90 transition-opacity">{t("확인")}

          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:opacity-90 transition-opacity">{t("닫기")}

          </button>
        </div>
      </Modal>
    </>);

}