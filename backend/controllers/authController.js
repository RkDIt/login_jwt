const User = require("../models/User");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(201).json({ message: "All fields are required" });
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(400).json({ message: "Invalid user data" });
    }
    //   res.status(201).json({ token: user.generateToken() });
    // } else {
    //   res.status(400).json({ message: "Invalid user data" });
    // }
  };

  module.exports = { registerUser};