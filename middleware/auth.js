import User from "../model/user.js";
import jwt from "jsonwebtoken";



export const isAuthenticated = async (req, res, next) => {
try{
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  console.log('All cookies:', req.cookies);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Login First please" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decoded._id);
  next();
}catch(err){
  return res.status(500).json({ success: false, message: err.message });
}
};


