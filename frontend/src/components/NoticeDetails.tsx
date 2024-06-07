/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

const NoticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<any>(null);

  useEffect(() => {
    fetchNoticeDetails();
  }, []);

  const fetchNoticeDetails = async () => {
    try {
      const data = await apiClient.getNoticeById(id || '');
      setNotice(data);
    } catch (error) {
      console.error("Failed to fetch notice details:", error);
    }
  };

  if (!notice) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
      <p className="text-lg font-semibold">Date: {notice.date}</p>
      <p className="mt-4">{notice.content}</p>
    </div>
  );
};

export default NoticeDetails;
