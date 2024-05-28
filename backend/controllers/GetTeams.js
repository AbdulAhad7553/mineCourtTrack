import Team from "../models/team.js";

export const GetTeams = async (req, res) => {
  console.log("Get Teams request -- received");

  try {
    const teams = await Team.find().populate("players");
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch teams", error: error.message });
  }
};
