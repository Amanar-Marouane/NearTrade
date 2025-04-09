import React from "react";

const RedirectButton = ({ href, label }) => {
    return (
        <a href={href}>
            <button className="px-5 py-3 bg-black text-white rounded-lg cursor-pointer">
                {label}
            </button>
        </a>
    )
}

export default RedirectButton;