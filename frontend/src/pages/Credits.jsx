import React, {useEffect, useState} from "react";
import {dummyPlans} from "../assets/assets";
import Loading from "./Loading";
import {useAppContext} from "../context/Appcontext";
import {Plane} from "lucide-react";

const Credits = () => {
    const {theme} = useAppContext();

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlans = async () => {
        setPlans(dummyPlans);
        setLoading(false);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-7xl h-screen  overflow-y-scroll mx-auto px-4  sm:px-6 lg:px-8 py-12 ">
            <h2
                className={`text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800  ${
                    theme == "dark" ? "text-white" : ""
                }`}
            >
                Credits Plans
            </h2>

            <div className="flex flex-wrap gap-8 max-sm:justify-center">
                {plans.map((plan) => (
                    <div
                        key={plan._id}
                        className={`border border-gray-200  rounded-lg hover:shadow-lg transition-shadow p-6  min-w-[300px] flex flex-col ${
                            theme == "dark" ? "border-purple-700" : ""
                        } ${
                            plan._id === "pro"
                                ? `bg-purple-50 ${theme === "dark" ? "bg-purple-900" : ""}`
                                : `bg-white ${theme === "dark" ? "bg-transparent" : ""}`
                        } `}
                    >
                        <div className="flex-1 ">
                            <h3
                                className={`text-xl font-semibold text-gray-900 mb-2 ${
                                    theme == "dark" ? "text-white " : ""
                                } `}
                            >
                                {plan.name}
                            </h3>
                            <p
                                className={`text-2xl font-bold text-purple-600 mb-4 ${
                                    theme == "dark" ? "text-purple-300 " : ""
                                }`}
                            >
                                ${plan.price}
                                <span
                                    className={`text-base font-normal text-gray-600 ${
                                        theme == "dark" ? "text-purple-200" : ""
                                    } `}
                                >
                                    {" "}
                                    /{plan.credits} credits
                                </span>
                            </p>

                            <ul
                                className={`list-disc list-inside text-sm text-gray-700 space-y-1  ${
                                    theme == "dark" ? "text-purple-200  " : ""
                                }`}
                            >
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Credits;
