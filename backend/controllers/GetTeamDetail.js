import Team from "../models/team.js";

export const GetTeamDetail = async(req,res) => {
    console.log("GetTeamDetail request ---- received");

    const {teamId} = req.params;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
          return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};