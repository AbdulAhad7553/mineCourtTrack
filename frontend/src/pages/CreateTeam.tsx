import { useState } from "react";
import Navbar from "../components/Navbar";
import EnterTeamDetail from "../components/teams/EnterTeamDetail";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [secondaryColor, setSecondaryColor] = useState('#000000');

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-700">
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
                <div className="flex p-8 h-full"> {/* Adjusted for full height and flex layout */}
                    <div className="flex flex-col flex-1 mr-6">
                    
                    </div>
                    <div className="flex flex-col flex-1">
                        sdasda
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam;