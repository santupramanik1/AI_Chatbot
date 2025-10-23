import React, {useEffect, useState} from "react";
import {useAppContext} from "../context/Appcontext";
import {assets} from "../assets/assets";
import Message from "./Message";

const Chatbox = () => {
    const {selectedChat, theme} = useAppContext();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // whenever user select the messages it will display here
    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages);
        }
    }, [selectedChat]);

    return (
        <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
            {/* Chat messages */}
            <div className="flex-1 mb-5 overflow-y-scroll">
                {messages.length == 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-primary">
                        <img
                            src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
                            className="w-full max-w-56 sm:max-w-68"
                            alt="image"
                        ></img>
                        <p
                            className={`mt-5 text-4xl sm:text-6xl text-center text-gray-400  ${
                                theme === "dark" ? "text-white" : ""
                            }`}
                        >
                            Ask me anything.
                        </p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <Message key={index} message={message}></Message>
                ))}
            </div>

            {/* Prompt input box */}
            <form></form>
        </div>
    );
};

export default Chatbox;
