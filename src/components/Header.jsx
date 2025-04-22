import LogoutBtn from './LogoutButton';
import RedirectButton from './RedirectButton';
import { Context } from '../context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, userId } = useContext(Context);

    return (
        <header className="w-full p-2">
            <nav className="flex items-center justify-between px-8">
                <a href="/home"><h1 className="font-bold text-3xl">NearTrade</h1></a>
                <ul className="flex justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <Link to={'/chat'}>
                            <img src="/chat-icon.svg" className="w-8 h-8" alt="Chat" />
                        </Link>
                        <Link to={'/favorites'}>
                            <img src="/favorite-icon.svg" className="w-8 h-8" alt="Favorites" />
                        </Link>
                    </div>
                    <li>
                        <RedirectButton href={'/home'} label={'Home'} />
                    </li>
                    {userId && (
                        <li>
                            <RedirectButton href={'/profile/' + userId} label={'Profile'} />
                        </li>
                    )}
                    <li>
                        <RedirectButton href={'/new'} label={'Post an item'} />
                    </li>
                    <li>
                        <RedirectButton href={'/products/me'} label={'My items'} />
                    </li>
                    <li>
                        {isAuthenticated ? <LogoutBtn /> : <RedirectButton href={'/login'} label={'Sign In'} />}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
