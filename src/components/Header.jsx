import React, { useEffect, useState } from "react";
import LogoutBtn from './LogoutButton';
import RedirectButton from './RedirectButton';
import { useNavigate } from "react-router-dom";

export const Context = React.createContext("");

const Header = () => {
    const [isIn, setIsIn] = useState(false);
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    const IsLogged = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/islogged", {
                method: "POST",
                credentials: 'include',
            });

            const result = await response.json();
            setUserId(result.message);
            setIsIn(result.data);
        } catch (error) {
            navigate('/login');
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        IsLogged()
    }, []);

    // console.log(userId);

    return (
        <Context.Provider value={[userId, setUserId]}>
            <header className="w-full p-2">
                <nav className="flex items-center justify-between px-8">
                    <h1 className="font-bold text-3xl">NearTrade</h1>
                    <ul className="flex justify-between items-center gap-4">
                        <div className="flex gap-2">
                            <a href="">
                                <img src="/notification-icon.svg" className="w-8 h-8" alt="Notifications" />
                            </a>
                            <a href="">
                                <img src="/favorite-icon.svg" className="w-8 h-8" alt="Favorites" />
                            </a>
                        </div>
                        <li>
                            {isIn ? <LogoutBtn /> : <RedirectButton href={'/login'} label={'Sign In'} />}
                        </li>
                        <li>
                            <RedirectButton href={'/new'} label={'Post an item'} />
                        </li>
                        <li>
                            <RedirectButton href={'/products'} label={'My items'} />
                        </li>
                    </ul>
                </nav>
            </header>
        </Context.Provider>
    );
};

export default Header;
