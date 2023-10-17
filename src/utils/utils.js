const cheerio = require('cheerio');
//HELPER FUNCTIONS

export function countWordsInHTML(html) {
  if(html && typeof(html)==='string'){

    // Remove HTML tags and entities
    const textContent = html.replace(/<\/?[^>]+(>|$)/g, "");
  
    // Split the text content into words, considering hyphens and periods as word characters
    const words = textContent.split(/[\s\-\.]+/);
  
    // Filter out empty strings (resulting from multiple spaces)
    const filteredWords = words.filter(word => word.trim() !== '');
  
    // Return the number of words
    return filteredWords.length;
  }
  }

export const  ExtractLinks = (html)=>{

  if(html && typeof(html)==='string'){

    const linksArray = [];
    const $ = cheerio.load(html);
  
    // Find all 'a' elements and extract their 'href' attributes
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      //valid links would be atleast > 3 chars
      if (href && href.length > 4) {
        linksArray.push(href);
      }
    });
  
    return linksArray;
  }
}


//DATA TRANSFORMATION

export const getPostsPerMonth = (posts) =>{
  let postCountsByMonth = {}; // Object to store post counts per month
    posts.forEach((post) => {
    const date = new Date(post.published_at);
    const month = date.toLocaleString(undefined, { month: 'short' }); // Get the short month name
    const monthKey = `${month}`; // Create a key like "Jan" for each month
    if (!postCountsByMonth[monthKey]) {
    postCountsByMonth[monthKey] = 1; // Initialize with a count of 1 if it doesn't exist
    } else {
    postCountsByMonth[monthKey]++; // Increment the count if it already exists
    }
    });
    return postCountsByMonth;
}

export const getLatestFivePosts = (posts) =>{
  const sorted5Posts = posts.sort((first, second) =>
        new Date(second.published_at) - new Date(first.published_at)).slice(0, 5);
  return sorted5Posts;
}

export const filterNonMetaDescPosts = (posts) => {
  return posts.filter((post)=> post.meta_description === null);
};

export const filterByLongMetaDescription = (posts)=>{
  return posts.filter((post)=> post.meta_description && post.meta_description.length > 140);
}

export const filterByLongURL = (posts)=>{
  return posts.filter((post)=> post.url && post.url.length > 100);
}

export const filterByNoFeatureImage = (posts)=>{
  return posts.filter((post)=> post.feature_image === null);
}

export const filterShortPosts = (posts)=>{
  return posts.filter((post)=> countWordsInHTML(post.html) < 250);
}

export const filterLongPosts = (posts) =>{
  return posts.filter((post)=> countWordsInHTML(post.html) > 1500);
}

export const getTotalLinks = (posts)=>{
  const totalLinksArray =[];
  posts.forEach((post)=>{
      totalLinksArray.push(ExtractLinks(post.html))
  })
  return totalLinksArray;
}