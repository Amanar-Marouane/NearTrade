import React, { useState } from "react";

const AuthSwitcher = ({ initialAuthType }) => {
    const [isLogin] = useState(initialAuthType === "login");

    return (
        <section className="w-full flex justify-center p-12 pb-0">
            <a href="/login">
                <div className={`px-12 py-4 rounded-lg cursor-pointer ${isLogin ? 'bg-black' : 'bg-gray-200'}`}>
                    <h3 className={isLogin ? "text-white" : "text-black"}>Login</h3>
                </div>
            </a>

            <a href="/signup">
                <div className={`px-12 py-4 rounded-lg cursor-pointer ${!isLogin ? 'bg-black' : 'bg-gray-200'}`}>
                    <h3 className={isLogin ? "text-black" : "text-white"}>Sign Up</h3>
                </div>
            </a>
        </section >
    );
};

export default AuthSwitcher;
