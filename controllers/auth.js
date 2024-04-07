const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');
const { AuthenticationError, NotFoundError, ConflictError } = require('../utils/error');

const baseRule = {
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email()
        .required()
};

const usernameRule = Joi.string()
        .min(3)
        .max(30)
        .required();

const registerSchema = Joi.object({
    ...baseRule,
    username: usernameRule
});

const loginSchema = Joi.object({
    ...baseRule,
});

async function register(req, res, next) {
    try {
        // To return validation error of all fields, set abortEarly to false:
        // const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
        const { error , value } = registerSchema.validate(req.body);
        if (error) {
            throw error;
        }

        value.email = value.email.toLowerCase();

        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) throw new ConflictError('Email already exists');
     
        const createdUser = await User.create(value);     
        return res.status(201).json(createdUser);
    } catch (error) {
        next(error);   
    }
}

async function login(req, res, next) {
    try {
        const { error , value } = loginSchema.validate(req.body); 
        if (error) {
            throw error;
        }

        const { email, password } = value;
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