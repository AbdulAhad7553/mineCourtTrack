import express from 'express';
import { login } from '../controllers/Login.js'
import { signup } from '../controllers/Signup.js';
import { AddPlayer } from '../controllers/AddPlayer.js';
import { AddTeam } from '../controllers/AddTeam.js';
import { GetTeams } from '../controllers/GetTeams.js';
import { UpdateTeam } from '../controllers/UpdateTeam.js';
import { RemovePlayer } from '../controllers/RemovePlayer.js';
import { GetPlayers } from '../controllers/GetPlayers.js';
const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);
BasicUser.post('/addplayer-req', AddPlayer);
BasicUser.post('/addteam-req', AddTeam);
BasicUser.get('/get-teams', GetTeams);
BasicUser.put('/updateteam/:id', UpdateTeam);
BasicUser.put('/remove-player/:teamId/:playerId', RemovePlayer);
BasicUser.get('/get-players/:teamId', GetPlayers);
export default BasicUser;