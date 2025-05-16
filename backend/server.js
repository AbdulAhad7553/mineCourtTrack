import { Server } from "socket.io";
import http from "http";
import app  from "./app.js";
import { config } from "dotenv";

config({
  path: "./config.env",
});

// Create HTTP server using the Express app
const server = http.createServer(app);

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Your frontend URL
    methods:["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
});

// Start the HTTP server and the Socket.IO server on the same port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
