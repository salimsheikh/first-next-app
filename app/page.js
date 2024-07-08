import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className='navbar'>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </div>
  );
}

export default Home;