'use client'
import Navbar from '@/app/components/Navbar';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const id = params.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Check if the post is already cached
        const cachedPost = localStorage.getItem(`post-${id}`);
        if (cachedPost) {
          setPost(JSON.parse(cachedPost));
        } else {
          // Fetch the post from the server if not cached
          const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
          if (res.ok) {
            const data = await res.json();
            setPost(data);
            // Cache the fetched post
            localStorage.setItem(`post-${id}`, JSON.stringify(data));
          } else {
            throw new Error(`Error: ${res.status}`);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="postsContainer">
        <div className="post">
          {loading ? (
            <h2>Loading...</h2>
          ) : post ? (
            <>
              <h2 className="blog-title single-page">{post.title}</h2>
              <p>{post.body}</p>
            </>
          ) : (
            <h2>{error ? error : "Post not found"}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;