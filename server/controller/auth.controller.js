const user = require("../model/user.model");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
const generateAccessToken = require("../utils/secretToken");
dotenv.config();

const register = async (req, res) => {
  const updateUrl = (gender) => {
    const random = Math.floor(Math.random() * 1000);
    return gender === "Male"
      ? `https://avatar.iran.liara.run/public/boy?no=${random}`
      : `https://avatar.iran.liara.run/public/girl?no=${random}`;
  };
  try {
    const { username, email, password, gender } = req.body;
    const emptyField = !username || !email || !password || !gender;
    if (emptyField) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exist" });
    } else {
      const avatar = updateUrl(req.body.gender);
      const person = new user({
        username,
        email,
        password,
        gender,
        avatar,
      });

      await person.save();
      const jwtToken = generateAccessToken(person._id, res);
      return res.status(201).json({
        message: "User registered successfully",
        status: "Success",
        user: {
          username: person.username,
          email: person.email,
          gender: person.gender,
          id: person._id,
        },
      });
    }
  } catch (error) {
    console.log("Error in register controller");
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};
const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Check for empty fields first
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by email
    const person = await user.findOne({ email });
    if (!person) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, person.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    // Remove password from user object for response
    const { password: _, ...userWithoutPassword } = person.toObject();

    // Generate token
    generateAccessToken(person._id, res);

    // Send success response
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// const login = async function (req, res) {
//   try {
//     const { email, password } = req.body;
//     const person = await user.findOne({ email });
//     console.log(person, "person person person");
//     const removePassword = await user.findOne({ email }).select("-password");

//     // console.log(person, "person");
//     if (!person) {
//       return res.json({ error: "Incorrect email or password" });
//     }

//     const emptyField = !email || !password;
//     if (emptyField) {
//       return res.json({ error: "All field are required" });
//     }

//     const hashPassword = await bcrypt.compare(password, person.password);
//     console.log(hashPassword,'zzz');
//     if (!hashPassword) {
//       return res.status(400).json({
//         error: " Incorect email or password",
//       });
//     }
//     // console.log(person);Error in login controller
//     generateAccessToken(person._id, res);
//     res.status(201).json({
//       message: " User logged in successfully",
//       succees: "true",
//       user: removePassword,
//     });
//     // console.log("Cookie has been set");
//   } catch (error) {
//     console.log("Error in login controller", error);
//     res.status(500).json({ error, error: "Internal Server Error" });
//   }
// };
const logout = (req, res) => {
  try {
    res.clearCookie("cookie");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
