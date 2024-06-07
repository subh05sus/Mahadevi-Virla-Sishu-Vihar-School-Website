/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import * as apiClient from '../api-client';
import { BlogType } from "../../../backend/src/shared/types";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
    const navigate = useNavigate();

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      const data = await apiClient.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const blogsPerPage = 9;
  const offset = currentPage * blogsPerPage;
  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

    function handleButtonClick(blog: any): void {
        navigate(`/blogs/${blog._id}`)
    }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-3 portrait:grid-cols-1 gap-6">
        {blogs.slice(offset, offset + blogsPerPage).map((blog, index) => (
          <button
            key={index}
            className="flex flex-col text-center content-end items-center p-4 border rounded-md"
            style={{ flex: "0 0 auto", width: "auto" }}
            onClick={() => handleButtonClick(blog)}
          >
            <img
              src={blog.thumbnailImageUrl}
              alt={blog.title}
              className="w-64 h-48 rounded-md"
            />
            <span className="font-semibold text-semibold text-2xl mt-3">
              {blog.title}
            </span>
            <div>
              <span className="font-semibold text-gray-500 text-semibold text-base mt-1/2">
                {blog.author} - {blog.publishDate}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex items-center space-x-4 text-red-600"}
          activeClassName={"active"}
          previousClassName={"px-3 py-1 border border-gray-950 rounded"}
          nextClassName={"px-3 py-1 border border-gray-950 rounded"}
          breakClassName={"px-3 py-1 border border-gray-950 rounded"}
          pageClassName={"px-3 py-1 bg-red-100 rounded"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          disabledClassName={"text-gray-500 pointer-events-none"}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
