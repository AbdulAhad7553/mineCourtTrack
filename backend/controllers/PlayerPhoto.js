import Player from "../models/player.js";

export const PlayerPhoto = async (req,res) => {
    console.log("PlayerPhoto request --- received");
    try {
        const playerId = req.params.playerId;
        const result = req.file;
        const player = await Player.findByIdAndUpdate(
          playerId,
          { photoUrl: result.path },
          { new: true }
        );
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};