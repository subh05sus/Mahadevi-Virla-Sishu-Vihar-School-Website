/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { BlogType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

function PickABlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiClient.getAllBlogs();
      setBlogs(data.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  if (!blogs) {
    return <></>;
  }

  const handleButtonClick = (blog: any) => {
    // Handle the navigation or any other action when a blog is clicked
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div className="mb-12">
      <div className="overflow-x-auto max-w-screen-xl mx-auto ">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl sticky top-0 poppins-semibold">Our Blogs</h1>
          <div className="flex flex-nowrap gap-3 overflow-x-scroll pb-3">
            {blogs.map((blog, index) => (
              <button
                key={index}
                className="flex flex-col text-center content-end items-center p-4 border rounded-md w-full md:w-96"
                style={{ flex: "0 0 auto" }} // Set a fixed width for each button
                onClick={() => handleButtonClick(blog)}
              >
                <img
                  src={blog.thumbnailImageUrl}
                  alt={blog.title}
                  className=" w-full h-2/3 rounded-md object-cover"
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
            <Link
              to="/blogs"
              className="flex flex-col portrait:hidden text-center content-end items-center p-4 justify-center"
              style={{ flex: "0 0 auto", width: "16rem" }} // Set a fixed width for each button
            >
              <div className="w-40 h-40 rounded-full border-gray-400 border-2 bg-gray-200 flex flex-col text-center items-center justify-center">
                <span className="text-2xl font-semibold">View More</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Link
        to="/blogs"
        className="flex flex-col landscape:hidden w-full text-center content-end items-center p-4 justify-center"
        style={{ flex: "0 0 auto"}} // Set a fixed width for each button
      >
        <div className="w-3/5 h-16 rounded-full border-gray-300 border-2 bg-gray-100 flex flex-col text-center items-center justify-center">
          <span className="text-xl font-semibold poppins-semibold">View More</span>
        </div>
      </Link>
    </div>
  );
}

export default PickABlog;
