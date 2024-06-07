import React, { useState } from "react";
import * as apiClient from '../api-client';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnailImage: null as File | null,
    content: "",
    author: "",
    publishDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.thumbnailImage || !formData.content || !formData.author || !formData.publishDate) {
      alert("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("thumbnailImage", formData.thumbnailImage);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("publishDate", formData.publishDate);

    try {
      const response = await apiClient.createBlog(formDataToSend);
      console.log("Blog added successfully:", response);
      alert("Blog added successfully");
    } catch (error) {
      console.error("Failed to add blog:", error);
      alert("Failed to add blog. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnailImage: file });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 p-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnailImage" className="block font-medium text-gray-700">Thumbnail Image:</label>
          <input
            type="file"
            id="thumbnailImage"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="mt-1 block w-full border-gray-300 p-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 p-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-medium text-gray-700">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 p-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishDate" className="block font-medium text-gray-700">Publish Date:</label>
          <input
            type="date"
            id="publishDate"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 p-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="block bg-black text-white py-2 px-4 rounded-md">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
