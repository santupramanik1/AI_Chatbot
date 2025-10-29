import express from "express";
import {imageMessageController, textMessagesController} from "../controllers/messageController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const messageRouter = express.Router();

messageRouter.post("/text", authMiddleware, textMessagesController);
messageRouter.post("/image", authMiddleware, imageMessageController);

export default messageRouter;
