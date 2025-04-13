import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const Logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/logout`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })
            if (response.status === 200) navigate('/login');
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={Logout}>
            <button type="submit" className="px-5 py-3 border-1 text-black rounded-lg cursor-pointer">
                LogOut
            </button>
        </form>
    );
};

export default LogoutButton;