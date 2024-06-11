/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as apiClient from '../api-client';

interface NoticeType {
  _id: string;
  title: string;
  date: string;
  content: string;
}

const AdminNotice: React.FC = () => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredNotices, setFilteredNotices] = useState<NoticeType[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    filterNotices();
  }, [searchQuery, notices]);

  const fetchNotices = async () => {
    try {
      const data = await apiClient.getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  const filterNotices = () => {
    if (!searchQuery) {
      setFilteredNotices(notices);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = notices.filter(
        notice =>
          notice.title.toLowerCase().includes(lowercasedQuery) ||
          notice.content.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredNotices(filtered);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteNotice(id);
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (error) {
      console.error('Failed to delete notice:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notices</h1>
      <input
        type="text"
        placeholder="Search notices..."
        className="border p-2 mb-4 w-full rounded"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredNotices.map(notice => (
          <div key={notice._id} className="bg-gray-200 p-4 rounded-md shadow-md flex justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
              <p className="text-gray-600 mb-2">{new Date(notice.date).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => handleDelete(notice._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotice;
