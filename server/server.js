const express = require("express");
// const app = express();
const cors = require("cors");
const mongoConnection = require("./MongoDB/mongoConnection");
const dotnev = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const messageRoutes = require("./routes/message.routes");
const contactRoutes = require("./routes/contact.routes");
const bodyParser = require("body-parser");
const { app, httpServer } = require("./utils/socketIo");

dotnev.config();
const port = process.env.REACT_APP_SERVER_PORT || 8080;

// app.use(cors({
//   origin: "http://localhost:3000", // Adjust the frontend URL as needed
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, // Allow cookies to be sent with cross-origin requests
// }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
// app.use("/api/allMessages", messageRoutes);
app.use("/api/users", contactRoutes);

httpServer.listen(port, async () => {
  await mongoConnection();
  console.log("mongo connedted");
  console.log(`I m listenig ${port}`);
});
