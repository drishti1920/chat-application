import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", //token expires in 15 days
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds format
    httpOnly: true, // prevent XXS attacks cross-side scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== 'development' 
  });
};

export default generateTokenAndSetCookie;
