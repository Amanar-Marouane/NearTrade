import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSelect = ({ name, id }) => {
    return (
        <div className="relative">
            <select
                name={name}
                id={id}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 bg-white text-gray-800 appearance-none cursor-pointer"
            >
                <option value="">Select Location</option>
                <option value="agadir">Agadir</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
            </select>
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
    );
};

export default LocationSelect;

