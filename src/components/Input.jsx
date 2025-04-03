import React from "react";

const Input = ({ type, id, title, src, placeholder, name }) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="w-full px-6 flex flex-col gap-1">
            <label htmlFor={id} className="text-[#374151] text-lg font-semibold p-1">
                {title}
            </label>
            <div className={`flex justify-center items-center border p-1`}>
                <label htmlFor={id}>
                    <img src={src} alt="Input Icon" className="w-8 h-8" />
                </label>
                <input
                    className="w-full p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                    type={type === "password" && isPasswordVisible ? "text" : type}
                    name={name}
                    id={id}
                    placeholder={placeholder || ""}
                />
                {type === "password" && (
                    <button type="button" className="cursor-pointer" onClick={togglePassword}>
                        <img
                            src={isPasswordVisible ? "/eye-off-icon.svg" : "/eye-icon.svg"}
                            alt="Toggle Password"
                            className="w-6 h-6 mr-3"
                        />
                    </button>
                )}
            </div>
            <span className={`${id}-error error text-red-500 text-sm mt-1`}></span>
        </div>
    );
};

export default Input;
