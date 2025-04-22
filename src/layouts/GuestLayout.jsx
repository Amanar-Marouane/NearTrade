import { useEffect, useContext } from "react";
import Footer from "../components/Footer"
import { Context } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const GuestLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated]);

    return (
        <>
            {children}
            <Footer></Footer>
        </>
    )
}

export default GuestLayout