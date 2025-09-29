import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import  JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_imgbb_apikey; // replace with your key

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setThumbnail(res.data.data.url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) return alert("All fields are required");

    const author = {
        name :user.displayName,
        email : user.email,
        avatar : user.photoURL
    }

    const newBlog = {
      title,
      thumbnail,
      content,
      author : author,
      status: "draft", // default draft
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/blogs", newBlog);
      Swal.fire("Success", "Blog created successfully!", "success");
      navigate("/dashboard/content-management");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create blog", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full"
          required
        />
        {thumbnail && (
          <img src={thumbnail} alt="thumbnail preview" className="w-40 h-40 object-cover rounded-md" />
        )}

        <JoditEditor value={content} onChange={(newContent) => setContent(newContent)} />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
