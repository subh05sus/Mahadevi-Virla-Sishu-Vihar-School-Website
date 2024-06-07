/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const SearchAndDeleteBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]); // Update blogs when currentPage changes

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteBlog(id);
      // Remove the deleted blog from the list
      setBlogs(blogs.filter((blog: { _id: string }) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) => {
    const { title, author } = blog;
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(lowerSearchQuery) ||
      author.toLowerCase().includes(lowerSearchQuery)
    );
  });

  // Calculate pagination values
  const blogsPerPage = 9;
  const offset = currentPage * blogsPerPage;
  const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Blogs</h2>
        <div className="flex 2xl:flex-nowrap portrait:flex-wrap my-2 gap-2">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or author..."
        className="border p-2 rounded-md h-full w-full"
        />
        <Link to='/create-blog' className="p-2 rounded-md bg-black text-white min-w-fit">Create Blog</Link>
        </div>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-4 portrait:grid-cols-1 ">
        {filteredBlogs
          .slice(offset, offset + blogsPerPage) // Display blogs for the current page
          .map((blog) => (
            <div
              key={blog._id}
              className="border rounded-md p-4 flex flex-col items-center w-full"

              >
              <img
                src={blog.thumbnailImageUrl}
                alt={blog.title}
                className="w-full h-auto rounded-md mb-2"
                style={{ aspectRatio: "4/3", width: "100%", height: "auto", maxWidth: "100%" }}
              />
              <span className="font-bold text-lg mb-2">{blog.title}</span>
              <span className="text-sm">{blog.author}</span>
              <button
                onClick={() => handleDelete(blog._id)}
                className="p-2 mt-2 rounded-md bg-red-400 text-white w-full"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      {/* Pagination */}
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
  );
};

export default SearchAndDeleteBlogs;
