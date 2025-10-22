import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {dummyUserData,  dummyChats} from "../assets/assets.js";
const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Fetch the user
    const fetchUser = async () => {
        setUser(dummyUserData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Fetch the userchats for display in the Sidebar
    const fetchUsersChat = async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    };

    useEffect(() => {
        if (user) {
            fetchUsersChat();
        } else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    // Change the theme
    useEffect(() => {
        if (theme === "dark") {
        } else {
        }
    }, [theme]);

    const value = {navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, fetchUser};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
