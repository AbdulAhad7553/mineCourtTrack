// components/game_components/GameCard.tsx

import React from 'react';

interface Game {
  _id: string;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{game.homeTeamName}</h2>
        <span className="text-xl font-bold">{game.awayTeamName}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-800">{game.homeTeamScore}</span>
        <span className="text-gray-800">vs</span>
        <span className="text-gray-800">{game.awayTeamScore}</span>
      </div>
      <h2 className="text-gray-500">Date: {new Date(game.date).toLocaleDateString()}</h2>
    </div>
  );
};

export default GameCard;
