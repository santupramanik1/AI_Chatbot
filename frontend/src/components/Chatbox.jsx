import React, {useEffect, useRef, useState} from "react";
import {useAppContext} from "../context/Appcontext";
import {assets} from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const Chatbox = () => {
    const {selectedChat, theme, user, setUser, axios, token} = useAppContext();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [mode, setMode] = useState("text");
    const [isPublished, setIsPublished] = useState(false);

    const containerRef = useRef(null);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!user) return toast("Login to send message");
            setLoading(true);
            const promptCopy = prompt;
            setPrompt("");
            setMessages((prev) => [...prev, {role: "user", content: prompt, timestamps: Date.now(), isImage: false}]);

            const {data} = await axios.post(
                `/api/message/${mode}`,
                {chatId: selectedChat._id, prompt, isPublished},
                {headers: {Authorization: token}}
            );

            console.log(data)
            if (data.success) {
                setMessages((prev) => [...prev, data.reply]);

                // decrease credits
                if (mode === "image") {
                    setUser((prev) => ({...prev, credits: prev.credits - 2}));
                } else {
                    setUser((prev) => ({...prev, credits: prev.credits - 1}));
                }
            } else {
                toast.error(data.message);
                setPrompt(promptCopy);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setPrompt("");
        }
    };

    // whenever user select the messages it will display here
    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages);
        }
    }, [selectedChat]);

    // Whenever the message changes scroll to the latest message
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
            {/* Chat messages */}
            <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
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

                {/* Three dots loading */}
                {loading && (
                    <div className="flex gap-1.5 items-center loader">
                        <div
                            className={`w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce ${
                                theme === "dark" ? "bg-white" : ""
                            }`}
                        ></div>
                        <div
                            className={`w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s] ${
                                theme === "dark" ? "bg-white" : ""
                            }`}
                        ></div>
                        <div
                            className={`w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce  [animation-delay:0.4s] ${
                                theme === "dark" ? "bg-white" : ""
                            }`}
                        ></div>
                    </div>
                )}
            </div>

            {mode === "image" && (
                <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto ">
                    <p className="text-sm">Publish Generated Image to Community</p>
                    <input
                        type="checkbox"
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="cursor-pointer"
                        checked={isPublished}
                    ></input>
                </label>
            )}

            {/* Prompt input box */}
            <form
                onSubmit={onSubmit}
                className={`bg-primary/20 ${
                    theme === "dark" ? "bg-[#583C79] border-[#80609F]" : ""
                } border border-primary w-full rounded-full  max-w-2xl p-3 pl-4 mx-auto gap-4 flex items-center `}
            >
                <select
                    onChange={(e) => setMode(e.target.value)}
                    value={mode}
                    className="text-sm pl-3 pr-2 outline-none"
                >
                    <option className={`${theme === "dark" ? "bg-purple-900" : ""}`} value="text">
                        Text
                    </option>
                    <option className={`${theme === "dark" ? "bg-purple-900" : ""}`} value="image">
                        Image
                    </option>
                </select>
                <input
                    type="text"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    className="flex-1 w-full  text-sm outline-none "
                    placeholder="Type your prompt here...
"
                ></input>
                <button disabled={loading}>
                    <img src={loading ? assets.stop_icon : assets.send_icon} className="w-8 cursor-pointer" />
                </button>
            </form>
        </div>
    );
};

export default Chatbox;
