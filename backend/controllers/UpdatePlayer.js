import Player from "../models/player.js";
import Team from "../models/team.js";

export const UpdatePlayer = async (req, res) => {
    const { teamId, playerId } = req.params;
    const updatedPlayerData = req.body;

    try {
        // First check if the team exists
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Check if the player exists and belongs to the team
        const player = await Player.findOne({ _id: playerId, teamId: teamId });
        if (!player) {
            return res.status(404).json({ message: "Player not found or does not belong to this team" });
        }

        // Check if the jersey number is being changed and if it's unique within the team
        if (updatedPlayerData.jerseyNumber !== player.jerseyNumber) {
            const existingPlayer = await Player.findOne({
                teamId: teamId,
                jerseyNumber: updatedPlayerData.jerseyNumber,
                _id: { $ne: playerId } // Exclude current player from check
            });

            if (existingPlayer) {
                return res.status(400).json({
                    message: `Jersey number ${updatedPlayerData.jerseyNumber} is already taken in this team`
                });
            }
        }

        // Update the player
        const updatedPlayer = await Player.findByIdAndUpdate(
            playerId,
            {
                name: updatedPlayerData.name,
                jerseyNumber: updatedPlayerData.jerseyNumber,
                position: updatedPlayerData.position,
                age: updatedPlayerData.age,
                affiliation: updatedPlayerData.affiliation,
                phoneNumber: updatedPlayerData.phoneNumber,
                playerPhotoURL: updatedPlayerData.playerPhotoURL
            },
            { new: true } // Return the updated document
        );

        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json({
            message: "Player updated successfully",
            player: updatedPlayer
        });

    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({
            message: "Error updating player",
            error: error.message
        });
    }
};

