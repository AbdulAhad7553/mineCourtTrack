import express from 'express';
import { login } from '../controllers/Login.js'
import { signup } from '../controllers/Signup.js';
import { AddPlayer } from '../controllers/AddPlayer.js';
import { AddTeam } from '../controllers/AddTeam.js';
import { GetTeams } from '../controllers/GetTeams.js';
import { UpdateTeam } from '../controllers/UpdateTeam.js';
import { RemovePlayer } from '../controllers/RemovePlayer.js';
import { GetPlayers } from '../controllers/GetPlayers.js';
import { createNewGame } from '../controllers/NewGame.js';
import { getGameDetails } from '../controllers/GetGameDetails.js';
import { EndGame } from '../controllers/EndGame.js';
import { getPlayerStats } from '../controllers/GetPlayerStats.js';
import { getLeaderboard } from '../controllers/GetLeaderboard.js';
import { GetMatchHistory } from '../controllers/GetMatchHistory.js';
import { DeleteTeam } from '../controllers/DeleteTeam.js';

const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);
BasicUser.post('/addplayer-req', AddPlayer);
BasicUser.post('/addteam-req', AddTeam);
BasicUser.get('/get-teams', GetTeams);
BasicUser.put('/updateteam/:id', UpdateTeam);
BasicUser.put('/remove-player/:teamId/:playerId', RemovePlayer);
BasicUser.get('/get-players/:teamId', GetPlayers);
BasicUser.post('/newgame', createNewGame);
BasicUser.get('/get-game/:gameId', getGameDetails)
BasicUser.post('/end-match/:gameId', EndGame);
BasicUser.get('/get-player-stats/:playerId', getPlayerStats);
BasicUser.get('/leaderboard', getLeaderboard);
BasicUser.get('/get-match-history', GetMatchHistory);
BasicUser.delete('/delete-team/:teamId', DeleteTeam);
export default BasicUser;