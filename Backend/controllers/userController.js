import {User} from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {Chat} from "../models/Chat.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
};

// API to register user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.json({success: false, message: "User already Exists"});
        }
        const user = await User.create({name, email, password});
        const token = generateToken(user._id);

        return res.status(201).json({success: true, token, message: "User registered successfully"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// API to login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                const token = generateToken(user._id);

                return res.json({success: true, token, message: "User Loggedin sucessfully"});
            }
        }

        return res.json({success: false, message: "Invalid email or password"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// API to get user data
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.json({success: true, user});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// API to get published images
export const getPublishImages = async (req, res) => {
    try {
        const publishImageMessages = await Chat.aggregate([
            {$unwind: "$messages"},
            {$match: {"messages.isImage": true, "messages.isPublished": true}},
            {$project: {_id: 0, imageUrl: "$messages.content", userName: "$userName"}},
        ]);

        return res.json({success: true, images: publishImageMessages.reverse()});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};
