import React from "react";

const FormButton = ({ title }) => {
    return (
        <button type="submit" class="px-6 py-4 bg-black text-white rounded-lg w-[92%]">
            {title}
        </button>
    );
};

export default FormButton;