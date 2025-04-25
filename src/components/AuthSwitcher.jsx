import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthSwitcher = ({ initialAuthType }) => {
    const [isLogin] = useState(initialAuthType === "login");

    return (
        <section className="w-full flex justify-center p-4 sm:p-8 md:p-12 pb-0">
            <Link to="/login">
                <div className={`px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-lg cursor-pointer ${isLogin ? 'bg-black' : 'bg-gray-200'}`}>
                    <h3 className={`text-sm sm:text-base ${isLogin ? "text-white" : "text-black"}`}>Login</h3>
                </div>
            </Link>

            <Link to="/signup">
                <div className={`px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-lg cursor-pointer ${!isLogin ? 'bg-black' : 'bg-gray-200'}`}>
                    <h3 className={`text-sm sm:text-base ${isLogin ? "text-black" : "text-white"}`}>Sign Up</h3>
                </div>
            </Link>
        </section>
    );
};

export default AuthSwitcher;
