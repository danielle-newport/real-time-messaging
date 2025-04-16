import express, { Express, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const staticDir = ''

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../src/public')));

// Socket.io with TypeScript
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for production)
    methods: ["GET", "POST"]
  }
});

// REST API
app.get("/api/messages", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript!" });
});

// Socket.io Events
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chatMessage", (msg: string) => {
    io.emit("newMessage", msg); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Serve frontend (SPA support)
app.get('*splat', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../src/public', 'index.html'));
});

// Start server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});