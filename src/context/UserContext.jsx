import { createContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


export const Context = createContext('');

const UserContext = ({ children }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [isIn, setIsIn] = useState(false);
    const values = { userId, isIn };

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
        IsLogged();
    }, []);

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default UserContext;