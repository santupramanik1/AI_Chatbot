import React from "react";
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Credits from "./pages/Credits";
import Chatbox from "./components/Chatbox";
import Community from "./pages/Community";
const App = () => {
    return (
        <>
            <div className="">
                <div className="flex h-screen w-screen">
                    <Sidebar></Sidebar>
                    <Routes>
                        <Route path="/" element={<Chatbox></Chatbox>}></Route>
                        <Route path="/credits" element={<Credits></Credits>}></Route>
                        <Route path="/community" element={<Community></Community>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
};

// bg-linear-to-b from-[#242124] to-[#000000] text-white
export default App;
