import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState("");
  const nav = useNavigate()

  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
  }, []); // Adding dependency array to prevent running on every render

  const handelLogout = () => {
    sessionStorage.clear();
    nav("/");
  }

  const routeProfile = () => {
    
    nav("/profile");
  }  

  return (
    <div className="bg-zinc-800 text-white text-lg p-4 rounded-t flex justify-between items-center">
      <span>Welcome, {username}</span>
      <div>
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={routeProfile}>
          Profile
        </button>
        <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full" onClick={handelLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
