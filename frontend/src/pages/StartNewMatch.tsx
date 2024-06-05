import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../config/config";
import PlayerCard from '../components/addTeams_componets/PlayerCard';

const StartNewMatch = () => {
    const [teams, setTeams] = useState([]);
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [homeStartingFive, setHomeStartingFive] = useState([]);
    const [awayStartingFive, setAwayStartingFive] = useState([]);
    const [homeSubstitutes, setHomeSubstitutes] = useState([]);
    const [awaySubstitutes, setAwaySubstitutes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/get-teams`);
                setTeams(response.data.teams);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const handleTeamSelect = async (teamId, type) => {
        if (type === 'home') {
            setHomeTeam(teamId);
            try {
                const response = await axios.get(`${API_BASE_URL}/get-players/${teamId}`);
                setHomePlayers(response.data.players);
                setHomeStartingFive([]);
                setHomeSubstitutes([]);
            } catch (error) {
                console.error("Fetch Players Error:", error);
            }
        } else {
            setAwayTeam(teamId);
            try {
                const response = await axios.get(`${API_BASE_URL}/get-players/${teamId}`);
                setAwayPlayers(response.data.players);
                setAwayStartingFive([]);
                setAwaySubstitutes([]);
            } catch (error) {
                console.error("Fetch Players Error:", error);
            }
        }
    };

    const handlePlayerSelect = (player, type) => {
        if (type === 'home') {
            if (homeStartingFive.includes(player)) {
                setHomeStartingFive(homeStartingFive.filter(p => p !== player));
            } else if (homeStartingFive.length < 5) {
                setHomeStartingFive([...homeStartingFive, player]);
            }
            updateHomeSubstitutes([...homeStartingFive, player], homePlayers);
        } else {
            if (awayStartingFive.includes(player)) {
                setAwayStartingFive(awayStartingFive.filter(p => p !== player));
            } else if (awayStartingFive.length < 5) {
                setAwayStartingFive([...awayStartingFive, player]);
            }
            updateAwaySubstitutes([...awayStartingFive, player], awayPlayers);
        }
    };

    const updateHomeSubstitutes = (startingFive, allPlayers) => {
        const substitutes = allPlayers.filter(player => !startingFive.includes(player));
        setHomeSubstitutes(substitutes);
    };

    const updateAwaySubstitutes = (startingFive, allPlayers) => {
        const substitutes = allPlayers.filter(player => !startingFive.includes(player));
        setAwaySubstitutes(substitutes);
    };

    const startMatch = () => {
        if (homeStartingFive.length !== 5 || awayStartingFive.length !== 5) {
            setErrorMessage('Please select exactly 5 players for both home and away teams.');
            return;
        }

        const matchData = {
            homeTeam,
            awayTeam,
            homeStartingFive,
            awayStartingFive,
            homeSubstitutes,
            awaySubstitutes,
        };

        console.log("Match Data: ", matchData);

        axios.post(`${API_BASE_URL}/newgame/`, matchData)
            .then(response => {
                console.log("Response.data: ", response.data);
                alert('Game Created Successfully!');
                navigate(`/match/${response.data.game._id}`, { state: { homeStartingFive, awayStartingFive, homeSubstitutes, awaySubstitutes } });
            })
            .catch(error => console.error('Error starting match:', error));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-700">
            <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg p-6 overflow-auto">
                <h2 className="text-xl font-semibold mb-3">Start a New Match</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Home Team:</label>
                    <select className="w-full p-2 border rounded" onChange={(e) => handleTeamSelect(e.target.value, 'home')}>
                        <option value="">Select Home Team</option>
                        {teams.map(team => (
                            <option key={team._id} value={team._id}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Away Team:</label>
                    <select className="w-full p-2 border rounded" onChange={(e) => handleTeamSelect(e.target.value, 'away')}>
                        <option value="">Select Away Team</option>
                        {teams.map(team => (
                            <option key={team._id} value={team._id}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-3">Home Team Starting Five</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {homePlayers.map(player => (
                            <PlayerCard
                                key={player._id}
                                player={player}
                                teamColor={teams.find(team => team._id === homeTeam)?.primaryColor || '#FFFFFF'}
                                isSelected={homeStartingFive.includes(player)}
                                onSelect={() => handlePlayerSelect(player, 'home')}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-3">Away Team Starting Five</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {awayPlayers.map(player => (
                            <PlayerCard
                                key={player._id}
                                player={player}
                                teamColor={teams.find(team => team._id === awayTeam)?.primaryColor || '#FFFFFF'}
                                isSelected={awayStartingFive.includes(player)}
                                onSelect={() => handlePlayerSelect(player, 'away')}
                            />
                        ))}
                    </div>
                </div>
                {errorMessage && (
                    <div className="text-red-500 font-bold mb-4">{errorMessage}</div>
                )}
                <button
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    onClick={startMatch}
                >
                    Start Match
                </button>
            </div>
        </div>
    );
};

export default StartNewMatch;
