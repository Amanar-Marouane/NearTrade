import LogoutBtn from './LogoutButton';
import RedirectButton from './RedirectButton';
import { Context } from '../context/UserContext';
import { useContext } from 'react';

const Header = () => {
    const { isIn } = useContext(Context);

    return (
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
    );
};

export default Header;
