import LogoutBtn from './LogoutButton';
import RedirectButton from './RedirectButton';
import { Context } from '../context/UserContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, userId } = useContext(Context);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="w-full p-1 sm:p-2 bg-white shadow-sm">
            <nav className="flex flex-col lg:flex-row items-center justify-between px-3 sm:px-6 md:px-8">
                <div className="w-full lg:w-auto flex justify-between items-center py-2">
                    <a href="/home"><h1 className="font-bold text-xl sm:text-2xl md:text-3xl">NearTrade</h1></a>
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                <ul className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-3 sm:gap-4 md:gap-6 py-3 lg:py-0 w-full lg:w-auto bg-white lg:bg-transparent`}>
                    <div className="flex gap-3 sm:gap-4">
                        <Link to={'/chat'} className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 hover:bg-gray-100 rounded-full transition-colors">
                            <img src="/chat-icon.svg" className="w-5 h-5 sm:w-6 sm:h-6" alt="Chat" />
                        </Link>
                        <Link to={'/favorites'} className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 hover:bg-gray-100 rounded-full transition-colors">
                            <img src="/favorite-icon.svg" className="w-5 h-5 sm:w-6 sm:h-6" alt="Favorites" />
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto">
                        <RedirectButton
                            href={'/home'}
                            label={'Home'}
                            className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2"
                        />
                        {userId && (
                            <RedirectButton
                                href={'/profile/' + userId}
                                label={'Profile'}
                                className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2"
                            />
                        )}
                        <RedirectButton
                            href={'/new'}
                            label={'Post an item'}
                            className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2"
                        />
                        <RedirectButton
                            href={'/products/me'}
                            label={'My items'}
                            className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2"
                        />
                        {isAuthenticated ? (
                            <LogoutBtn className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2" />
                        ) : (
                            <RedirectButton
                                href={'/login'}
                                label={'Sign In'}
                                className="w-full lg:w-auto text-sm sm:text-base px-4 py-1.5 sm:px-5 sm:py-2"
                            />
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
