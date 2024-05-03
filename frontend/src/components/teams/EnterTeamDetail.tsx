import { useState } from "react"


const EnterTeamDetail = ({ teamName, setTeamName, primaryColor, setPrimaryColor,secondaryColor,setSecondaryColor }) => {
    // const [teamName, setTeamName] = useState("");
    const [teamNameError, setTeamNameError] = useState(false);
    const [inputWidth, setInputWidth] = useState('250px');
    // const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    // const [secondaryColor, setSecondaryColor] = useState('#000000');

    const handelTeamNameChange = (e) => {
        const name = e.target.value;
        if(name.length <= 1){
            setTeamNameError(true);
        }
        else{
            setTeamNameError(false);
        }
;
        setTeamName(name);

        const newWidth = Math.min(Math.max(250, name.length * 10),400) + 'px';
        setInputWidth(newWidth);
    }

    return (
        <div className="relative w-4/5 mt-5 mx-6">
            <h1 className="text-2xl font-bold mb-4">Team Info</h1>
            <div className="flex h-full">
                <div className="flex items-center space-x-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">New Team Name</label>
                        <input type="text"
                            id="team-name"
                            className="rounded px-1 py-1"
                            style={{ width: inputWidth }}
                            placeholder="Enter team name"
                            value={teamName}
                            onChange={handelTeamNameChange}/>
                        {teamNameError && <p className="text-red-500 text-xs italic">Username must be 2 characters long</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Primary Kit Colour</label>
                        <input type="color"
                            id="primary-color"
                            value={primaryColor}
                            onChange={e => setPrimaryColor(e.target.value)}
                            className="w-12 h-12 rounded-full cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Secondary Kit Colour</label>
                        <input type="color"
                            id="secondary-color"
                            value={secondaryColor}
                            onChange={e => setSecondaryColor(e.target.value)}
                            className="w-12 h-12 rounded-full cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterTeamDetail