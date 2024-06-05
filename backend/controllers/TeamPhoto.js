import Team from "../models/team.js";

export const TeamPhoto = async (req,res) => {
    console.log('TeamPhoto request --- received');
    
    try {
        const teamId = req.params.teamId;
        const result = req.file;
        const team = await Team.findByIdAndUpdate(
          teamId,
          { photoUrl: result.path },
          { new: true }
        );
        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};