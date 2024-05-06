import { useState } from "react";
import Navbar from "../components/utils/Navbar";
import EnterTeamDetail from "../components/teams/EnterTeamDetail";
import AddPlayers from "../components/teams/AddPlayers";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [secondaryColor, setSecondaryColor] = useState('#000000');

    return (
        <div className="flex items-center justify-center h-full bg-zinc-700">
            <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg">
                <Navbar/>
                <EnterTeamDetail 
                    teamName={teamName}
                    setTeamName={setTeamName}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    secondaryColor={secondaryColor}
                    setSecondaryColor={setSecondaryColor}
                />
                <div className="relative h-full mt-5">
                    <AddPlayers teamName={teamName}/>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam;