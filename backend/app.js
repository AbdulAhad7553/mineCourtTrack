// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import 'dotenv/config'

// // MongoDB Connection
// const mongoURI = process.env.MONGO_URL;
// mongoose.connect(mongoURI, {
//   }).then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.error('MongoDB connection error:', err));

// //Routes
// import BasicUser from './routes/loginSignupRoutes.js' 

// export const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(BasicUser)














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
    
//     // Start the server after successful DB connection and index synchronization
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// import BasicUser from './routes/loginSignupRoutes.js';

// export const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import BasicUser from './routes/loginSignupRoutes.js';
app.use(BasicUser);
