// export const getStaticPaths = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
//     const data = await res.json();

//     cosnt = data.map((item) => {
//         return {
//             params: {
//                 slug: item.toString(),
//             }
//         }
//     })

//     return {
//         path,
//         fallback: false,
//     }
// }

// export const getStaticProps = async (context) => {
//     const id = context.params.slug;
//     const res = await fetch(`https://jsonplaceholder.typicode.com/post/${id}`);
//     const data = await res.json();

//     return {
//         data
//     }
// }
import Navbar from '@/app/components/Navbar';
import React from 'react';

const page = async({params}) => {

    const id = params.slug;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post = null;
    if (res.ok) {
        post = await res.json();
    }

    
    return (
        <div>
            <Navbar />
            <div className="postsContainer">                
                <div className="post">
                    {post ? <><h2>{post.title}</h2>
                    <p>{post.body}</p></> : <h2>Post not fouond</h2>}                        
                </div>                
            </div>
        </div>
    );
}

export default page;