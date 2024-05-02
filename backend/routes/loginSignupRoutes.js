import express from 'express';
import { login } from '../controllers/Login.js'
import { signup } from '../controllers/Signup.js';
const BasicUser = express.Router();

BasicUser.post('/login-req', login);
BasicUser.post('/signup-req', signup);

export default BasicUser;