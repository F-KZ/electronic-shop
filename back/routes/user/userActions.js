import asyncHandler from "express-async-handler"
import User from "../../models/userModel.js";
import generateToken from "../../middleware/genToken.js";


// Email validation function
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Validate inputs
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Missing field" });
      }
  
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email" });
      }
  
      if (password.length < 4 || password.length > 10) {
        return res.status(400).json({ msg: "Invalid password length" });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists with this email" });
      }
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password
      });
  
      // Save user
      const user = await newUser.save();
  
      // Return response with user data and token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Could not register user' });
    }
  });

  const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  });
  
  // sign out 

const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ msg: 'Refresh token is required' });
    }

    try {
        // Verify the refresh token
        const payload = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

        // Find the user by ID and remove the refresh token
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        // Remove the refresh token from the user's token array
        user.token = user.token.filter((token) => token !== refreshToken);
        await user.save();

        res.status(200).json({ msg: 'Signed out successfully' });
    } catch (error) {
        console.error(error);
        res.status(403).json({ msg: 'Invalid refresh token' });
    }
});

  const getPublicProfile = asyncHandler(async( req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select('name googleImage bio');

        if(!user){
            return res.status(404).json({ msg : " user not found "})
        } 
           
        res.status(200).json({
                id: user._id,
                name: user.name,
                googleImage: user.googleImage,
                bio: user.bio
            });
        


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : "servor error "})
    }

  })

  const updateProfile = asyncHandler(async( req,res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (req.file) user.googleImage = `/uploads/avatars/${req.file.filename}`;

        await user.save();

        res.status(200).json({
            msg: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                googleImage: user.googleImage,
                active: user.active,
                isAdmin: user.isAdmin,
                firstLogin: user.firstLogin,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}); 

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
  
  export { register, login, getPublicProfile, updateProfile, logout, getUsers };