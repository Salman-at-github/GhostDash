import React,{ createContext, useState } from "react";
import { filterByLongMetaDescription, filterByLongURL, filterByNoFeatureImage, filterLongPosts, filterNonMetaDescPosts, filterShortPosts, getLatestFivePosts, getPostsPerMonth } from "../utils/utils";
const GlobalContext = createContext();

const GlobalStateProvider = (props) =>{

    const host = process.env.REACT_APP_API_HOST;
    const key = process.env.REACT_APP_API_KEY;
    //for dashboard
    const [posts, setPosts] = useState(null);
    const [pages, setPages] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [tags, setTags] = useState(null);
    //posts per month
    const [monthPost, setMonthPost] = useState({})
    //latest 5 posts
    const [latestPosts, setLatestPosts] = useState(null);

    
      //    For POSTS PAGE
      const [postsWithoutMeta, setPostsWithoutMeta] = useState();
      const [longMetaPost, setLongMetaPost] = useState();
      const [longUrlPosts, setLongUrlPosts] = useState();
      const [postsWithoutFeatureImg, setPostsWithoutFeatureImg] = useState();
      const [shortPosts, setShortPosts] = useState();
      const [longPosts, setLongPosts] = useState();


    //fetch posts
    const getPosts = async () => {
        const response = await fetch(
          `${host}/ghost/api/content/posts/?key=${key}`
        );
        const data = await response.json();
        if (response.status === 200) {
            //set Posts
          setPosts(data.posts);

            //for posts per month
          const postCountsByMonth = getPostsPerMonth(data.posts); 
          setMonthPost(postCountsByMonth);

          //for latest 5 posts
          const fivePosts = getLatestFivePosts(data.posts);
                setLatestPosts(fivePosts);

        //for posts without meta_description
          const nonMetaPosts = filterNonMetaDescPosts(data.posts);
          setPostsWithoutMeta(nonMetaPosts);

        //for posts with too long meta description (more than 140 Characters)
        const longMetaPosts = filterByLongMetaDescription(data.posts)
        setLongMetaPost(longMetaPosts);

        //filter for long url > 100 chars
        const longUrl = filterByLongURL(data.posts);
        setLongUrlPosts(longUrl);

        //filter for posts without feature image
        const nonFeatureImgPost = filterByNoFeatureImage(data.posts);
        setPostsWithoutFeatureImg(nonFeatureImgPost);

        //filter as per short posts, words below 250 words
                  const filterShortPost = filterShortPosts(data.posts)
                  setShortPosts(filterShortPost);

        //filter for long posts > 1500 words
        const filterLongPost = filterLongPosts(data.posts);
        setLongPosts(filterLongPost);

      return data.posts;  
      }
    };

      //fetch pages
      const getPages = async () => {
        const response = await fetch(
          `${host}/ghost/api/content/pages/?key=${key}`
        );
        const data = await response.json();
        if (response.status === 200) {
          setPages(data.pages);
        }
      };

    //   fetch authors
      const getAuthors = async () => {
        const response = await fetch(
          `${host}/ghost/api/content/authors/?key=${key}`
        );
        const data = await response.json();
        if (response.status === 200) {
          setAuthors(data.authors);
        }
      };

      //fetch tags
      const getTags = async () => {
        const response = await fetch(
          `${host}/ghost/api/content/tags/?key=${key}`
        );
        const data = await response.json();
        if (response.status === 200) {
          setTags(data.tags);
        }
      };




    return (
        <GlobalContext.Provider value={{posts, monthPost, latestPosts,pages,authors,tags, getPosts, getPages, getAuthors, getTags, postsWithoutMeta, longMetaPost, longUrlPosts, postsWithoutFeatureImg, shortPosts, longPosts,
          }}>{props.children}</GlobalContext.Provider>
    )
}

export {GlobalContext, GlobalStateProvider}