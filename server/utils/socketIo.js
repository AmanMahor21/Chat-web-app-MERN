const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { userInfo } = require("os");

const app = express();
console.log(process.env.FRONTEND_URL);
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: process.env.FRONTEND_URL,
    // origin: "https://quickwebchat.netlify.app", // Allow requests from Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    // origin: "https://quickwebchat.netlify.app", // Allow requests from Netlify frontend
    // origin: "http://localhost:3000",
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
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
