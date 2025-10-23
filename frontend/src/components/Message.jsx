import React from "react";
import {assets} from "../assets/assets";
import {useAppContext} from "../context/Appcontext";
import moment from "moment";

const Message = ({message}) => {
    const {theme} = useAppContext();
    return (
        <div>
            {message.role === "user" ? (
                <div className="flex items-start justify-end my-4 gap-2">
                    <div
                        className={`flex flex-col gap-2  p-2 px-4 bg-slate-50 ${
                            theme === "dark" ? "bg-[#57317C]/30 border border-[#80609F] " : ""
                        } rounded-md max-w-2xl`}
                    >
                        <p className={`text-sm  ${theme === "dark" ? "text-primary" : ""}`}>{message.content}</p>
                        <span className={`text-xs text-gray-400 ${theme == "dark" ? "text-[#B1A67C0]" : ""}`}>
                            {moment(message.timestamp).fromNow()}
                        </span>
                    </div>
                    <img src={assets.user_icon} className="w-8 rounded-full"></img>
                </div>
            ) : (
                <div
                    className={`inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 ${
                        theme === "dark" ? "bg-[#57317C]/30 border border-[#80609F] " : ""
                    } rounded-md my-4 `}
                >
                    {message.isImage ? (
                        <img src={message.content} className="w-full max-w-md mt-2 rounded-md"></img>
                    ) : (
                        <div className={`text-sm ${theme == "dark" ? "text-primary" : ""} reset-tw`}>
                            {message.content}
                        </div>
                    )}
                      <span className={`text-xs text-gray-400 ${theme == "dark" ? "text-[#B1A67C0]" : ""}`}>
                            {moment(message.timestamp).fromNow()}
                        </span>
                </div>
            )}
        </div>
    );
};

export default Message;
