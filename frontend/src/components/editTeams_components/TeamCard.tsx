import React, { useEffect, useState } from "react";
import '../../assets/fonts/fonts.css';

interface Team {
  _id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  coach: string;
  teamManager: string;
  players: Player[];
}

interface Player {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
}

interface TeamCardProps {
  team: Team;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  const [textColor, setTextColor] = useState('#000000');

  const updateTextColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (luminance > 0.4) {
      setTextColor('#000000');
    } else {
      setTextColor('#FFFFFF');
    }
  };

  useEffect(() => {
    updateTextColor(team.primaryColor);
  }, [team.primaryColor]);

  const backgroundGradientStyle = {
    background: `linear-gradient(to left, ${team.primaryColor} 100%, ${team.primaryColor}00 100%)`,
    padding: '20px',
    color: textColor,
    minHeight: '100px',
    width: '100%'
  };

  return (
    <div className="flex p-4 mb-4 rounded-lg shadow border border-black border-1 cursor-pointer" style={backgroundGradientStyle} onClick={onClick}>
      <div className="w-3/5">
        <h2 className="text-xl font-bold">{team.name}</h2>
        <p>Coach: {team.coach}</p>
        <p>Number of Players: {team.players.length}</p>
      </div>
    </div>
  );
};

export default TeamCard;
