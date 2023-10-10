
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Navbar = () => {

  const pathName = useLocation().pathname;

  return (
    <div className=" flex flex-col md:flex-row justify-center md:justify-center md:items-center items-end py-2  sticky bg-gradient-to-b from-blue-900 to-blue-950 sm:p-4 shadow-2xl">
      <div className="absolute left-4 bg-gray-900 hover:bg-white rounded-xl p-1">
        <span className="text-yellow-300 hover:text-blue-950 font-extrabold text-2xl">Ghost</span><span className="text-cyan-300 hover:text-green-900 font-extrabold">Dash</span>
      </div>
      <div className="mx-3">
        <ul className="flex items-center space-x-4 font-bold md:text-l my-3 md:my-0 ">
          <Link to="/">
            <li className={`${pathName==="/"? "underline" : ""} text-white hover:text-cyan-600`}>Dashboard</li>
          </Link>
          <Link to="/posts">
            <li className={`${pathName==="/posts"? "underline" : ""} text-white hover:text-yellow-400`}>Posts</li>
          </Link>
          <Link to="/links">
            <li className={`${pathName==="/links"? "underline" : ""} text-white hover:text-green-400`}>Links</li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
};

export default Navbar;
