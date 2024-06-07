/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>() 
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const data = await apiClient.getBlogById(id|| '');
      setBlog(data);
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
    }
  };

  if (!blog) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.thumbnailImageUrl} alt={blog.title} className="rounded-lg mb-4" />
      <p className="text-lg font-semibold">Author: {blog.author}</p>
      <p className="text-lg font-semibold">Publish Date: {blog.publishDate}</p>
      <p className="mt-4">{blog.content}</p>
    </div>
  );
};

export default BlogDetailsPage;
