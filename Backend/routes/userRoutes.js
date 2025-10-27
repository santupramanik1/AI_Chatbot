import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const userRouter =express.Router()

// Public Routes
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

// Private Routes
userRouter.get("/me",authMiddleware,getUser)

export default userRouter