import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import useIsLogged from "../hooks/useIsLogged";

const GuestLayout = ({ children }) => {
    const { loading } = useIsLogged();

    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

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
        <>
            {children}
            <Footer></Footer>
        </>
    )
}

export default GuestLayout