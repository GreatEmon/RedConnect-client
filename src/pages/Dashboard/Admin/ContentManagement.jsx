import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ContentManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // "", "draft", "published"

  useEffect(() => {
    fetchBlogs();
  }, [filterStatus]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/blogs", {
        params: filterStatus ? { status: filterStatus } : {},
      });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/admin/blogs/${id}/status`, { status: newStatus });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/admin/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Content Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard/content-management/add-blog")}
        >
          Add Blog
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-white shadow-md rounded-lg">
            {blog.thumbnail && (
              <figure>
                <img src={blog.thumbnail} alt={blog.title} className="h-40 w-full object-cover rounded-t-lg" />
              </figure>
            )}
            <div className="card-body">
              <h3 className="card-title">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Status: {blog.status}</p>
              <div className="card-actions justify-between">
                {blog.status === "draft" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleStatusChange(blog._id, "published")}
                  >
                    Publish
                  </button>
                )}
                {blog.status === "published" && (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleStatusChange(blog._id, "draft")}
                  >
                    Unpublish
                  </button>
                )}
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
