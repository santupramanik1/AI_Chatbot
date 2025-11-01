import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {dummyUserData, dummyChats} from "../assets/assets.js";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loadingUser, setLoadingUser] = useState(true);
    // Fetch the user
    const fetchUser = async () => {
      
        try {
            const {data} = await axios.get("/api/user/me", {headers: {Authorization: token}});
            if (data.success) {
                setUser(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setUser(null);
            setLoadingUser(false);
        }
    }, [token]);

    // Create new chat
    const createNewChat = async () => {
        console.log("✅ createChat route hit by new chat :");
        try {
            if (!user) return toast("Login to create new chat");
            navigate("/");
            await axios.post("/api/chat/create",{}, {headers: {Authorization: token}});
            console.log("Do works")
            await fetchUsersChat();
        } catch (error) {
            toast.error("error occure in catch",error.message);
        }
    };

    // Fetch the userchats for display in the Sidebar
    const fetchUsersChat = async () => {
        try {
            const {data} = await axios.get("/api/chat/get", {headers: {Authorization: token}});
            console.log("Fetched chats:", data);
            if (data.success) {
                setChats(data.chats);

                //  If the user has no chats crate one
                if (data.chats.length === 0) {
                    await createNewChat();
                    return fetchUsersChat();
                } else {
                    setSelectedChat(data.chats[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
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
        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        fetchUser,
        createNewChat,
        loadingUser,
        setLoadingUser,
        fetchUsersChat,
        token,
        setToken,
        axios,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
