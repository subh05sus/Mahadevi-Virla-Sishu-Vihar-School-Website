/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import AdminNotice from "./AdminNotice";

const CreateNotice = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await apiClient.createNotice({ title, date, content });
      navigate("/notices");
    } catch (error) {
      console.error("Failed to create notice:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Notice</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-lg font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-3 py-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-semibold">
            Content
          </label>
          <textarea
            id="content"
            className="w-full px-3 py-2 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Notice
        </button>
      </form>
      <AdminNotice/>
    </div>
  );
};

export default CreateNotice;
