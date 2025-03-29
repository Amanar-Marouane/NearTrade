import React from "react";

const Header = () => {
    return (
        <header className="w-full p-2">
            <nav className="flex items-center justify-between px-8">
                <h1 className="font-bold text-3xl">NearTrade</h1>
                <ul className="flex justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <a href="">
                            <img src="./notification-icon.svg" className="w-8 h-8" alt="Notifications" />
                        </a>
                        <a href="">
                            <img src="./favorite-icon.svg" className="w-8 h-8" alt="Favorites" />
                        </a>
                    </div>
                    <li>
                        <a href="/">
                            <button className="px-5 py-3 border-1 text-black rounded-lg cursor-pointer">
                                Sign In
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <button className="px-5 py-3 bg-black text-white rounded-lg cursor-pointer">
                                Post an item
                            </button>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
