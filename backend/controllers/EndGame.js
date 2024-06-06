import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";
import Player from "../models/player.js";
import Team from "../models/team.js";

export const EndGame = async (req, res) => {
  console.log("End Match request --- received.");
  const { gameId } = req.params;
  const { homeTotalScore, awayTotalScore, homeTeam, awayTeam, homeTeamName, awayTeamName } = req.body;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).send({ error: 'Game not found' });
    }

    // Update game scores
    game.homeTeamScore = homeTotalScore;
    game.awayTeamScore = awayTotalScore;

    //Setting the names of the Teams for the game
    game.homeTeamName = homeTeamName;
    game.awayTeamName = awayTeamName;

    // Save player stats
    const savePlayerStats = async (team) => {
      const statsPromises = team.map(async (player) => {
        const playerObj = await Player.findOne({ _id: player.id });

        if (!playerObj) {
          throw new Error(`Player not found: ${player.id}`);
        }

        const { stats } = player;
        const { '1Pts': points1, '2Pts': points2, '3Pts': points3, assists, blocks, rebounds, steals, fouls } = stats;

        return new GameStat({
          playerId: playerObj._id,
          gameId: game._id,
          points: (points1 || 0) + (points2 || 0) * 2 + (points3 || 0) * 3,
          assists: assists || 0,
          blocks: blocks || 0,
          rebounds: rebounds || 0,
          steals: steals || 0,
          fouls: fouls || 0
        }).save();
      });

      return Promise.all(statsPromises);
    };

    const homeTeamStats = await savePlayerStats(homeTeam);
    const awayTeamStats = await savePlayerStats(awayTeam);

    // Update game with player stats references
    game.playerStats = [...homeTeamStats.map(stat => stat._id), ...awayTeamStats.map(stat => stat._id)];

    await game.save();

    res.send({ message: 'Match ended successfully', game });
  } catch (error) {
    console.error('Error ending match:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
