"use client";

import { fetchPosts } from "@/components/action/fetchAction";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchPosts();
      setPosts(data);
    }
    getData();
  }, []); // ✅ Empty array ensures it runs only once

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Fetched Posts</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 transition-transform transform hover:scale-105"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  </div>

  );
}
