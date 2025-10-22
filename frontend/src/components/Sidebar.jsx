import React, {useState} from "react";
import {useAppContext} from "../context/Appcontext";
import {assets} from "../assets/assets";
import {Delete, Plus, Search, Trash} from "lucide-react";
const Sidebar = () => {
    const {chats, setSelectedChat, theme, setTheme, user} = useAppContext();
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col h-screen p-5 min-w-72 border-r border-[#80906F]/30 backdrop-blur-3xl transition-all duration-500  max-md:absolute left-0 z-1">
            {/* Logo */}
            <img
                src={theme === "darks" ? assets.logo_full : assets.logo_full_dark}
                className="w-full max-w-48 cursor-pointer"
            ></img>

            {/* New Chat Button */}
            <button className="flex gap-2 justify-center mt-10 items-center w-full py-2 text-white bg-linear-to-r  from-[#A456F7] to-[#3D81F6]  text-sm rounded-md cursor-pointer">
                <Plus />
                <span>New Chat</span>
            </button>

            {/* Search Conversations */}
            <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md">
                <Search className="w-4" />
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="text"
                    className="border-none outline-none text-xs placeholder:text-gray-400"
                    placeholder="Search conversations"
                ></input>
            </div>

            {/* Recents Chats */}
            {chats.length > 0 && <p className="mt-4 text-sm">Recents Chats</p>}
            <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
                {chats
                .filter((chat) =>
                    chat.messages[0]
                        ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
                        : chat.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((chat) => (
                    <div
                        key={chat._id}
                        className="p-2 px-4 border border-gray-300  rounded-md  cursor-pointer flex justify-between items-center group"
                    >
                        <div>
                            <p className="truncate w-full">
                                {chat.messages.length > 0 ? chat.messages[0]?.content.slice(0, 32) : chat.name}
                            </p>
                            <p className="text-xs text-gray-500 ">{chat.updatedAt}</p>
                        </div>

                        <Trash className="w-4 hidden group-hover:block cursor-pointer"></Trash>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
