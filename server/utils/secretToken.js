const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.config();
const generateAccessToken = async (userID, res) => {
  // console.log(process.env.JSON_KEY, "222222222222");
  console.log(userID, "userID");
  const token = jwt.sign({ userID }, process.env.JSON_KEY, {
    expiresIn: "1d",
  });

  res.cookie("cookie", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: false,
    secure: true,
    // secure: process.env.NODE_ENV === "production", // Only secure cookies in production
    // sameSite: "lax",
    sameSite: "none",
  });
  return token;
  // res.json({ message: "Error in JWT token generation" });
};
module.exports = generateAccessToken;
