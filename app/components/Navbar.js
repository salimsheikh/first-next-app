import Link from 'next/link';
const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
