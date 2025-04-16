import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Express = express();
const server = http.createServer(app);
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io with TypeScript
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// REST API
app.get("/api/messages", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript!" });
});

// Socket.io Events
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg: string) => {
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});