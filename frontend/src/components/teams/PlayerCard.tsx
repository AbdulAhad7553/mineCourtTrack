import React from "react";

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
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="p-4 mb-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold">{player.name} (#{player.jerseyNumber})</h3>
            <p>Position: {player.position}</p>
            <p>Age: {player.age}</p>
            <p>Affiliation: {player.affiliation}</p>
            <p>Phone: {player.phoneNumber}</p>
        </div>
    );
}

export default PlayerCard;
