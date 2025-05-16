import React from 'react';

interface PlayerCardProps {
  count: number;
}

const TeamsCard: React.FC<PlayerCardProps> = ({ count }) => {
  return (
    <div className="teams-card bg-blue-800 rounded-lg py-4 px-10 text-center text-white">
      <div className="text-4xl font-bold">{count}</div>
      <div className="text-lg">Players</div>
    </div>
  );
};

export default TeamsCard;