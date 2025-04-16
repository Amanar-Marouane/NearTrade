import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../context/UserContext';

const LogoutButton = () => {
    const { logout } = useContext(Context);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <form onSubmit={handleLogout}>
            <button type="submit" className="px-5 py-3 border-1 text-black rounded-lg cursor-pointer">
                LogOut
            </button>
        </form>
    );
};

export default LogoutButton;