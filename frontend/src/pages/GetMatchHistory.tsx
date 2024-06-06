// GetMatchHistory.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';
import Navbar from '../components/navBar_componets/Navbar';
import GameCard from '../components/game_components/GameCard';

interface Game {
  _id: string;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

const GetMatchHistory: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-match-history`);
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching match history:', error);
      }
    };

    fetchMatchHistory();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar pageIndex={2} />
      <div className="container mx-auto pt-12">
        <h1 className="text-3xl font-bold mb-8">Match History</h1>
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
