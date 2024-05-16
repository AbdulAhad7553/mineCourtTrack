import express from 'express';
import { login } from '../controllers/Login.js'
import { signup } from '../controllers/Signup.js';
import { AddPlayer } from '../controllers/AddPlayer.js';
const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);
BasicUser.post('/addplayer-req', AddPlayer);

export default BasicUser;