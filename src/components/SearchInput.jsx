import React from "react";

const SearchInput = ({ type, id, placeholder, name }) => {
    return (
        <div className="w-full px-6 flex flex-col gap-1">
            <div className="flex justify-center items-center border-1 border-gray-400 p-1 rounded-lg h-10 w-full">
                <img src="./search-icon.svg" alt="Input Icon" className="w-8 h-8" />
                <input
                    className="w-full h-4 p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default SearchInput;
