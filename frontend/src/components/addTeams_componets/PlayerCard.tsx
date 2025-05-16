import React, { useEffect, useState } from "react";
import { CLOUDINARY_BASE_URL } from "../../config/config";
import { Image } from "cloudinary-react";

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

interface PlayerCardProps {
  player: Player;
  teamColor: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, teamColor, isSelected, onSelect }) => {
  const [textColor, setTextColor] = useState("#000000");
  
  //console.log("isSelected: ", isSelected);

  const updateTextColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setTextColor(luminance > 0.4 ? "#000000" : "#FFFFFF");
  };

  useEffect(() => {
    updateTextColor(teamColor);
  }, [teamColor]);

  return (
    <div
      className={`h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer ${isSelected ? 'border-4 border-green-500' : ''}`}
      onClick={onSelect}
      style={{ backgroundColor: teamColor }}
    >
      {/* Left side - Player Info */}
      <div
        className="absolute inset-0 w-1/2 p-4 flex flex-col justify-between rounded-md"
        style={{ color: textColor }}
      >
        <div>
          <h3 className="text-lg font-semibold mb-2">
            <span className="font-semibold underline">Player</span>:{" "}
            <span>{player.name}</span>
          </h3>
          <div className="flex flex-col mt-1">
            <span>
              <span className="font-semibold underline">Position</span>:{" "}
              <span>{player.position}</span>
            </span>
            <span>
              <span className="font-semibold underline">Jersey Number</span>:{" "}
              <span>{player.jerseyNumber}</span>
            </span>
            <span>
              <span className="font-semibold underline">Age</span>:{" "}
              <span>{player.age}</span>
            </span>
            <span>
              <span className="font-semibold underline">Affiliation</span>:{" "}
              <span>{player.affiliation}</span>
            </span>
            <span>
              <span className="font-semibold underline">Phone</span>:{" "}
              <span>{player.phoneNumber}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Player Photo */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        {player.playerPhotoURL ? (
          <div className="w-full h-full overflow-hidden">
            <Image
              cloudName="dm56xy1oj"
              publicId={player.playerPhotoURL}
              width="200"
              crop="fill"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Photo</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
