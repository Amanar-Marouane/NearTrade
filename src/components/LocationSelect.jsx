import React from "react";

const SearchInput = ({ id, name }) => {
    return (
        <div className="flex justify-center items-center border-1 border-gray-400 p-1 rounded-lg h-10 min-w-[20%] max-w-fit">
            <select name={name} id={id}
                className="focus:ring-0 focus:outline-none focus:border-transparent">
                <option value="agadir">Agadir</option>
                <option value="marrackech">Marrackech</option>
            </select>
        </div>
    );
};

export default SearchInput;

