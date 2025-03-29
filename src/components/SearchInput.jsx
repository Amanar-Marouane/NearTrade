import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ type, id, name, placeholder }) => {
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
    );
};

export default SearchInput;
