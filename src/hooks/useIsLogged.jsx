import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useIsLogged = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const IsLogged = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/islogged", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (result.data['authenticated']) navigate('/profile');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        IsLogged()
    }, []);

    return {loading};
}

export default useIsLogged