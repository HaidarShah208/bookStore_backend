import User from "../model/user.js";

export const Signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ error: "Username should be at least 4 characters long" });
    }
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password.length <= 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 7 characters long" });
    }

    const newUser = new User({ username, email, password, address });
    const savedUser = await newUser.save();

    const token = savedUser.generateToken();
    const options = {
      expires: new Date(Date.now() + 3600000 * 24),  
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};




// sign in 
export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      }
      const token = user.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 3600000 * 24),
        httpOnly: true,
      };
      res
        .status(200)
        .cookie("token", token, options)
        .json({ success: true, message: "user login successfuly",id:user._id,role:user.role ,token:token});
      console.log("cookie created", token);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };



  // seeprofile
  export const seeProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({user})
    }catch (err) {
        return res.status(500).json({ error: err.message });
    } }



// update address
export const updateAddresses = async(req, res) => {
    try{
      const user = await User.findById(req.user._id)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { username, email, address }=req.body
      if(address,email,username){
        user.username=username
        user.email=email
        user.address=address
    }
    await user.save()
      return res.json({message:'updated address', });
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}