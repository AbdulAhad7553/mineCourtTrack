import React, { useEffect, useState } from "react";
import { CLOUDINARY_BASE_URL } from "../../config/config.tsx";
import { useNavigate } from "react-router-dom";

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
  playerPhotoURL: string;
}

interface TeamCardProps {
  team: Team;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  const [textColor, setTextColor] = useState("#000000");
  const navigate = useNavigate();

  const lightenDarkenColor = (col: string, amt: number) => {
    let usePound = false;

    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let g = ((num >> 8) & 0x00ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    let b = (num & 0x0000ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (
      (usePound ? "#" : "") +
      ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
    );
  };

  const updateTextColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setTextColor(luminance > 0.4 ? "#000000" : "#FFFFFF");
  };

  useEffect(() => {
    updateTextColor(team.primaryColor);
  }, [team.primaryColor]);

  const dullColor = lightenDarkenColor(team.primaryColor, -30);
  const brightColor = lightenDarkenColor(team.primaryColor, 30);

  return (
    <>
      <div
        className="h-44 flex rounded-lg overflow-hidden z-9999"
        onClick={onClick}
      >
        <div className="flex-1 p-4 flex" style={{ backgroundColor: dullColor }}>
          <div
            className="mt-2 w-32 h-32 bg-gray-200 rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${CLOUDINARY_BASE_URL}${team.teamPhotoURL}.jpg)`,
              zIndex: "9999",
            }}
          ></div>
          <div
            className="ml-4 flex flex-col justify-between"
            style={{ color: textColor }}
          >
            <h2 className="text-xl font-bold">{team.name}</h2>
            <p className="text-l">{team.coach} (Coach)</p>
            <p className="text-l">{team.teamManager} (Team Manager)</p>

            <button className="bg-gray-800 text-white text-xs py-1 px-3 rounded">
              Player Details
            </button>
          </div>
        </div>
        <div
          className="w-12 flex flex-col items-center justify-center border-opacity-20"
          style={{
            backgroundColor: brightColor,
            borderColor: textColor,
            borderLeftStyle: "dashed",
            borderLeftWidth: "2px",
          }}
        >
          <button className="mb-2 py-2">
            <svg
              className="w-7 h-7 text-white transition-transform duration-200 hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: textColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
          <button
            className="mb-2 py-2"
            onClick={() => navigate(`/edit-team/${team._id}`)}
          >
            <svg
              className="w-7 h-7 text-white transition-transform duration-200 hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: textColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <button className="py-2">
            <svg
              className="w-7 h-7 text-white transition-transform duration-200 hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: textColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
