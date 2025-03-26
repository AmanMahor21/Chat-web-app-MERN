const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.config();
const generateAccessToken = async (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JSON_KEY, {
    expiresIn: "15d",
  });
  console.log(token, "token");

  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("cookie", token, {
    // maxAge: 30 * 1000,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction, // Secure cookies in production
    sameSite: isProduction ? "none" : "lax",
    domain: "localhost",
    path: "/",
  });
  return token;
  // res.json({ message: "Error in JWT token generation" });
};
module.exports = generateAccessToken;
