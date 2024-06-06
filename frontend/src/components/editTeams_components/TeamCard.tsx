
import React, { useEffect, useState } from "react";
import {CLOUDINARY_BASE_URL} from "../../config/config.tsx";

interface Team {
  _id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  coach: string;
  teamManager: string;
  players: Player[];
  teamPhotoURL: string;
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
  const [textColor, setTextColor] = useState("#000000");

  const updateTextColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setTextColor(luminance > 0.4 ? "#000000" : "#FFFFFF");
  };
  // console.log("team.teamPhoto.URL: ", team.teamPhotoURL);
  // console.log("CLOUDINARY URL: ",`(${CLOUDINARY_BASE_URL}${team.teamPhotoURL}.jpg)`);

  useEffect(() => {
    updateTextColor(team.primaryColor);
  }, [team.primaryColor]);

  return (
    <div
      className="h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer"
      onClick={onClick}
    >
      {/* right half of the team card */}
      <div
        className="bg-cover bg-center bg-no-repeat w-1/2 h-full absolute right-0"
        style={{ backgroundImage: `url(${CLOUDINARY_BASE_URL}${team.teamPhotoURL}.jpg)`, zIndex: '9999' }}
      ></div>

      {/* left half of the team card */}
      <div
        className="h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-100"
        style={{ backgroundColor: team.primaryColor }}
      >
        <div
          className="absolute inset-0 w-1/2 p-4 flex flex-col justify-between rounded-md"
          style={{ color: textColor }}
        >
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <span className="font-semibold underline">Team</span>:{" "}
              <span>{team.name}</span>
            </h3>
            <div className="flex flex-col mt-1">
              <span>
                <span className="font-semibold underline">Coach</span>:{" "}
                <span>{team.coach}</span>
              </span>
              <span>
                <span className="font-semibold underline">Team Manager</span>:{" "}
                <span>{team.teamManager}</span>
              </span>
              <span>
                <span className="font-semibold underline">Number of Players</span>:{" "}
                <span>{team.players.length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
