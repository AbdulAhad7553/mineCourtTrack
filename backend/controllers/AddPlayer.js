import Player from "../models/player";


export const AddPlayer = async(req,res)=> {
    console.log("AddPlayer request -- received");
    try{
        const {name, jerseyNumber, position, age, affiliation, phoneNumber} = req.body;

        const newPlayer = new Player({
            name,
            jerseyNumber,
            position,
            age,
            affiliation,
            phoneNumber
        });

        //Saving the new player to database
        const savedPlayer = await newPlayer.save();

        console.log("Player added in the database successfully");
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