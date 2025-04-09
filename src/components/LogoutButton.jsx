import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const Logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
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