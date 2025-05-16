// TeamsCard.tsx
import React from 'react';

interface TeamsCardProps {
  count: number;
}

const TeamsCard: React.FC<TeamsCardProps> = ({ count }) => {
  return (
    <div className="teams-card bg-[#116955] rounded-lg py-4 px-10 text-center text-white z-9999">
      <div className="text-4xl font-bold">{count}</div>
      <div className="text-lg">Teams</div>
    </div>
  );
};

export default TeamsCard;