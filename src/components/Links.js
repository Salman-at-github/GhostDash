import React, { useContext, useEffect,useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ExtractLinks } from '../utils/utils';
import getLinksStatus from '../utils/checkLinks';

const Links = () => {

  const [totalLinks, setTotalLinks] = useState([])
  const [internalLinks, setInternalLinks] = useState()
  const [externalLinks, setExternalLinks] = useState()
  const [brokenInternalLinks, setBrokenInternalLinks] = useState([])
  const [brokenExternalLinks, setBrokenExternalLinks] = useState([])
  const {getPosts} = useContext(GlobalContext);

  useEffect(() => {
    const fetchLinks = async () => {
      const postData = await getPosts();
      let totLink = [];

      postData.forEach((post) => {
        const linksArray = ExtractLinks(post.html);
        if (linksArray.length && linksArray.length > 0) {
          totLink = [...totLink, ...linksArray];
        }
      });
      // Remove duplicate links
      const uniqueLinks = Array.from(new Set(totLink));
      setTotalLinks(uniqueLinks);
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    if (totalLinks && totalLinks.length > 0) {
      let intLinks = 0;
      let extLinks = 0;

      totalLinks.forEach((link) => {
        if (link.startsWith("https://ghost-blog.ipxp.in")) {
          intLinks += 1;
        } else {
          extLinks += 1;
        }
      });

      setInternalLinks(intLinks);
      setExternalLinks(extLinks);

      const fetchBrokenLinks = async () => {
        let intBrokenLink = [];
        let extBrokenLink = [];

        const checkedLinks = await getLinksStatus(totalLinks)

        console.log("new links ",checkedLinks)
        checkedLinks.forEach((linkItem)=>{
          if(linkItem.isBroken){
            if(linkItem.link.startsWith("https://ghost-blog.ipxp.in") ){
              intBrokenLink.push(linkItem.link)
            } else {
              extBrokenLink.push(linkItem.link)
            }
          } 
        })
        // Update state after all fetch requests are complete
        setBrokenInternalLinks(intBrokenLink);
        setBrokenExternalLinks(extBrokenLink);
      };

      fetchBrokenLinks();
    }
  }, [totalLinks]);
  
  return (
    <div className='min-h-screen bg-black text-white container p-4'>
      <h1 className='text-center text-2xl font-bold mb-4'>
          Links
      </h1>

      {totalLinks &&
      <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4 md:h-40 rounded-md my-6 ">
              <div className="flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="bg-gradient-to-b from-pink-950 to-violet-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg ">
              <div className="text-sm font-medium text-gray-200 mb-2">Total Links</div>
              <div className="text-3xl font-bold text-gray-200">{totalLinks.length}</div>
          </div>
          <div className="bg-gradient-to-b from-pink-950 to-violet-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg">
              <div className="text-sm font-medium text-gray-200 mb-2">Internal Links</div>
              <div className="text-3xl font-bold text-gray-200">{internalLinks}</div>
          </div>
          <div className="bg-gradient-to-b from-pink-950 to-violet-950 flex flex-col items-center h-28 hover:border-white hover:border-2 md:w-40 w-60 justify-center p-6 mx-4 my-0.5 rounded-lg">
              <div className="text-sm font-medium text-gray-200 mb-2">External Links</div>
              <div className="text-3xl font-bold text-gray-200">{externalLinks}</div>
          </div>
        </div>
      </div>
     }
     <div className='container sm:flex space-x-2'>
     {brokenInternalLinks && brokenInternalLinks.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  sm:w-1/2 h-fit my-4">
        <h2 className='text-center font-bold text-lg mb-4'>Broken Internal Links</h2>
        <ul>
        {brokenInternalLinks.map((link,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${link}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{link}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  sm:w-1/2 h-fit my-4">
        <h2 className='text-center font-bold text-lg mb-4'>Broken Internal Links</h2>
        <p className='text-red-400 text-center'>No links</p>
      </div>
       )
      }
     {brokenExternalLinks && brokenExternalLinks.length > 0? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  sm:w-1/2 h-fit my-4">
        <h2 className='text-center font-bold text-lg mb-4'>Broken External Links</h2>
        <ul>
        {brokenExternalLinks.map((link,index)=>{
            return (
              <div key={index} className="bg-gradient-to-l from-blue-950 to-black p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-800 hover:border-[1px] hover:border-orange-400">
                <a href={`${link}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-200 hover:text-yellow-200 mb-2">{link}</a>
              </div>
            );       
        })}
        </ul>
      </div>
      )  
       : (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg  sm:w-1/2 h-fit my-4">
        <h2 className='text-center font-bold text-lg mb-4'>Broken External Links</h2>
        <p className='text-red-400 text-center'>No links</p>
      </div>
       )
      }
     </div>

  </div>
  )
}

export default Links
