import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Context } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const { error, success, setError, setSuccess, isAuthenticated } = useContext(Context);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setError('');
            setSuccess('');
        }, 3000)
        return () => clearTimeout(debounceTimer);
    }, [error, success]);

    return (
        <>
            <Header />
            <h1 className={`global-error text-red-500 text-sm w-full bg-red-100 text-center`}>{error}</h1>
            <h1 className={`global-success text-green-500 text-sm w-full bg-green-100 text-center`}>{success}</h1>
            {children}
            <Footer />
        </>
    )
}

export default AppLayout