import React from "react";

const OAuth = () => {
    return (
        <section className="w-full flex flex-col justify-center items-center p-12 gap-2 pb-0">
            <div className="border border-gray-300 px-12 py-4 rounded-lg w-[40%] flex justify-center items-center gap-2">
                <img src="/google-icon.svg" alt="Google Icon" className="w-8 h-8" />
                <h3 className="text-black text-center font-bold">Continue With Google</h3>
            </div>
            <div className="border border-gray-300 px-12 py-4 rounded-lg w-[40%] flex justify-center items-center gap-2">
                <img src="/facebook-icon.svg" alt="Facebook Icon" className="w-8 h-8" />
                <h3 className="text-black text-center font-bold">Continue With Facebook</h3>
            </div>
        </section>
    );
};

export default OAuth;