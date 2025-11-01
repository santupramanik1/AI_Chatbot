import React, {useEffect, useState} from "react";
import {dummyPublishedImages} from "../assets/assets";
import Loading from "./Loading";
import {useAppContext} from "../context/Appcontext";
import toast from "react-hot-toast";

const Community = () => {
    const {theme, axios,token} = useAppContext();

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        // setImages(dummyPublishedImages);
        // setLoading(false);

        try {
            const {data} = await axios.get("api/user/published-images", {headers: {Authorization: token}});
            if (data.success) {
                setImages(data.images);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (loading) return <Loading></Loading>;

    return (
        <div className="w-full h-full  overflow-y-scroll p-6 pt-12 xl:px-12 2xl:px-20 mx-auto">
            <h2 className={`text-xl font-semibold mb-6 text-gray-800 ${theme === "dark" ? "text-purple-800" : ""}`}>
                Community Images
            </h2>
            {images.length > 0 ? (
                <div className="flex flex-wrap  gap-5 max-sm:justify-center">
                    {images.map((item, index) => (
                        <a
                            href={item.imageUrl}
                            key={index}
                            target="_blank"
                            className={`relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                                theme === "dark" ? "border-purple-700" : ""
                            } `}
                        >
                            <img
                                src={item.imageUrl}
                                className="w-full h-40 md:h-50 2xl:h-60 group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
                            ></img>

                            <p className="absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl  transition duration-300 hidden group-hover:block ">
                                Created by{item.userName}
                            </p>
                        </a>
                    ))}
                </div>
            ) : (
                <div>
                    <p className={`text-center text-gray-800 mt-10 ${theme === "dark" ? "text-purple-200" : ""} `}>
                        No Images available
                    </p>
                </div>
            )}
        </div>
    );
};

export default Community;
