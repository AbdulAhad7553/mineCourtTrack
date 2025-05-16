// components/LoadingLayout.jsx

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CourtTrack from "../assets/CourtTrack.svg";

const LoadingLayout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-14 flex-grow flex items-center justify-center">
        <img src={CourtTrack} alt="Loading" className="animate-spin h-12 w-12" />
      </div>
    </div>
  );
};

export default LoadingLayout;
