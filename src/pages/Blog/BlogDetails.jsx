import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        navigate("/"); // Redirect if blog not found
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      <div className="mt-6 text-gray-500 text-sm">
        <p>
          Status: <span className="font-semibold">{blog.status}</span>
        </p>
        <p>
          Created At:{" "}
          <span className="font-semibold">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
