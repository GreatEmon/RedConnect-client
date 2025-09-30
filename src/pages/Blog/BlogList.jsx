import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../../components/Loading';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState()

  useEffect(()=>{
    setLoading(true)
    axios.get("http://localhost:3000/api/blogs").
    then(res =>{
      setBlogs(res.data)
      console.log(res.data)
      setLoading(false)
    })
  },[])

  if(loading) return <Loading></Loading>

  return (
    <div className=" min-h-screen py-10 px-4 md:px-10 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Blogs & Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
        {blogs.map((blog) => blog.status === "published" && (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-600">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.slug}</p>
              <p className="text-gray-500 text-sm mt-2">
                By {blog.author.name} | {blog.createdAt}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="mt-4 btn btn-sm btn-primary w-full text-center"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
