import { createContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


export const Context = createContext('');

const UserContext = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isIn, setIsIn] = useState(false);
    const values = { isIn };

    const IsLogged = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/islogged", {
                method: "POST",
                credentials: 'include',
            });

            const result = await response.json();
            setIsIn(result.data['id']);
        } catch (error) {
            navigate('/login');
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
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