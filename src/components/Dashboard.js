import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {BsFillFilePostFill, BsFillPersonFill} from 'react-icons/bs';
import {MdContactPage} from 'react-icons/md';
import {BiSolidTagAlt} from 'react-icons/bi';
import PieChart from "./PieChart";

const Dashboard = () => {
  const {latestPosts,posts,pages,authors,tags, getPosts, getPages, getAuthors, getTags} = useContext(GlobalContext);

  useEffect(() => {
    getPosts();
    getPages();
    getAuthors();
    getTags();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen flex-wrap bg-black px-16 pb-5">
          <div className="w-[98vw]">
      {posts && pages && authors && tags && (
        <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4 md:h-40 rounded-md my-6">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-b from-blue-950 to-purple-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg ">
              <div className="text-sm font-medium text-gray-200 mb-2">Total Posts</div>
              <div className="text-3xl font-bold text-gray-200">{posts.length}</div>
              <div >
                <BsFillFilePostFill className="text-xl font-medium text-white mt-2"/>
              </div>
          </div>
          <div className="bg-gradient-to-b from-blue-950 to-purple-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg">
              <div className="text-sm font-medium text-gray-200 mb-2">Total Pages</div>
              <div className="text-3xl font-bold text-gray-200">{pages.length}</div>
              <div >
                <MdContactPage className="text-xl font-medium text-white mt-2"/>
              </div>
          </div>
          <div className="bg-gradient-to-b from-blue-950 to-purple-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg">
              <div className="text-sm font-medium text-gray-200 mb-2">Total Authors</div>
              <div className="text-3xl font-bold text-gray-200">{authors.length}</div>
              <div >
                <BsFillPersonFill className="text-xl font-medium text-white mt-2"/>
              </div>
          </div>
          <div className="bg-gradient-to-b from-blue-950 to-purple-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg">
              <div className="text-sm font-medium text-gray-200 mb-2">Total Tags</div>
              <div className="text-3xl font-bold text-gray-200">{tags.length}</div>
              <div >
                <BiSolidTagAlt className="text-xl font-medium text-white mt-2"/>
              </div>
          </div>
        </div>
      </div>
      )}

      <div className="container flex flex-col sm:flex-row justify-center items-center my-8">
          <div className="w-screen sm:w-1/2 p-8 bg-gradient-to-br  from-blue-950 via-black to-cyan-950 sm:h-screen text-white rounded-3xl shadow-lg">
            <PieChart/>
          </div>
          <div className="w-screen sm:w-1/2 bg-gradient-to-br  from-blue-950 via-black to-cyan-950 sm:h-screen rounded-3xl shadow-lg">
            <div className="my-8 px-8">
            <h1 className=" text-center text-white font-extrabold text-4xl">Dashboard</h1>
            <p className="text-center text-white mt-20">Welcome to the dashboard of our website. Here, you can find valuable insights and data about our content and contributors.
  We strive to provide the best quality content to our readers.
  Explore the latest posts, pages, authors, and tags, and stay up-to-date with our exciting journey.
  Thank you for visiting and being a part of our community!</p>
            </div>
          </div>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg sm:h-max">
      <h2 className="text-2xl mb-4 text-center font-bold">Latest Posts</h2>
      {latestPosts &&
        latestPosts.map((post, index) => {
          // Parse and format the published_at date here
          const publishedAtString = post.published_at; // Assuming this is where the timestamp is stored
          const publishedAt = new Date(publishedAtString);
          const hours = publishedAt.getHours();
          const minutes = publishedAt.getMinutes();
          const options = { year: 'numeric', month: 'short', day: 'numeric' };

          //return 5 latest posts with their link that opens in a new tab
          return (
            <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md hover:border-[1px] hover:border-cyan-100 border-[1px] border-black h-fit">
              <a href={`${post.url}`} target="_blank" rel="noreferrer" className="text-xl text-cyan-200 hover:text-yellow-200 mb-2">{post.title}</a>
              <p className="text-sm text-gray-200 mt-2">
                Date: {publishedAt.toLocaleDateString(undefined, options)}{' '}<span className="text-green-500 font-bold text-xs">{hours}:{minutes} IST</span>
              </p>
            </div>
          );
        })}
    </div>
    </div>
      </div>
  )
}

export default Dashboard
