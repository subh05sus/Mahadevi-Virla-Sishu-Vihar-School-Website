/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

function NoticeHome() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await apiClient.getAllNotices();
      setNotices(data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  if (!notices) {
    return <></>;
  }

  const handleButtonClick = (notice: any) => {
    navigate(`/notices/${notice._id}`);
  };

  return (
    <div className="mb-12">
      <div className="overflow-x-auto max-w-screen-xl mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl sticky top-0 text-center">Noticeboard</h1>
          <div className="flex flex-nowrap gap-3 overflow-x-scroll portrait:flex-col pb-3">
            {notices.map((notice, index) => (
              <button
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg w-full  lg:w-96 bg-gray-200"
                onClick={() => handleButtonClick(notice)}
              >
                <div className="grid justify-between mb-2">
                  <span className="font-bold text-2xl">{new Date(notice.date).getDate()}</span>
                    <span className="block font-semibold text-xl">{new Date(notice.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                </div>
                <div className=" w-0.5 bg-slate-600 h-20"/>
                <span className="font-semibold text-xl">{notice.title}</span>
              </button>
            ))}
            <Link
              to="/notices"
              className="flex flex-col portrait:hidden text-center content-end items-center p-4 justify-center"
              style={{ flex: "0 0 auto", width: "16rem" }}
            >
              <div className="w-40 h-20 rounded-full border-gray-400 border-2 bg-gray-200 flex flex-col text-center items-center justify-center">
                <span className="text-xl font-semibold">View More</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Link
        to="/notices"
        className="flex flex-col landscape:hidden w-full text-center content-end items-center p-4 justify-center"
        style={{ flex: "0 0 auto" }}
      >
        <div className="w-3/5 h-16 rounded-full border-gray-300 border-2 bg-gray-100 flex flex-col text-center items-center justify-center">
          <span className="text-xl font-semibold">View More</span>
        </div>
      </Link>
    </div>
  );
}

export default NoticeHome;
