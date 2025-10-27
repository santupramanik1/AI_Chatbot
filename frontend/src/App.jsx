import React, {useState} from "react";
import {createBrowserRouter, Route, RouterProvider, Routes, useLocation} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Credits from "./pages/Credits";
import Chatbox from "./components/Chatbox";
import Community from "./pages/Community";
import {useAppContext} from "./context/Appcontext";
import {Menu} from "lucide-react";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import Login from "./pages/Login";

const App = () => {
    const {theme, user} = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {pathname} = useLocation();
    if (pathname === "/loading") return <Loading></Loading>;

    return (
        <>
            {!isMenuOpen && (
                <Menu
                    onClick={() => setIsMenuOpen(true)}
                    className="w-8 h-8 cursor-pointer absolute top-3 left-3 md:hidden"
                />
            )}

            {!user ? (
                <div className={`${theme === "dark" ? "bg-linear-to-b from-[#242124] to-[#000000] text-white" : ""}`}>
                    <div className="flex h-screen w-screen">
                        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></Sidebar>
                        <Routes>
                            <Route path="/" element={<Chatbox></Chatbox>}></Route>
                            <Route path="/credits" element={<Credits></Credits>}></Route>
                            <Route path="/community" element={<Community></Community>}></Route>
                        </Routes>
                    </div>
                </div>
            ) : (
                <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#242124] to-[#000000]">
                    <Login></Login>
                </div>
            )}
        </>
    );
};

//
export default App;
