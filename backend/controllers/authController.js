import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ status: "failed", msg: "Username already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        msg: "Passwords do not match",
      });
    }

    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //url to generate random images
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //generate jwt token
      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);
      return res.status(200).json({
        status: "success",
        data: newUser,
      });
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        msg: "User does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "failed",
        msg: "Incorrect password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      status: "success",
      msg: "User loggedin successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const logOut =  (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      status: "success",
      msg: "User logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      msg: err.message,
    });
  }
};
