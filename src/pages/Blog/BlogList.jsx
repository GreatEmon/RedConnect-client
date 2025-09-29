import React, { useState } from 'react';
import { Link } from 'react-router';

// Mock blog data
const mockBlogs = [
  {
    id: 1,
    title: 'The Importance of Blood Donation',
    excerpt: 'Blood donation is a vital process that can save lives. Learn why you should donate blood regularly.',
    image: 'https://source.unsplash.com/400x250/?blood,donation',
    author: 'Admin',
    date: '2025-09-28',
  },
  {
    id: 2,
    title: 'How to Become a Donor',
    excerpt: 'Becoming a donor is easier than you think. Follow these steps to register and start helping.',
    image: 'https://source.unsplash.com/400x250/?health,donor',
    author: 'Admin',
    date: '2025-09-25',
  },
];

const BlogList = () => {
  const [blogs] = useState(mockBlogs);

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Blogs & Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-600">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.excerpt}</p>
              <p className="text-gray-500 text-sm mt-2">
                By {blog.author} | {blog.date}
              </p>
              <Link
                to={`/blog/${blog.id}`}
                className="mt-4 inline-block btn btn-sm btn-primary w-full text-center"
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
