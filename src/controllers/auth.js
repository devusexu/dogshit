const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { AuthenticationError, NotFoundError, ConflictError } = require('../../utils/error');

async function register(req, res, next) {
    try {
        req.validatedData.email = req.validatedData.email.toLowerCase();

        const existingUser = await User.findOne({ email: req.validatedData.email });
        if (existingUser) throw new ConflictError('Email already exists');
     
        const createdUser = await User.create(req.validatedData);     
        return res.status(201).json(createdUser);
    } catch (error) {
        next(error);   
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.validatedData;
        // Check if the user exists in the database
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new AuthenticationError('Invalid password');
        }

        // If password is correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        next(error);
    } 
}

// get all users
async function index(req, res, next) {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (error) {
       next(error); 
    }
}

module.exports = { register, login, index };