import React from "react";

const FormButton = ({ title }) => {
    return (
        <button type="submit" className="px-6 py-4 bg-black text-white rounded-lg w-full cursor-pointer">
            {title}
        </button>
    );
};

export default FormButton;