/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const NoticeList = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [upcomingNotices, setUpcomingNotices] = useState<any[]>([]);
  const [pastNotices, setPastNotices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await apiClient.getAllNotices();
      const today = new Date();
      const upcoming = data.filter((notice: any) => new Date(notice.date) >= today);
      const past = data.filter((notice: any) => new Date(notice.date) < today);
      setNotices(data);
      console.log(notices)
      setUpcomingNotices(upcoming.reverse());
      setPastNotices(past);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notices</h1>
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 mr-2 rounded ${activeTab === "upcoming" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded ${activeTab === "past" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Past
        </button>
      </div>
      <ul>
        {(activeTab === "upcoming" ? upcomingNotices : pastNotices).map((notice) => (
          <li key={notice._id} className="mb-4">
            <Link to={`/notices/${notice._id}`}>
              <h2 className="text-2xl font-semibold">{notice.title}</h2>
              <p className="text-gray-600">{new Date(notice.date).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
