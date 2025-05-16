import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/config";
import LoadingLayout from "../components/LoadingLayout";

interface Player {
  _id: string;
  name: string;
  jerseyNumber: number;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  fouls: number;
}

interface Team {
  _id: string;
  name: string;
  score: number;
  teamColor: string;
  players: Player[];
}

interface Game {
  _id: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore: number;
  awayTeamScore: number;
  status: string;
}

interface MatchDetails {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamStats: Player[];
  awayTeamStats: Player[];
  homeTeamScore:number;
  awayTeamScore:number;
}

const ViewMatch: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        // Fetch game details
        const gameResponse = await fetch(`${API_BASE_URL}/get-game/${matchId}`);
        if (!gameResponse.ok) {
          throw new Error("Failed to fetch game data");
        }
        const gameData = await gameResponse.json();
        console.log("gameData: ", gameData);
        // Fetch home team details
        const homeTeamResponse = await fetch(
          `${API_BASE_URL}/get-team-detail/${gameData.homeTeamId}`
        );
        if (!homeTeamResponse.ok) {
          throw new Error("Failed to fetch home team data");
        }
        const homeTeamData = await homeTeamResponse.json();

        // Fetch away team details
        const awayTeamResponse = await fetch(
          `${API_BASE_URL}/get-team-detail/${gameData.awayTeamId}`
        );
        if (!awayTeamResponse.ok) {
          throw new Error("Failed to fetch away team data");
        }
        const awayTeamData = await awayTeamResponse.json();

        // Fetch player stats for the game
        const statsResponse = await fetch(
          `${API_BASE_URL}/get-game-stats/${matchId}`
        );
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch game stats");
        }
        const statsData = await statsResponse.json();

        setMatchDetails({
          game: gameData,
          homeTeam: {
            ...homeTeamData,
            score: gameData.homeTeamScore,
            players: statsData.homeTeamStats,
          },
          awayTeam: {
            ...awayTeamData,
            score: gameData.awayTeamScore,
            players: statsData.awayTeamStats,
          },
          homeTeamStats: statsData.homeTeamStats,
          awayTeamStats: statsData.awayTeamStats,
          homeTeamScore: statsData.homeTeamScore,
          awayTeamScore: statsData.awayTeamScore,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  const renderTeamStats = (team: Team, score:number) => (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: team.teamColor }}
        >
          {team.name} - {score} points
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Player</th>
                <th className="px-4 py-2 text-center">#</th>
                <th className="px-4 py-2 text-center">PTS</th>
                <th className="px-4 py-2 text-center">AST</th>
                <th className="px-4 py-2 text-center">REB</th>
                <th className="px-4 py-2 text-center">STL</th>
                <th className="px-4 py-2 text-center">BLK</th>
                <th className="px-4 py-2 text-center">FLS</th>
              </tr>
            </thead>
            <tbody>
              {team.players.map((player) => (
                <tr key={player._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2 text-center">
                    {player.jerseyNumber}
                  </td>
                  <td className="px-4 py-2 text-center">{player.points}</td>
                  <td className="px-4 py-2 text-center">{player.assists}</td>
                  <td className="px-4 py-2 text-center">{player.rebounds}</td>
                  <td className="px-4 py-2 text-center">{player.steals}</td>
                  <td className="px-4 py-2 text-center">{player.blocks}</td>
                  <td className="px-4 py-2 text-center">{player.fouls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <LoadingLayout />
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Navbar />
        <Sidebar />
        <div className="p-4 sm:ml-64 mt-14 flex-grow flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!matchDetails) {
    return (
      <div className="flex h-screen">
        <Navbar />
        <Sidebar />
        <div className="p-4 sm:ml-64 mt-14 flex-grow flex items-center justify-center">
          <div>Match not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-100vh bg-gray-100">
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-14 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Match Details</h1>
              <div className="text-gray-600">
                <div>
                  Date: {new Date(matchDetails.game.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-center text-4xl font-bold mb-6">
              <span style={{ color: matchDetails.homeTeam.teamColor }}>
                {matchDetails.homeTeam.name}
              </span>
              <span className="mx-4">
                {matchDetails.game.homeTeamScore} -{" "}
                {matchDetails.game.awayTeamScore}
              </span>
              <span style={{ color: matchDetails.awayTeam.teamColor }}>
                {matchDetails.awayTeam.name}
              </span>
            </div>
          </div>

          {renderTeamStats(matchDetails.homeTeam, matchDetails.homeTeamScore)}
          {renderTeamStats(matchDetails.awayTeam, matchDetails.awayTeamScore)}
        </div>
      </div>
    </div>
  );
};

export default ViewMatch;
