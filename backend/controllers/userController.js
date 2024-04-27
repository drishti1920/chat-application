import User from "../models/userModel.js";

export const getusersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const allUsers = await User.find({
      _id: {
        $ne: loggedInUser, // remove your id from all users list
      },
    }).select("-password"); // excludes passwords from the data

    res.status(200).json({
      status: "success",
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Internal server error",
      error: err.message,
    });
  }
};
