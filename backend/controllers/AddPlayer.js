import Player from "../models/player.js";
import Team from "../models/team.js";


export const AddPlayer = async(req,res)=> {
    console.log("AddPlayer request -- received");
    try{
        const {name, jerseyNumber, position, age, affiliation, phoneNumber, teamId} = req.body;

        // Find the team by its teamId
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }


        const newPlayer = new Player({
            name,
            jerseyNumber,
            position,
            age,
            affiliation,
            phoneNumber,
            teamId
        });

        //Saving the new player to database
        const savedPlayer = await newPlayer.save();

        // Add the player to the team's players array
        team.players.push(savedPlayer._id);

        // Save the updated team document
        await team.save();

        console.log("Player added in the database and the team successfully");
        // Sending success response
        res.status(201).json({
            message: "Player added successfully",
            player: savedPlayer
        });
    }
    catch(error){
        console.error("Error adding player:", error);

        //Sending an error response
        res.status(500).json({
            message:"Failed to add player",
            error: error.message
        });
    }
};