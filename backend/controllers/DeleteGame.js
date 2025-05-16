import Game from '../models/game.js';
import GameStat from '../models/gamestat.js';

// Function to delete a match and its associated game stats
export const deleteGame = async (req, res) => {
  console.log('deleteGame request -- received');
  const { gameId } = req.params;

  try {
    // Find the game by ID
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Delete associated game stats
    await GameStat.deleteMany({ gameId: gameId });

    // Delete the game
    await Game.findByIdAndDelete(gameId);

    res.status(200).json({ message: 'Game and associated stats deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
