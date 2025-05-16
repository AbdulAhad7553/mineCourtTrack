import Team from "../models/team.js";
import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";
import Player from "../models/player.js";

export const AddPlayer = async(req,res)=> {
    console.log("AddPlayer request -- received", req.body);
    try{
        const {name, jerseyNumber, position, age, affiliation, phoneNumber, teamId, playerPhotoURL} = req.body;

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
            teamId,
            playerPhotoURL
        });

        //Saving the new player to database
        const savedPlayer = await newPlayer.save();
        console.log("saved_player:  ", savedPlayer);
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

export const RemovePlayer = async (req, res) => {
    console.log("RemovePlayer request -- received");
    const { teamId, playerId } = req.params;
  
    try {
      // Find the team and remove the player reference
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      team.players = team.players.filter(player => player.toString() !== playerId);
      await team.save();
  
      // Remove all game stats related to the player
     // await GameStat.deleteMany({ playerId });
  
      // Remove the player from the Player collection
      const result = await Player.deleteOne({ _id: playerId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
  
      res.status(200).json({ message: 'Player removed successfully' });
    } catch (error) {
      console.error('Error removing player:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const GetPlayers = async (req,res) => {
    const { teamId } = req.params;
    console.log("Get Players request -- received for teamId:", teamId);
    try {
        const players = await Player.find({ teamId });
        res.status(200).json({ players });
        
    } catch(error) {
        console.error("Error fetching players: ", error);
        res.status(500).json({ message: "Failed to fetch players", error: error.message});
    }
};

export const GetPlayersCount = async(req,res) => {
    console.log("GetPlayersCount request  --- received");
    try {
        const playerCount = await Player.countDocuments();
        res.json({ count: playerCount });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching the player count' });
      }
};


export const getPlayerStats = async (req, res) => {
    const { playerId } = req.params;

    try {
        // Fetch player details
        const player = await Player.findById(playerId).populate('gameStats');
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Fetch player's team ID
        const playerTeamId = player.teamId;

        // Populate game details for each gameStat
        const statsWithGames = await GameStat.find({ playerId }).populate('gameId');

        // Format stats with game dates and opponent
        const formattedStats = await Promise.all(statsWithGames.map(async stat => {
            const game = await Game.findById(stat.gameId).populate(['homeTeamId', 'awayTeamId']);
            const opponentTeamId = game.homeTeamId.equals(playerTeamId) ? game.awayTeamId : game.homeTeamId;
            const opponentTeam = await Team.findById(opponentTeamId);

            return {
                date: stat.gameId.date,
                points: stat.points,
                assists: stat.assists,
                blocks: stat.blocks,
                rebounds: stat.rebounds,
                steals: stat.steals,
                fouls: stat.fouls,
                opponent: opponentTeam.name,  // Adding opponent team name
            };
        }));

        res.status(200).json({ stats: formattedStats });
        
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

