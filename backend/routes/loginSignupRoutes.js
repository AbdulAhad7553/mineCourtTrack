import express from 'express';
import { login } from '../controllers/Login.js'
import { signup } from '../controllers/Signup.js';
import { AddPlayer } from '../controllers/AddPlayer.js';
import { AddTeam } from '../controllers/AddTeam.js';


const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);
BasicUser.post('/addplayer-req', AddPlayer);
BasicUser.post('/addteam-req', AddTeam);

export default BasicUser;