// import React, { useEffect, useState } from "react";
// import '../../assets/fonts/fonts.css';

// interface Player {
//     id: number;
//     name: string;
//     jerseyNumber: number;
//     position: string;
//     age: number;
//     affiliation: string;
//     phoneNumber: string;
// }

// interface PlayerCardProps {
//     player: Player;
//     teamColor: string; // Ensure teamColor is part of the props
// }

// const PlayerCard: React.FC<PlayerCardProps> = ({ player, teamColor }) => {
//     const [textColor, setTextColor] = useState('#000000');

//     const updateTextColor = (hexColor: string) => {
//         // Validate hexColor before processing
//         if (!hexColor || typeof hexColor !== 'string') return;

//         // Remove the hash at the start if it's there
//         const hex = hexColor.replace('#', '');
//         if (hex.length !== 6) return; // Ensure hex is valid

//         const r = parseInt(hex.substring(0, 2), 16);
//         const g = parseInt(hex.substring(2, 4), 16);
//         const b = parseInt(hex.substring(4, 6), 16);
//         // Using the luminance formula to determine the brightness of the background
//         const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//         if (luminance > 0.4) {
//             setTextColor('#000000');  // Dark text for light backgrounds
//         } else {
//             setTextColor('#FFFFFF');  // Light text for dark backgrounds
//         }
//     };

//     useEffect(() => {
//         updateTextColor(teamColor);  // Update text color initially or when teamColor changes
//     }, [teamColor]);

//     const backgroundGradientStyle = {
//         background: `linear-gradient(to left, ${teamColor}  100%, ${teamColor}00 100%)`,  // Gradual fade to transparent
//         padding: '20px',
//         color: textColor,
//         minHeight: '100px',  // Ensure it's visible enough for demonstration
//         width: '100%'
//     };

//     return (
//         <div className="flex p-4 mb-4 rounded-lg shadow border border-black border-1" style={backgroundGradientStyle}>
//             <div className="w-3/5">
//                 <h2 className="text-xl font-bold">{player.name} (#{player.jerseyNumber})</h2>
//                 <p>Position: {player.position}</p>
//                 <p>Age: {player.age}</p>
//                 <p>Affiliation: {player.affiliation}</p>
//                 <p>Phone: {player.phoneNumber}</p>
//             </div>
//             <div className="flex w-2/5 justify-center ">
//                 <h2 className="text-9xl font-atlanta">{player.jerseyNumber}</h2>
//             </div>
//         </div>
//     );
// }

// export default PlayerCard;























// import React, { useEffect, useState } from "react";
// import '../../assets/fonts/fonts.css';
// import {CLOUDINARY_BASE_URL} from "../../config/config.tsx";

// interface Player {
//     _id: string;
//     name: string;
//     jerseyNumber: number;
//     position: string;
//     age: number;
//     affiliation: string;
//     phoneNumber: string;
// }

// interface PlayerCardProps {
//     player: Player;
//     teamColor: string; // Ensure teamColor is part of the props
//     isSelected: boolean;
//     onSelect: () => void;
// }

// const PlayerCard: React.FC<PlayerCardProps> = ({ player, teamColor, isSelected, onSelect }) => {
//     const [textColor, setTextColor] = useState('#000000');

//     const updateTextColor = (hexColor: string) => {
//         if (!hexColor || typeof hexColor !== 'string') return;
//         const hex = hexColor.replace('#', '');
//         if (hex.length !== 6) return;

//         const r = parseInt(hex.substring(0, 2), 16);
//         const g = parseInt(hex.substring(2, 4), 16);
//         const b = parseInt(hex.substring(4, 6), 16);
//         const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//         setTextColor(luminance > 0.4 ? '#000000' : '#FFFFFF');
//     };

//     useEffect(() => {
//         updateTextColor(teamColor);
//     }, [teamColor]);

//     const backgroundGradientStyle = {
//         background: `linear-gradient(to left, ${teamColor}  100%, ${teamColor}00 100%)`,
//         padding: '20px',
//         color: textColor,
//         minHeight: '100px',
//         width: '100%',
//         cursor: 'pointer',
//         border: isSelected ? '4px solid blue' : '4px solid transparent'
//     };

//     return (
//         <div className="flex p-4 mb-4 rounded-lg shadow border border-black border-1" style={backgroundGradientStyle} onClick={onSelect}>
//             <div className="w-3/5">
//                 <h2 className="text-xl font-bold">{player.name} (#{player.jerseyNumber})</h2>
//                 <p>Position: {player.position}</p>
//                 <p>Age: {player.age}</p>
//                 <p>Affiliation: {player.affiliation}</p>
//                 <p>Phone: {player.phoneNumber}</p>
//             </div>
//             <div className="flex w-2/5 justify-center">
//                 <h2 className="text-9xl font-atlanta">{player.jerseyNumber}</h2>
//             </div>
//         </div>
//     );
// };

// export default PlayerCard;





















import React, { useEffect, useState } from "react";
import { CLOUDINARY_BASE_URL } from "../../config/config";

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
      <div
        className="bg-cover bg-center bg-no-repeat w-1/2 h-full absolute right-0"
        style={{ backgroundImage: `url(${CLOUDINARY_BASE_URL}${player.playerPhotoURL}.jpg)` }}
      ></div>
      <div
        className="h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-100"
        style={{ backgroundColor: teamColor }}
      >
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
      </div>
    </div>
  );
};

export default PlayerCard;
