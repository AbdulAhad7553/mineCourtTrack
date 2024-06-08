import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

// MongoDB Connection
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
    
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Create Express app
const app = express();

// Middleware
const corsOptions = {
  origin: '*', // Your frontend URL
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import BasicUser from './routes/loginSignupRoutes.js';
app.use(BasicUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app as default
export default app;
