import { imagekit } from "../configs/imagekit.js";
import {openai} from "../configs/openai.js";
import {Chat} from "../models/Chat.js";
import {User} from "../models/User.js";
import axios from "axios";

// Text-based AI Chat message controller
export const textMessagesController = async (req, res) => {
    try {
        const userId = req.user._id;

        //    check user credits
        if (req.user.credits < 1) {
            return res.json({success: false, message: "you don't have enough credits to use this features"});
        }

        const {chatId, prompt} = req.body;
        const chat = await Chat.findOne({userId, _id: chatId});

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });

        const {choices} =await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                // {role: "system", content: "You are a helpful assistant."},
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false};
        res.json({success: true, reply});
        chat.messages.push(reply);

        await chat.save();

        // After generating one conetent by the AI the user credits will be decrese by 1
        await User.updateOne({_id: userId}, {$inc: {credits: -1}});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

// Image generation Message controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        //    check user credits
        if (req.user.credits < 2) {
            return res.json({success: false, message: "you don't have enough credits to use this features"});
        }

        const {prompt, chatId, isPublished} = req.body;

        // Find chat
        const chat = await Chat.findOne({_id: chatId, userId});

        // Push user messages
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt);

        // Construct imagekit AI generation URL
        const generatedImageURL = `${
            process.env.IMAGEKIT_URL_ENDPOINT
        }/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png/tr=w-800 ,h-800`;

        // Trigger generation by fetching from imagekit
        const aiImageResponse =await axios.get(generatedImageURL, {responseType: "arraybuffer"});

        // Convert to base64
        const base64Image = `data:image/png;base64, ${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;

        // upload to imagekit  media library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt",
        });

        const reply = {role: "assistant", content: uploadResponse.url, timestamp: Date.now(), isImage: true, isPublished};
        

        chat.messages.push(reply);

        await chat.save();

        // After generating image by the AI the user credits will be decrese by 2
        await User.updateOne({_id: userId}, {$inc: {credits: -2}});

        return res.json({success: true, reply});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};
