


import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EnterTeamDetail from "../components/addTeams_componets/EnterTeamDetail";
import { API_BASE_URL } from "../config/config";
import { Image } from "cloudinary-react"

const CreateTeams = () => {
  const [teamName, setTeamName] = useState("");
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState('#000000');
  const [coach, setCoach] = useState("");
  const [teamManager, setTeamManager] = useState("");
  //const [teamId, setTeamId] = useState(null);
  const navigate = useNavigate();
  const [teamImage, setTeamImage] = useState<File>();
  const [imageData, setImageData] = useState<any>(null);



  const uploadImage = () => {
    const formData = new FormData()
    formData.append("file", teamImage as Blob);
    formData.append("upload_preset", "vt1zjl7d")
    // Replace YOUR_UPLOAD_PRESET with your cloudinary upload_preset which looks something like this: sdfmpeitro

    const postImage = async () => {
      try {
        const imgresponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
          formData
          // Replace YOUR_CLOUD_NAME with your cloudName which you can find in your Dashboard
        )
        setImageData(imgresponse.data)
      } catch (error) {
        console.error(error)
      }
    }

    postImage();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTeamImage(file);
    }
  };


  const handleCreateTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTeam = {
      name: teamName,
      primaryColor,
      secondaryColor,
      coach,
      teamManager,
      teamPhotoURL: imageData.public_id
    };
    

    try {
      console.log("Sending team data to the backend -- ", newTeam);
      const response = await axios.post(`${API_BASE_URL}/addteam-req`, newTeam);
      if (response.status === 201) {
        alert("Team created successfully");
        const teamData = response.data.teamData;
        console.log("teamData jo backend se mangwaya hai :  ", teamData);
        //setTeamId(response.data._id); // Save the team ID
        navigate('/addplayers', { state: {teamData}});
      } else {
        throw new Error("Error creating team");
      }
    } catch (error) {
      console.error("CreateTeam Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-700">
      <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg">
        <Navbar/>
        <Sidebar/>
        <EnterTeamDetail 
          teamName={teamName}
          setTeamName={setTeamName}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          coach = {coach}
          setCoach = {setCoach}
          teamManager = {teamManager}
          setTeamManager = {setTeamManager}
        />
        <div className='mt-5 mb-5'>*Please select the image and first upload the image. After the image is displayed on your screen, then Create Team.</div>
        <div className="flex justify-center mt-5">

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={uploadImage}>Upload Image</button>

          {/* Display uploaded image */}
          {imageData && (
            <div className='ml-10'>
            <Image
            
              cloudName="dm56xy1oj"
              publicId={imageData.public_id}
              width="300"
              crop="scale"
            />
            </div>
          )}
          
          <div className="w-full flex justify-center">
  <button
    className="block bg-green-600 hover:bg-blue-800 text-white mb-2 font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
    onClick={handleCreateTeam}
  >
    Create Team
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default CreateTeams;
