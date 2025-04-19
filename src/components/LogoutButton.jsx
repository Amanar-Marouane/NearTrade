import { useContext, useState } from "react";
import { Context } from '../context/UserContext';

const LogoutButton = () => {
    const { logout } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        }, 20);
        logout();
    }

    return (
        <form onSubmit={handleLogout}>
            <button
                type="submit"
                onSubmit={handleLogout}
                disabled={isLoading}
                className={`px-5 py-3 border-1 text-black rounded-lg cursor-pointer relative transition-all duration-300 flex items-center justify-center ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {isLoading ? (
                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                    <span className="transition-opacity duration-300">Logout</span>
                )}
            </button>
        </form>
    );
};

export default LogoutButton;