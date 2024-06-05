import Team from "../models/team.js";

export const UpdateTeam = async(req,res) => {
    console.log("Update Team request -- received", req.body);

    const { id } = req.params;
    const { name, primaryColor, secondaryColor, coach, teamManager, players, teamPhotoURL } = req.body;

    try{
        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            {
              name,
              primaryColor,
              secondaryColor,
              coach,
              teamManager,
              players,
              teamPhotoURL
            },
            { new: true } // Return the updated document
          );
      
          if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
          }
      
          res.status(200).json(updatedTeam);
    }

    catch(error) 
    {
        console.error("Error updating team:", error);
        res.status(500).json({ message: 'Failed to update team', error: error.message });
    }
};