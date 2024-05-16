import Team from "../models/team.js";
export const AddTeam = async(req,res)=>{
    console.log("AddTeam request -- received");
    try{
        const { name, primaryColor, secondaryColor, coach, teamManager } = req.body;

        const newTeam = new Team({
            name,
            primaryColor,
            secondaryColor,
            coach,
            teamManager
        });

        const savedTeam = await newTeam.save();

        console.log("Team added in the database successfully");
        res.status(201).json({
            message: "Team added successfully",
            player: savedTeam
        });
    }
    catch(error){
        console.error("Error adding player:", error);

        //Sending an error response
        res.status(500).json({
            message:"Failed to add team",
            error: error.message
        });
    }
};