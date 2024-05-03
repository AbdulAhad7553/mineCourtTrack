import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'

// MongoDB Connection
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {
  }).then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

//Routes
import BasicUser from './routes/loginSignupRoutes.js' 

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BasicUser)
