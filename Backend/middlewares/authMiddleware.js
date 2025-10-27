import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decode.id;

        const user = await User.findById(userId);
      
        if (!user) {
            return res.status(401).json({success: false, message: "Not authorized ,user not Found"});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message:"Not authorized ,token failed" });
    }
};
