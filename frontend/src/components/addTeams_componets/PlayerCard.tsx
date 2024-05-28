import React, { useEffect, useState } from "react";
import '../../assets/fonts/fonts.css';

interface Player {
    id: number;
    name: string;
    jerseyNumber: number;
    position: string;
    age: number;
    affiliation: string;
    phoneNumber: string;
}

interface PlayerCardProps {
    player: Player;
    teamColor: string; // Ensure teamColor is part of the props
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, teamColor }) => {
    const [textColor, setTextColor] = useState('#000000');

    const updateTextColor = (hexColor: string) => {
        // Validate hexColor before processing
        if (!hexColor || typeof hexColor !== 'string') return;

        // Remove the hash at the start if it's there
        const hex = hexColor.replace('#', '');
        if (hex.length !== 6) return; // Ensure hex is valid

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // Using the luminance formula to determine the brightness of the background
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (luminance > 0.4) {
            setTextColor('#000000');  // Dark text for light backgrounds
        } else {
            setTextColor('#FFFFFF');  // Light text for dark backgrounds
        }
    };

    useEffect(() => {
        updateTextColor(teamColor);  // Update text color initially or when teamColor changes
    }, [teamColor]);

    const backgroundGradientStyle = {
        background: `linear-gradient(to left, ${teamColor}  100%, ${teamColor}00 100%)`,  // Gradual fade to transparent
        padding: '20px',
        color: textColor,
        minHeight: '100px',  // Ensure it's visible enough for demonstration
        width: '100%'
    };

    return (
        <div className="flex p-4 mb-4 rounded-lg shadow border border-black border-1" style={backgroundGradientStyle}>
            <div className="w-3/5">
                <h2 className="text-xl font-bold">{player.name} (#{player.jerseyNumber})</h2>
                <p>Position: {player.position}</p>
                <p>Age: {player.age}</p>
                <p>Affiliation: {player.affiliation}</p>
                <p>Phone: {player.phoneNumber}</p>
            </div>
            <div className="flex w-2/5 justify-center ">
                <h2 className="text-9xl font-atlanta">{player.jerseyNumber}</h2>
            </div>
        </div>
    );
}

export default PlayerCard;
