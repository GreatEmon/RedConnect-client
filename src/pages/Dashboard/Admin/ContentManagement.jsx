// src/pages/Dashboard/Admin/ContentManagement.jsx
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../context/AuthProvider";

const ContentManagement = ({ userEmail }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const {role, roleLoading} = use(AuthContext)

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/blogs");
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/blogs/${id}`);
        setBlogs(blogs.filter((b) => b._id !== id));
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete blog.", "error");
      }
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "draft" ? "published" : "draft";
      await axios.put(`http://localhost:3000/api/blogs/${id}/status`, { status: newStatus });
      setBlogs(
        blogs.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
      Swal.fire("Success!", `Blog is now ${newStatus}`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update blog status.", "error");
    }
  };

  if (loading) return <Loading />;

  // Filter blogs
  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((b) => b.status === filter);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <button
          onClick={() => navigate("/dashboard/content-management/add-blog")}
          className="btn btn-primary"
        >
          Add Blog
        </button>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered w-full max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Thumbnail</th>
              <th>Status</th>
              <th>Created By</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img src={blog.image} alt="thumb" className="w-20 h-14 object-cover rounded" />
                </td>
                <td>{blog.status}</td>
                <td>{blog.author.email}</td>
                {role === "admin" && <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handlePublishToggle(blog._id, blog.status)}
                  >
                    {blog.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                  
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
