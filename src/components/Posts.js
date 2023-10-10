import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Masonry from 'react-masonry-css';


const Posts = () => {
  const {getPosts, postsWithoutMeta, longMetaPost, longUrlPosts, postsWithoutFeatureImg, shortPosts, longPosts} = useContext(GlobalContext);
  useEffect(()=>{
    getPosts();
  },[]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className='min-h-screen bg-black text-white px-4 py-6'>
      <h1 className='text-center text-2xl font-bold mb-10'>Posts</h1>

      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">

      {longMetaPost && longMetaPost.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts with long Meta Description</h2>
        <ul>
        {longMetaPost.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts with long Meta Description</h2>
        <p className='text-red-400 text-center'>No posts</p>
      </div>
       )
      }
      {longUrlPosts && longUrlPosts.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts with long URL</h2>
        <ul>
        {longUrlPosts.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts with long URL</h2>
        <p className='text-red-400 text-center'>No posts</p>
      </div>
       )
      }
      {postsWithoutMeta && postsWithoutMeta.length > 0? (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts without Meta Description</h2>
        <ul>
        {postsWithoutMeta.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        (
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
          <h2 className='text-center font-bold text-lg mb-4'>Posts without Meta Description</h2>
          <p className='text-red-400 text-center'>No posts</p>
        </div>
         )
       )
      }
      {postsWithoutFeatureImg && postsWithoutFeatureImg.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts without a feature image</h2>
        <ul>
        {postsWithoutFeatureImg.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Posts without a feature image</h2>
        <p className='text-red-400 text-center'>No posts</p>
      </div>
       )
      }
      {shortPosts && shortPosts.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Short Posts</h2>
        <ul>
        {shortPosts.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Short Posts</h2>
        <p className='text-red-400 text-center'>No posts</p>
      </div>
       )
      }
      {longPosts && longPosts.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Long Posts</h2>
        <ul>
        {longPosts.map((post,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  ">
        <h2 className='text-center font-bold text-lg mb-4'>Long Posts</h2>
        <p className='text-red-400 text-center'>No posts</p>
      </div>
       )
      }
  </Masonry>
</div>
  )
}

export default Posts
