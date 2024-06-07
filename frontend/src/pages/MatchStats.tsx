

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StatTable from '../components/StatTable/StatTable';
import { API_BASE_URL } from "../config/config";

interface Player{
  _id: string;
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: number;
  playerPhotoURL: string;

  stats: { [key: string]: number };
}

interface GameDetailsResponse {
  homeTeamPlayers: Player[];
  awayTeamPlayers: Player[];
  homeTeamName: string;
  awayTeamName: string;
}

const MatchStats: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [homeStartingFive, setHomeStartingFive] = useState<Player[]>([]);
  const [awayStartingFive, setAwayStartingFive] = useState<Player[]>([]);
  const [homeTeamName, setHomeTeamName] = useState<string>();
  const [awayTeamName, setAwayTeamName] = useState<string>();
  const [homeSubstitutes, setHomeSubstitutes] = useState<Player[]>([]);
  const [awaySubstitutes, setAwaySubstitutes] = useState<Player[]>([]);
  const [matchStats, setMatchStats] = useState<{ [key: string]: Player[] }>({
    homeTeam: [],
    awayTeam: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get<GameDetailsResponse>(`${API_BASE_URL}/get-game/${gameId}`);
        setHomeTeamName(response.data.homeTeamName);
        setAwayTeamName(response.data.awayTeamName);
        const homePlayers: Player[] = response.data.homeTeamPlayers.map((player) => ({
          ...player,
          id: player._id,
          stats: { fouls: 0, '1Pts': 0, '2Pts': 0, '3Pts': 0, assists: 0, rebounds: 0, steals: 0, blocks: 0 }
        })) as Player[];
        const awayPlayers: Player[] = response.data.awayTeamPlayers.map((player) => ({
          ...player,
          id: player._id,
          stats: { fouls: 0, '1Pts': 0, '2Pts': 0, '3Pts': 0, assists: 0, rebounds: 0, steals: 0, blocks: 0 }
        })) as Player[];
        const homeStartingFive = homePlayers.slice(0, 5);
        const homeSubstitutes = homePlayers.slice(5);
        const awayStartingFive = awayPlayers.slice(0, 5);
        const awaySubstitutes = awayPlayers.slice(5);
        setHomeStartingFive(homeStartingFive);
        setHomeSubstitutes(homeSubstitutes);
        setAwayStartingFive(awayStartingFive);
        setAwaySubstitutes(awaySubstitutes);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const updateMatchStats = (team: string, updatedPlayers: Player[]) => {
      // Check if any player is missing _id property
    const hasMissingId = updatedPlayers.some(player => !player._id);
    if (hasMissingId) {
    console.error("Some players are missing the _id property.");
    return;
  }
    setMatchStats(prevStats => ({
      ...prevStats,
      [team]: updatedPlayers
    }));
  };

  const calculateTotalScore = (players: Player[]) => {
    return players.reduce((total, player) => {
      return total + (player.stats['1Pts'] || 0) + (2 * (player.stats['2Pts'] || 0)) + (3 * (player.stats['3Pts'] || 0));
    }, 0);
  };

  const endMatch = async () => {
    try {
      const homeTotalScore = calculateTotalScore(matchStats.homeTeam);
      const awayTotalScore = calculateTotalScore(matchStats.awayTeam);
      const winner = homeTotalScore > awayTotalScore ? homeTeamName : awayTeamName;
      alert(`The winner is ${winner}!`);
      
      const matchData = {
        homeTeam: matchStats.homeTeam,
        awayTeam: matchStats.awayTeam,
        homeTotalScore,
        awayTotalScore, 
        homeTeamName,
        awayTeamName
      };
      
      const endresponse = await axios.post(`${API_BASE_URL}/end-match/${gameId}`, matchData);
      alert(`${endresponse.data.message}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error ending match:', error);
    }
  };

  return (
    <div className="match-stats">
      <h1>Match Stats</h1>
      <StatTable
        team={homeTeamName || ""}
        startingFive={homeStartingFive}
        substitutes={homeSubstitutes}
        updateStats={(players) => updateMatchStats('homeTeam', players)}
      />
      <StatTable
        team={awayTeamName || ""}
        startingFive={awayStartingFive}
        substitutes={awaySubstitutes}
        updateStats={(players) => updateMatchStats('awayTeam', players)}
      />
      <button
        onClick={endMatch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        End Match
      </button>
    </div>
  );
};

export default MatchStats;
