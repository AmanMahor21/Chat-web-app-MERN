const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { userInfo } = require("os");

const app = express();
console.log(process.env.FRONTEND_URL, "mmmmmmmmmmmmmmmm");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    // origin: "http://localhost:3000",
    // origin: "https://quickwebchat.netlify.app", // Allow requests from Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Include any custom headers
    credentials: true,
  })
);
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // No Content
});

// app.get("/test-cors", (req, res) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//   res.json({ success: true });
// });
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    // origin: "https://quickwebchat.netlify.app", // Allow requests from Netlify frontend
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], // Include OPTIONS
    // allowedHeaders: ["Content-Type", "Authorization"], // Include any custom headers
    credentials: true,
  },
});
const activeUser = {};
io?.on("connection", (socket) => {
  const userId = socket?.handshake?.query?.userId;
  // console.log(userId, "userid");
  if (!userId) {
    console.error("Connection attempt without userId");
    socket.disconnect();
    return;
  }
  activeUser[userId] = socket?.id;

  console.log(activeUser, "active");
  io.emit("activeUser", Object.keys(activeUser));

  socket.on("selectedUser", (data) => {
    if (activeUser[data?.openUser]) {
      io.to(activeUser[data?.openUser]).emit("sendUser", {
        ...data,
      });
    }
  });

  socket.on("disconnect", () => {
    console.error("user disconnect:", socket.id);
    delete activeUser[userId];
    io.emit("activeUser", Object.keys(activeUser)); // Emit the updated active users list to all clients
    // io.emit("date", dateHolder);
  });
});

io?.on("error", (err) => {
  console.error("Socket error:", err);
});
const activeIds = (rcv) => {
  const activeMap = Object.keys(activeUser);
  return activeUser[rcv]; // Directly return the socket ID
};
module.exports = { app, httpServer, activeUser, io, activeUser, activeIds };
