/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const NoticeList = () => {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await apiClient.getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notices</h1>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id} className="mb-4">
            <Link to={`/notices/${notice._id}`}>
              <h2 className="text-2xl font-semibold">{notice.title}</h2>
              <p className="text-gray-600">{notice.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
