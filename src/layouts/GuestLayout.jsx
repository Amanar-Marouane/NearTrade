import { useEffect, useContext } from "react";
import Footer from "../components/Footer"
import { Context } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const GuestLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, error, success, setError, setSuccess } = useContext(Context);

    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setError('');
            setSuccess('');
        }, 3000)
        return () => clearTimeout(debounceTimer);
    }, [error, success]);

    return (
        <>
            <h1 className={`global-error text-red-500 text-sm w-full bg-red-100 text-center`}>{error}</h1>
            <h1 className={`global-success text-green-500 text-sm w-full bg-green-100 text-center`}>{success}</h1>
            {children}
            <Footer></Footer>
        </>
    )
}

export default GuestLayout