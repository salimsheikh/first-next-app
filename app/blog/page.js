'use client'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useEffect, useState, useRef  } from 'react';

const BlogPage = () => {  
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    fetchPosts(page);
    console.log(page)
  }, [page]);

  const fetchPosts = async (page) => {
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
    const data = await res.json();
    setPosts((prevPosts) => {
      const postIds = new Set(prevPosts.map((post) => post.id));
      const newPosts = data.filter((post) => !postIds.has(post.id));
      return [...prevPosts, ...newPosts];
    });
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);

  return (
    <div>
      <Navbar />      
      <h1>Blog Page</h1>
      <div className="postsContainer">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2><Link href={`/blog/${post.id}`}>{post.id} - {post.title}</Link></h2>
            <p>{post.body}</p>
          </div>
        ))}
        {loading  && <div className="loader">Loading...</div>}

        <div ref={loader} className="loader"></div>
        
      </div>
    </div>
  );
}

export default BlogPage;