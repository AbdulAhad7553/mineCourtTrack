import Navbar from './navBar_componets/Navbar'; // Adjust the path as needed
import { Link, useNavigate } from 'react-router-dom';


// import store from '../redux/store.js'

const Dashboard = () => {
//   console.log(store.getState())
  const navigate = useNavigate();
  const handleEditTeams = () => {
    navigate('/edit-teams');
  };

  const handleStartNewMatch = () =>{
    navigate('/start-new-match');
  };

  const handleViewPlayerStats = () =>{
    navigate('/view-player-stats');
  };

  const handleViewTeams = () => {
    navigate('/view-teams');
  };

  const handleMatchHistory = () => {
    navigate('/get-match-history');
  };
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-4/5 h-4/5 bg-neutral-100 shadow-lg rounded-lg">
          <Navbar pageIndex={1} />
          <div className="flex p-8 h-full"> {/* Adjusted for full height and flex layout */}
            <div className="flex flex-col flex-1 mr-6"> {/* 60% width for the left section, use flex-col for vertical layout */}
                <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4 w-full" onClick={handleStartNewMatch}>
                Start New Match
                </button>
                <div className="grid grid-cols-2 gap-4"> {/* Grid layout for buttons */}
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleViewTeams}>View Teams</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleMatchHistory}>View Match History</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleEditTeams}>Edit Teams</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleViewPlayerStats}>View Player Stats</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                    <Link to="/create-team" className="block w-full h-full text-center">
                        Add Teams
                    </Link>
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">View Team Stats</button>
                
                </div>
            </div>
            <div className="flex flex-col flex-1"> {/* 40% width for the right section */}
                <h1 className="text-xl font-bold mb-4">Live Games</h1>
                <p>Here you can place additional widgets or information relevant to the user.</p>
            </div>
            </div>
        </div>
      </div>
    );
  };

export default Dashboard;
