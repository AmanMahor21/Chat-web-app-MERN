// const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
// dotenv.config();
const generateAccessToken = async (userID, res) => {
  const token = jwt.sign({ userID }, process.env.REACT_APP_JSON_KEY, {
    expiresIn: "1d",
  });

  res.cookie("cookie", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, // Ensures the cookie is only sent over HTTPS
    sameSite: "none",
  });
  // console.log(token, "i m recieving, when sending cookie to browwser");
  return token;
  // res.json({ message: "Error in JWT token generation" });
};
module.exports = generateAccessToken;
