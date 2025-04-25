import React, { useEffect, useState } from "react";

const Input = ({ type, id, title, src, placeholder, name, value = '', onChange = null }) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="w-full px-4 sm:px-6 flex flex-col gap-1">
            <label htmlFor={id} className="text-[#374151] text-base sm:text-lg font-semibold p-1">
                {title}
            </label>
            <div className={`flex justify-center items-center border p-1`}>
                <label htmlFor={id}>
                    <img src={src} alt="Input Icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                </label>
                <input
                    autoComplete="on"
                    className="w-full p-2 text-sm sm:text-base placeholder:text-base sm:placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                    type={type === "password" && isPasswordVisible ? "text" : type}
                    name={name}
                    id={id}
                    placeholder={placeholder || ""}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        onChange && onChange(e);
                    }}
                />
                {type === "password" && (
                    <button type="button" className="cursor-pointer" onClick={togglePassword}>
                        <img
                            src={isPasswordVisible ? "/eye-off-icon.svg" : "/eye-icon.svg"}
                            alt="Toggle Password"
                            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                        />
                    </button>
                )}
            </div>
            <span className={`${id}-error error text-red-500 text-xs sm:text-sm mt-1`}></span>
        </div>
    );
};

export default Input;
