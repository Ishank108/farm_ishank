import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    const {name, phone, password, role, language} = req.body;
    if(!name || !phone || !password) {
      return res.status(400).json({message: 'Name, phone, and password are required'});
    }

    const existingUser = await User.findOne({phone});
    if(existingUser){
      return  res.status(400).json({message: 'User with this phone number already exists'});
    }

    const hashedPassword = await User.hashPassword(password);

    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
      role: role || 'farmer',
      language: language || 'en'
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();
    res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({message: 'User registered successfully', user: newUser, token});

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const loginUser = async (req, res) => {
  try {
    const {phone, password} = req.body;
    if(!phone || !password) {
      return res.status(400).json({message: 'Phone number and password are required'});
    }

    const user = await User.findOne({phone}).select('+password');
    if(!user) {
      return res.status(400).json({message: 'Phone number not registered'});
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) {
      return res.status(400).json({message: 'Incorrect password'});
    }

    const token = user.generateAuthToken();
    res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
    res.status(200).json({message: 'Login successful', token, user});

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export const logoutUser = async (req, res) => {
  res.clearCookie('auth_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({message: 'Logout successful'});
}

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({message: 'User profile retrieved successfully', user});
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}