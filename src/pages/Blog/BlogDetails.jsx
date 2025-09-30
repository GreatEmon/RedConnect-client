import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading";

const BlogDetails = () => {
  const { id } = useParams(); // Assuming URL: /blogs/:slug
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`https://red-connect-backend.vercel.app/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <Loading></Loading>
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!blog) return <div className="p-6">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded my-10">
      <h1 className="text-3xl font-bold mb-4">{blog[0].title}</h1>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={blog[0].author.avatar}
          alt={blog[0].author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{blog[0].author.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(blog[0].createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {blog[0].image && (
        <img
          src={blog[0].image}
          alt={blog[0].title}
          className="w-full max-h-96 object-cover mb-6 rounded"
        />
      )}

      <div
        className="blog-content prose prose-red max-w-full"
        dangerouslySetInnerHTML={{ __html: blog[0].content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
