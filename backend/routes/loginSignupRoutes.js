import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { AddPlayer, RemovePlayer, GetPlayers, GetPlayersCount, getPlayerStats, UpdatePlayer } from '../controllers/playerController.js';
import { AddTeam, GetTeams, UpdateTeam, DeleteTeam, GetTeamDetail, GetTeamsCount } from '../controllers/teamController.js';
import { createNewGame, getGameDetails, getGameStats, EndGame, GetMostRecentGame, GetMatchHistory, deleteGame } from '../controllers/gameController.js';
import { getLeaderboard } from '../controllers/leaderboardController.js';
const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);
BasicUser.post('/addplayer-req', AddPlayer);
BasicUser.post('/addteam-req', AddTeam);
BasicUser.get('/get-teams', GetTeams);
BasicUser.put('/updateteam/:id', UpdateTeam);
BasicUser.delete('/remove-player/:teamId/:playerId', RemovePlayer);
BasicUser.get('/get-players/:teamId', GetPlayers);
BasicUser.post('/newgame', createNewGame);
BasicUser.get('/get-game/:gameId', getGameDetails)
BasicUser.post('/end-match/:gameId', EndGame);
BasicUser.get('/get-player-stats/:playerId', getPlayerStats);
BasicUser.get('/leaderboard', getLeaderboard);
BasicUser.get('/get-match-history', GetMatchHistory);
BasicUser.delete('/delete-team/:teamId', DeleteTeam);
BasicUser.delete('/delete-match/:gameId', deleteGame);
BasicUser.get('/get-team-detail/:teamId', GetTeamDetail);
BasicUser.get('/most-recent-game', GetMostRecentGame);
BasicUser.get('/teams-count', GetTeamsCount);
BasicUser.get('/players-count', GetPlayersCount);
BasicUser.put('/update-player/:teamId/:playerId', UpdatePlayer);
BasicUser.get('/get-game-stats/:gameId', getGameStats);
export default BasicUser;