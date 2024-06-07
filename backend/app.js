
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import 'dotenv/config';

// // MongoDB Connection
// const mongoURI = process.env.MONGO_URL;
// mongoose.connect(mongoURI)
//   .then(async () => {
//     console.log('MongoDB connected successfully');
    
//     // Ensure Player indexes are synchronized
//     try {
//       const Player = (await import('./models/player.js')).default; // Import Player model dynamically
//       await Player.syncIndexes();
//       console.log('Player indexes synchronized successfully');
//     } catch (err) {
//       console.error('Error synchronizing Player indexes:', err);
//     }
    
//     // The server will be started in server.js
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// // Create Express app
// export const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// import BasicUser from './routes/loginSignupRoutes.js';
// app.use(BasicUser);










import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

// MongoDB Connection
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    // Ensure Player indexes are synchronized
    try {
      const Player = (await import('./models/player.js')).default; // Import Player model dynamically
      await Player.syncIndexes();
      console.log('Player indexes synchronized successfully');
    } catch (err) {
      console.error('Error synchronizing Player indexes:', err);
    }
    
    // The server will be started in server.js
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Create Express app
export const app = express();

// Middleware
const corsOptions = {
  origin: 'https://mine-court-track.vercel.app', // Your frontend URL
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import BasicUser from './routes/loginSignupRoutes.js';
app.use(BasicUser);
