import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import {CLOUDINARY_BASE_URL} from "../../config/config.tsx";
import { useNavigate } from 'react-router-dom';

interface Game {
  _id: string;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamPhotoURL?: string; // Add these optional fields
  awayTeamPhotoURL?: string; // Add these optional fields
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  const [homeTeamPhoto, setHomeTeamPhoto] = useState<string>('');
  const [awayTeamPhoto, setAwayTeamPhoto] = useState<string>('');

  useEffect(() => {
    const fetchTeamPhotos = async () => {
      try {
        const homeResponse = await fetch(`${API_BASE_URL}/get-team-detail/${game.homeTeamId}`);
        const homeData = await homeResponse.json();
        console.log("homeDATA: ",homeData);
        setHomeTeamPhoto(homeData.teamPhotoURL);

        const awayResponse = await fetch(`${API_BASE_URL}/get-team-detail/${game.awayTeamId}`);
        const awayData = await awayResponse.json();
        setAwayTeamPhoto(awayData.teamPhotoURL);
      } catch (error) {
        console.error('Error fetching team photos:', error);
      }
    };

    fetchTeamPhotos();
  }, [game.homeTeamId, game.awayTeamId]);

  return (
    <div className='ml-20 mt-10'>
      <div onClick={() => navigate(`/view-match/${game._id}`)} className="fixed mt-20 w-570 h-300 p-6 bg-[#113f5f] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-64">
        <div className="text-center text-white mb-4">
          <p className="font-normal">Most Recent Match</p>
          <hr className="border-t border-dotted border-gray-400 my-2" />

        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="w-36 h-36 bg-gray-300 rounded-lg m-5">
            {homeTeamPhoto && (
              <div
                className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg"
                style={{ backgroundImage: `url(${CLOUDINARY_BASE_URL}${homeTeamPhoto}.jpg)` }}
              ></div>
            )}
          </div>
          <div className="text-center">
            <p className="text-white text-lg mb-4">{new Date(game.date).toLocaleDateString()}</p>
            <div className="flex items-center justify-center">
              <span className={`${game.homeTeamScore > game.awayTeamScore ? 'text-green-400' : 'text-red-400'} text-5xl font-bold`}>{game.homeTeamScore}</span>
              <span className="text-white mx-2 text-5xl">-</span>
              <span className={`${game.awayTeamScore > game.homeTeamScore ? 'text-green-400' : 'text-red-400'} text-5xl font-bold`}>{game.awayTeamScore}</span>
            </div>
          </div>
          <div className="w-36 h-36 bg-gray-300 rounded-lg m-5">
            {awayTeamPhoto && (
              <div
                className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg"
                style={{ backgroundImage: `url(${CLOUDINARY_BASE_URL}${awayTeamPhoto}.jpg)` }}
              ></div>
            )}
          </div>
        </div>
        <div className="flex justify-between text-white">
          <span className="font-bold text-lg ml-12">{game.homeTeamName}</span>
          <span className="font-bold text-lg mr-14">{game.awayTeamName}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
