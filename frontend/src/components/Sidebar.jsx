import React, {useState} from "react";
import {useAppContext} from "../context/Appcontext";
import {assets} from "../assets/assets";
import {Delete, Gem, Image, LogOut, Plus, Search, Sun, Trash, User, X} from "lucide-react";
import moment from "moment";

const Sidebar = ({isMenuOpen,setIsMenuOpen}) => {
    const {chats, setSelectedChat, theme, setTheme, user, navigate} = useAppContext();
    const [search, setSearch] = useState("");

    return (
        <div
            className={`flex flex-col h-screen p-5 min-w-72 border-r border-[#80906F]/30  backdrop-blur-3xl transition-all duration-500  max-md:absolute left-0 z-1 ${
                theme === "dark" ? "bg-linear-to-b from-[#242124]/3 to-[##000000]/30" : ""
            } ${!isMenuOpen&&"max-md:-translate-x-full"}`}
        >
            {/* Logo */}
            <img
                onClick={() => navigate("/")}
                src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
                className="w-full max-w-48 cursor-pointer"
            ></img>

            {/* New Chat Button */}
            <button className="flex gap-2 justify-center mt-10 items-center w-full py-2 text-white bg-linear-to-r  from-[#A456F7] to-[#3D81F6]  text-sm rounded-md cursor-pointer">
                <Plus />
                <span>New Chat</span>
            </button>

            {/* Search Conversations */}
            <div
                className={`flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md ${
                    theme === "dark" ? "border-white/20" : ""
                }`}
            >
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
            <div  className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
                {chats
                .filter((chat) =>
                    chat.messages[0]
                        ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
                        : chat.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((chat) => (
                    <div
                        key={chat._id}
                        onClick={()=>{navigate("/");setSelectedChat(chat);setIsMenuOpen(false)}}
                        className={`p-2 px-4 border border-gray-300  rounded-md  cursor-pointer flex justify-between items-center group ${
                            theme === "dark" ? "bg-[#57317C1A] border-white/15" : ""
                        }`}
                    >
                        <div>
                            <p className="truncate w-full">
                                {chat.messages.length > 0 ? chat.messages[0]?.content.slice(0, 32) : chat.name}
                            </p>
                            <p className="text-xs text-gray-500 ">{moment(chat.updatedAt).fromNow()}</p>
                        </div>

                        <Trash className="w-4 hidden group-hover:block cursor-pointer"></Trash>
                    </div>
                ))}
            </div>

            {/* Community Images */}
            <div
                onClick={() => {
                    navigate("/community");setIsMenuOpen(false)
                }}
                className={`flex items-center  gap-2 p-3 mt-4 hover:scale-103 transition-all border border-gray-300  rounded-md  cursor-pointer ${
                    theme === "dark" ? "border-white/15" : ""
                }`}
            >
                <Image className="w-4.5" />
                <div className="  text-sm">
                    <p>Community Images</p>
                </div>
            </div>

            {/* Credit purchas option */}
            <div
                onClick={() => {
                    navigate("/credits");setIsMenuOpen(false)
                }}
                className={`flex items-center  gap-2 p-3 mt-4 hover:scale-103 transition-all border border-gray-300  rounded-md  cursor-pointer ${
                    theme === "dark" ? "border-white/15" : ""
                }`}
            >
                <Gem className="w-4.5" />
                <div className="flex flex-col  text-sm">
                    <p>Credits: {user?.credits}</p>
                    <p className="text-xs text-gray-400">Purchase credits to use quickgpt</p>
                </div>
            </div>

            {/* Dark mode Toggle */}
            <div
                className={`flex items-center  justify-between p-3 mt-4 hover:scale-103 transition-all border border-gray-300  rounded-md  cursor-pointer ${
                    theme === "dark" ? "border-white/15" : ""
                }`}
            >
                <div className="flex gap-2 items-center">
                    <Sun className="w-4" />
                    <p className="text-sm">Dark Mode</p>
                </div>
                <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="  text-sm">
                    <div
                        className={`w-9 h-5 bg-gray-400 rounded-full  transition-all relative ${
                            theme === "light" ? "bg-purple-600" : ""
                        }`}
                    >
                        <div
                            className={`w-3 h-3 bg-white rounded-full transition-transform absolute left-1 top-1 ${
                                theme === "light" ? "translate-x-4 " : ""
                            }`}
                        ></div>
                    </div>
                </div>
            </div>

            {/* User Account */}
            <div
                className={`flex items-center justify-between  gap-2 p-3 mt-4 border border-gray-300  rounded-md  cursor-pointer group ${
                    theme === "dark" ? "border-white/15" : ""
                }`}
            >
                <div className="flex gap-2 items-center text-sm">
                    <User className="w-7 h-7 rounded-full bg-purple-700 text-white " />
                    <p>{user ? user.name : "Login your account"}</p>
                </div>

                {user && (
                    <div className="  ">
                        <LogOut className="w-4 hidden group-hover:block cursor-pointer" />
                    </div>
                )}
            </div>

            <X onClick={()=>setIsMenuOpen(false)} className="w-5 h-5 cursor-pointer absolute top-3 right-3 md:hidden"/>
        </div>
    );
};

export default Sidebar;
