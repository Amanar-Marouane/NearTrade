import { createContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


export const Context = createContext('');

const UserContext = ({ children }) => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const IsLogged = async () => {
        try {
            const response = await fetch(`${host}/api/islogged`, {
                method: "POST",
                credentials: 'include',
            });

            const result = await response.json();

            if (result.data.authenticated) {
                setUser(result.data.user)
                setUserId(result.data.id);
                setIsAuthenticated(true);
                return true;
            } else {
                setUser(null);
                setUserId(null);
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            setUserId(null);
            setIsAuthenticated(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${host}/api/logout`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                setUserId(null);
                setIsAuthenticated(false);
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleFavorite = async (id) => {
        try {
            const response = await fetch(`${host}/api/favorite/${id}`, {
                method: 'POST', credentials: 'include'
            });
            const res = await response.json();
            return res.data.favorites_count;
        } catch (error) {
            console.log(error);
        }
    }

    const values = {
        IsLogged,
        user,
        setUser,
        userId,
        setUserId,
        isAuthenticated,
        setIsAuthenticated,
        logout: handleLogout,
        handleFavorite,
        error,
        setError,
        success,
        setSuccess,
    };

    useEffect(() => {
        IsLogged();
    }, []);

    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-lg text-gray-700 font-medium">Loading{dots}</p>
        </div>
    );

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default UserContext;