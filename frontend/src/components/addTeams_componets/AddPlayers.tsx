
import axios from "axios";
import {useEffect, useState } from "react";
//import store from "../../redux/store";
//import * as actionTypes from '../../redux/actionTypes';
import PlayerCard from "./PlayerCard";
import { API_BASE_URL } from "../../config/config";

interface Player {
    _id:string;
    id:string;
    name: string;
    jerseyNumber: number;
    position: string;
    age: number;
    affiliation: string;
    phoneNumber: string;
    playerPhotoURL: string;        
}


function AddPlayers({ teamName, primaryColor }: { teamName: string, primaryColor:string }) {
    const [playerList,setPlayerList] = useState<Player[]>([]);
    const [toggleAdd, setToggleAdd] = useState(false);

    const [name, setName] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [position, setPosition] = useState("");
    const [age, setAge] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const playerPositions = ["Point Guard (PG)", "Shooting Guard (SG)", "Small Forward (SF)", "Power Forward (PF)", "Center (C)"];


        // Fetch player data on component mount
        useEffect(() => {
            // Define an asynchronous function to fetch players
            const fetchPlayers = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/get-players`);
                    // Set the player list state with the fetched data
                    setPlayerList(response.data.players);
                } catch (error) {
                    console.error("Error fetching players:", error);
                }
            };
    
            // Call the fetchPlayers function
            fetchPlayers();
        }, []);

    const handelToggleAdd = () => {
        setToggleAdd(!toggleAdd);
    }

    const handleAddPlayer = async (event: React.FormEvent) => {
        event.preventDefault();

        const newPlayer = {
            name,
            jerseyNumber,
            position,
            age,
            affiliation: `${affiliation}, ${teamName}`,
            phoneNumber
        };

        // Log the data being sent
        console.log("Sending data to backend:", newPlayer);

        axios.post(`${API_BASE_URL}/addplayer-req`, newPlayer)
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                alert("Player Added to database");
            }
            else
            {
                throw new Error("Server responded with non-success status for addplayer request");
            }
        })
        .catch(error => {
            console.error("AddPlayer Error: ", error);
        })

        // Clear the form fields
        handelToggleAdd();
        setName("");
        setJerseyNumber("");
        setPosition("");
        setAge("");
        setAffiliation("");
        setPhoneNumber("");
    };

    return (
        <div className="relative items-center justify-center h-screen">
            <div className="flex w-full mx-auto bg-neutral-100 rounded-lg overflow-hidden">
                <div className="flex flex-col w-full p-6">
                    <h2 className="text-xl font-semibold mb-3 ">Player</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {playerList.map((player) => (
                            <PlayerCard isSelected={false} onSelect={()=>""} key={player.id} player={player} teamColor={primaryColor} />
                        ))}
                    </div>
                    {!toggleAdd ?
                        <div className="flex space-y-4 p-4 mb-4 justify-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onClick={handelToggleAdd}>
                                Add Player
                            </button>
                        </div>
                        :
                        <form onSubmit={handleAddPlayer} className="space-y-4 p-4 mb-4 bg-white rounded-lg shadow">
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <input
                                className="w-1/2 p-2 border rounded"
                                type="number"
                                value={jerseyNumber}
                                onChange={e => setJerseyNumber(e.target.value)}
                                placeholder="Jersey Number"
                                required
                            />
                            <select
                                className="w-1/2 p-2 border rounded"
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                                required
                            >
                                <option value="">Select Position</option>
                                {playerPositions.map((pos) => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))}
                            </select>
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                                placeholder="Age"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                value={affiliation}
                                onChange={e => setAffiliation(e.target.value)}
                                placeholder="Affiliation"
                            />
                            <input
                                className="w-full p-2 border rounded"
                                type="text"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                            />
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded"
                            >
                                Save Player
                            </button>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddPlayers;
