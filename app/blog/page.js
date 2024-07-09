'use client'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useEffect, useState, useRef } from 'react';


const BlogPage = () => {  
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [error, setError] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      if (data.length === 0) {
        setNoMorePosts(true);
      } else {
        setPosts((prevPosts) => {
          const postIds = new Set(prevPosts.map((post) => post.id));
          const newPosts = data.filter((post) => !postIds.has(post.id));
          return [...prevPosts, ...newPosts];
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !noMorePosts && !error) {
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
  }, [loading, noMorePosts, error]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />      
      <h1 className='page-heading'>Blog Page</h1>
      <div className="postsContainer">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2><Link href={`/blog/${post.id}`}>{post.id} - {post.title}</Link></h2>
            <p>{post.body}</p>
          </div>
        ))}
        {loading && <div className="loader">Loading...</div>}
        {!loading && noMorePosts && <div className="noMorePosts">No more posts to load</div>}
        {error && <div className="error">{error}</div>}
        <div ref={loader} className="loader"></div>
      </div>
      {showScroll && (
        <button className="scrollTop" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
}

export default BlogPage;
