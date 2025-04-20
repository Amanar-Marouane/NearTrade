import React from "react";
import { Link } from "react-router-dom";

const RedirectButton = ({ href, label }) => {
    return (
        <Link to={href}>
            <button className="px-5 py-3 bg-black text-white rounded-lg cursor-pointer">
                {label}
            </button>
        </Link>
    )
}

export default RedirectButton;