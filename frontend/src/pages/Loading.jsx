import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen text-white text-2xl bg-linear-to-br from-[#531B81] to-[#28194B] backdrop-opacity-60 ">
            <div className="w-10 h-10 rounded-full border-3 border-white border-t transparent animate-spin"></div>
        </div>
    );
};

export default Loading;
