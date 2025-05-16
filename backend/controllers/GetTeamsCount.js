import Team from "../models/team.js";

export const GetTeamsCount = async(req,res) => {
    console.log("GetTeamsCount request  --- received");
    try {
        const teamCount = await Team.countDocuments();
        res.json({ count: teamCount });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching the team count' });
      }
};