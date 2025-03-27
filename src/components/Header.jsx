import React from "react";
import SearchInput from "./../components/SearchInput";
import LocationSelect from "./../components/LocationSelect";

const Header = ({ hidden }) => {
    return (
        <header className="w-full p-2">
            <nav className={`flex items-center ${hidden ? 'justify-end' : 'justify-between'}`}>
                <div className={`w-[40%] flex ${hidden ? 'hidden' : ''}`}>
                    <SearchInput type="text" id="search" name="search" placeholder="Search items nearby..." />
                    <LocationSelect name="location" id="location" />
                </div>
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
                            <button className="px-5 py-3 border-1 text-black rounded-lg cursor-pointer">Sign In</button>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <button className="px-5 py-3 bg-black text-white rounded-lg cursor-pointer">Post an item</button>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
