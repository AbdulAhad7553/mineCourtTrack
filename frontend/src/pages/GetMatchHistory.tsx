// GetMatchHistory.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/Navbar";
import GameCard from "../components/game_components/GameCard";
import Sidebar from "../components/Sidebar";

interface Game {
  _id: string;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeamId: string;
  awayTeamId: string;
}

const GetMatchHistory: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-match-history`);
        setGames(response.data.games);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    };

    fetchMatchHistory();
  }, []);

  return (
    <div className="flex">
      <div className="w-screen h-screen fixed right-0 top-0 overflow-hidden"></div>

      <Navbar />
      <Sidebar />
      <div className="container relative ml-80">
        <h1 className="text-3xl mt-20 font-bold mb-8">Match History</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetMatchHistory;
