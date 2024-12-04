const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.config();
const generateAccessToken = async (userID, res) => {
  // console.log(process.env.JSON_KEY, "222222222222");
  console.log(userID, "userID");
  const token = jwt.sign({ userID }, process.env.JSON_KEY, {
    expiresIn: "15d",
  });

  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("cookie", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // secure: isProduction, // Secure cookies in production
    // sameSite: isProduction ? "none" : "lax",
  });
  return token;
  // res.json({ message: "Error in JWT token generation" });
};
module.exports = generateAccessToken;
