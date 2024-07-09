import Link from 'next/link';
import React from 'react';
import Navbar from './components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className='page-heading'>Home Page</h1>
    </div>
  );
}

export default Home;
