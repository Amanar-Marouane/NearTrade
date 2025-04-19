import { useState } from "react";

const FormButton = ({ title }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setTimeout(() => {
            setIsLoading(true);
    
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        }, 20);
    };
    


    return (
        <button
            type="submit"
            onClick={() => { handleClick() }}
            disabled={isLoading}
            className={`px-6 py-4 bg-black text-white rounded-lg w-full cursor-pointer relative transition-all duration-300 flex items-center justify-center ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
        >
            {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <span className="transition-opacity duration-300">{title}</span>
            )}
        </button>
    );
};

export default FormButton;
