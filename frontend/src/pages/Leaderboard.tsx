import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Player {
  _id: string;
  playerName: string;
  statPerGame: number;
}

interface LeaderboardData {
  points: Player[];
  assists: Player[];
  rebounds: Player[];
  steals: Player[];
  blocks: Player[];
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardData>(
          `${API_BASE_URL}/leaderboard`
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const renderLeaderboardSection = (title: string, players: Player[]) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="list-disc pl-5">
        {players
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((player, index) => (
            <li key={player._id} className="mb-2">
              <span className="font-bold">
                {index + 1 + indexOfFirstItem}. {player.playerName}
              </span>{" "}
              - {player.statPerGame.toFixed(2)}{" "}
              {title.split(" ")[2].toLowerCase()} per game
            </li>
          ))}
      </ul>
    </div>
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-screen h-screen fixed right-0 top-0 overflow-hidden"></div>
      <Navbar />
      <Sidebar />
      <div className="flex flex-col items-center mt-20 justify-center p-4">
        <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
          {leaderboard && (
            <>
              {renderLeaderboardSection(
                "Top 10 Points per Game",
                leaderboard.points
              )}
              {renderLeaderboardSection(
                "Top 10 Assists per Game",
                leaderboard.assists
              )}
              {renderLeaderboardSection(
                "Top 10 Rebounds per Game",
                leaderboard.rebounds
              )}
              {renderLeaderboardSection(
                "Top 10 Steals per Game",
                leaderboard.steals
              )}
              {renderLeaderboardSection(
                "Top 10 Blocks per Game",
                leaderboard.blocks
              )}
              <div className="flex justify-center mt-4">
                <nav>
                  <ul className="pagination">
                    {Array.from(
                      {
                        length: Math.ceil(
                          leaderboard.points.length / itemsPerPage
                        ),
                      },
                      (_, index) => (
                        <li key={index} className="page-item">
                          <button
                            onClick={() => paginate(index + 1)}
                            className="page-link focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                          >
                            Page: {index + 1}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
