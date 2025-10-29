// API controller for creating new chat

import {Chat} from "../models/Chat.js";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name,
        };
        await Chat.create(chatData);
        return res.status(201).json({sucess: true, message: "Chat created"});
    } catch (error) {
        return res.json({sucess: false, message: error.message});
    }
};

// API controller for getting all chat
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats =await Chat.find({userId}).sort({updatedAt: -1});

        return res.status(201).json({sucess: true, chats});
    } catch (error) {
        return res.json({sucess: false, message: error.message});
    }
};

// API controller for deleting chat
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId }= req.body;

        await Chat.deleteOne({_id: chatId, userId});

        return res.status(201).json({sucess: true, message: "Chat Deleted sucessfully"});
    } catch (error) {
        return res.json({sucess: false, message: error.message});
    }
};
