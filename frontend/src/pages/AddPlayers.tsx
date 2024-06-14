

// import { useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { useState, useEffect } from "react";
// import store from "../redux/store";
// //import * as actionTypes from "../redux/actionTypes";
// import PlayerCard from "../components/addTeams_componets/PlayerCard";
// import { API_BASE_URL } from "../config/config";

// function AddPlayers() {
//   const location = useLocation();
//   const { teamData } = location.state;
//   console.log("AddPlayers.tsx mein teamData jo pass ho raha hai:  ", teamData);
//   const { _id: teamId, name: teamName, primaryColor } = teamData;

//   const [playerList, setPlayerList] = useState([]);
//   const [toggleAdd, setToggleAdd] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [name, setName] = useState("");
//   const [jerseyNumber, setJerseyNumber] = useState("");
//   const [position, setPosition] = useState("");
//   const [age, setAge] = useState("");
//   const [affiliation, setAffiliation] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const navigate = useNavigate();

//   const playerPositions = [
//     "Point Guard (PG)",
//     "Shooting Guard (SG)",
//     "Small Forward (SF)",
//     "Power Forward (PF)",
//     "Center (C)",
//   ];

//   useEffect(() => {
//     const fetchExistingPlayers = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/get-players/${teamId}`);
//         if (response.status === 200) {
//           console.log("Response from get PLayers: ",response)
//           setPlayerList(response.data.players);
//         } else {
//           console.error("Failed to fetch players");
//         }
//       } catch (error) {
//         console.error("Fetch Players Error:", error);
//       }
//     };

//     fetchExistingPlayers();

//     const unsubscribe = store.subscribe(() => {
//       setPlayerList(store.getState());
//     });

//     return unsubscribe;
//   }, [teamId]);

//   const handleToggleAdd = () => {
//     setToggleAdd(!toggleAdd);
//   };

//   const handleConfirm = () => {
//     navigate('/dashboard');
//   };

//   const handleAddPlayer = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const newPlayer = {
//       name,
//       jerseyNumber,
//       position,
//       age,
//       affiliation: `${affiliation}, ${teamName}`,
//       phoneNumber,
//       teamId, // Include the teamId
//     };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/addplayer-req`,
//         newPlayer
//       );
//       if (response.status >= 200 && response.status < 300) {
//         alert("Player Added to database and the team");
//         window.location.reload();

//         // Dispatch action to redux store only after successful response
//         // store.dispatch({
//         //   type: actionTypes.PLAYER_ADD,
//         //   payload: newPlayer,
//         // });

//         // Clear the form fields
//         handleToggleAdd();
//         setName("");
//         setJerseyNumber("");
//         setPosition("");
//         setAge("");
//         setAffiliation("");
//         setPhoneNumber("");
//         setErrorMessage(""); // Clear any previous error messages
//       } else {
//         throw new Error(
//           "Server responded with non-success status for addplayer request"
//         );
//       }
//     } catch (error) {
//       console.error("AddPlayer Error:", error);
//       setErrorMessage("Failed to add player. Please try again."); // Set the error message
//     }
//   };

//   return (
//     <div className="relative items-center justify-center h-screen">
//       <div className="flex w-full mx-auto bg-neutral-100 rounded-lg overflow-hidden">
//         <div className="flex flex-col w-full p-6">
//           <h2 className="text-xl font-semibold mb-3">Player</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {playerList.map((player) => (
//               <PlayerCard
//                 key={player.id}
//                 player={player}
//                 teamColor={primaryColor}
//               />
//             ))}
//           </div>
//           {!toggleAdd ? (
//             <div className="flex space-y-4 p-4 mb-4 justify-center">
//               <button
//                 className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
//                 onClick={handleToggleAdd}
//               >
//                 Add Player
//               </button>
//             </div>
//           ) : (
//             <form
//               onSubmit={handleAddPlayer}
//               className="space-y-4 p-4 mb-4 bg-white rounded-lg shadow"
//             >
//               {errorMessage && (
//                 <div className="text-red-600">{errorMessage}</div>
//               )}{" "}
//               {/* Display error message */}
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 required
//               />
//               <input
//                 className="w-1/2 p-2 border rounded"
//                 type="number"
//                 value={jerseyNumber}
//                 onChange={(e) => setJerseyNumber(e.target.value)}
//                 placeholder="Jersey Number"
//                 required
//               />
//               <select
//                 className="w-1/2 p-2 border rounded"
//                 value={position}
//                 onChange={(e) => setPosition(e.target.value)}
//                 required
//               >
//                 <option value="">Select Position</option>
//                 {playerPositions.map((pos) => (
//                   <option key={pos} value={pos}>
//                     {pos}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 placeholder="Age"
//               />
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 value={affiliation}
//                 onChange={(e) => setAffiliation(e.target.value)}
//                 placeholder="Affiliation"
//               />
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Phone Number"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
//               >
//                 Add Player
//               </button>
//               <button
//                 type="button"
//                 className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
//                 onClick={handleToggleAdd}
//               >
//                 Cancel
//               </button>
//             </form>
//           )}
//           <button
//             type="button"
//             className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
//             onClick={handleConfirm}
//           >
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import PlayerCard from "../components/addTeams_componets/PlayerCard";
import { API_BASE_URL } from "../config/config";
import { Image } from "cloudinary-react"; // Add Image import

interface Player {
  id:string;
  _id:string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
  teamId: string;
  playerPhotoURL: string;
}

function AddPlayers() {
  const location = useLocation();
  const { teamData } = location.state;
  const { _id: teamId, name: teamName, primaryColor } = teamData;

  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [playerImage, setPlayerImage] = useState<File>();
  const [imageData, setImageData] = useState<any>(null);

  const playerPositions = [
    "Point Guard (PG)",
    "Shooting Guard (SG)",
    "Small Forward (SF)",
    "Power Forward (PF)",
    "Center (C)",
  ];

  useEffect(() => {
    const fetchExistingPlayers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-players/${teamId}`);
        if (response.status === 200) {
          setPlayerList(response.data.players);
        } else {
          console.error("Failed to fetch players");
        }
      } catch (error) {
        console.error("Fetch Players Error:", error);
      }
    };

    fetchExistingPlayers();

    // const unsubscribe = store.subscribe(() => {
    //   setPlayerList(store.getState());
    // });

  //   return unsubscribe;
   }, [teamId]);

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const handleConfirm = () => {
    navigate('/dashboard');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPlayerImage(file);
    }
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", playerImage as File);
    formData.append("upload_preset", "vt1zjl7d");

    const postImage = async () => {
      try {
        const imgresponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
          formData
        );
        setImageData(imgresponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    postImage();
  };

  // const handleAddPlayer = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const newPlayer: Player = {
  //     id:'',
  //     _id:'',
  //     name,
  //     jerseyNumber: parseInt(jerseyNumber),
  //     position,
  //     age: parseInt(age),
  //     affiliation: `${affiliation}, ${teamName}`,
  //     phoneNumber,
  //     teamId,
  //     playerPhotoURL: imageData?.public_id || "" // Include the player photo URL
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/addplayer-req`,
  //       newPlayer
  //     );
  //     if (response.status >= 200 && response.status < 300) {
  //       alert("Player Added to database and the team");
  //       window.location.reload();

  //       handleToggleAdd();
  //       setName("");
  //       setJerseyNumber("");
  //       setPosition("");
  //       setAge("");
  //       setAffiliation("");
  //       setPhoneNumber("");
  //       setErrorMessage("");
  //     } else {
  //       throw new Error(
  //         "Server responded with non-success status for addplayer request"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("AddPlayer Error:", error);
  //     setErrorMessage("Failed to add player. Please try again.");
  //   }
  // };
  const handleAddPlayer = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const newPlayer: Player = {
      id:'',
      _id:'',
      name,
      jerseyNumber: parseInt(jerseyNumber),
      position,
      age: parseInt(age),
      affiliation: `${affiliation}, ${teamName}`,
      phoneNumber,
      teamId,
      playerPhotoURL: imageData?.public_id || "" // Include the player photo URL
    };
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addplayer-req`,
        newPlayer
      );
      if (response.status >= 200 && response.status < 300) {
        alert("Player Added to database and the team");
  
        // Update playerList state with the newly added player
        setPlayerList(prevPlayerList => [...prevPlayerList, newPlayer]);
  
        handleToggleAdd();
        setName("");
        setJerseyNumber("");
        setPosition("");
        setAge("");
        setAffiliation("");
        setPhoneNumber("");
        setErrorMessage("");
      } else {
        throw new Error(
          "Server responded with non-success status for addplayer request"
        );
      }
    } catch (error) {
      console.error("AddPlayer Error:", error);
      setErrorMessage("Failed to add player. Please try again.");
    }
  };
  return (
    <div className="relative items-center justify-center h-screen">
      <div className="flex w-full mx-auto bg-neutral-100 rounded-lg overflow-hidden">
        <div className="flex flex-col w-full p-6">
          <h2 className="text-xl font-semibold mb-3">Player</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {playerList.map((player) => (
              <PlayerCard
                isSelected = {false}
                onSelect={()=>''}
                key={player.id}
                player={player}
                teamColor={primaryColor}
              />
            ))}
          </div>
          {!toggleAdd ? (
            <div className="flex space-y-4 p-4 mb-4 justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={handleToggleAdd}
              >
                Add Player
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleAddPlayer}
              className="space-y-4 p-4 mb-4 bg-white rounded-lg shadow"
            >
              {errorMessage && (
                <div className="text-red-600">{errorMessage}</div>
              )}
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                className="w-1/2 p-2 border rounded"
                type="number"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                placeholder="Jersey Number"
                required
              />
              <select
                className="w-1/2 p-2 border rounded"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select Position</option>
                {playerPositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="Affiliation"
              />
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={uploadImage}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Upload Image
              </button>
              {imageData && (
                <Image
                  cloudName="dm56xy1oj"
                  publicId={imageData.public_id}
                  width="300"
                  crop="scale"
                />
              )}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Add Player
              </button>
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={handleToggleAdd}
              >
                Cancel
              </button>
            </form>
          )}
          <button
            type="button"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
            onClick={handleConfirm}
          >

            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPlayers;
