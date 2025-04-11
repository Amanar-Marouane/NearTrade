import { FaStar, } from "react-icons/fa";
import Item from './../../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import AppLayout from "../../layouts/AppLayout";
import RedirectButton from "../../components/RedirectButton";
import { Context } from '../../context/UserContext';
import LoadingContent from "../../services/loadingContent";

const Index = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const { userId } = useContext(Context);
    const host = import.meta.env.VITE_HOST;
    const [status, setStatus] = useState(0);

    const Index = async () => {
        try {
            const response = await fetch(`${host}/api/profile`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            const result = await response.json();

            if (response.status === 403) navigate('/login');
            setStatus(response.status);

            setProfile(result.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

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
            if (!result.data) navigate('/login');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        IsLogged()
        Index()
    }, []);

    return (
        < AppLayout >
            <main className="bg-gray-50 min-h-screen">
                <LoadingContent status={status} />
                <section className="px-8 py-2 relative">
                    <div className="h-[25vh] rounded-xl overflow-hidden">
                        <img
                            src="/profile cover.png"
                            alt="User Profile Cover"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute left-12 -bottom-16">
                        <div className="relative">
                            <img
                                src={profile ? profile.profile : null}
                                alt="User Profile Image"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                <section className="px-8 mt-20 mb-5">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <h1 className="text-2xl font-bold text-gray-900">{profile ? profile.name : "Loading..."}</h1>
                                <p className="text-gray-600 text-sm">Member since January {profile ? profile.member_since : "Loading..."}</p>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400" size={16} />
                                        <span className="font-medium">4.9</span>
                                        <span className="text-gray-500">(128 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-700">
                                        <span>243 transactions</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <RedirectButton label={'Message'} href={`/message/${userId}`}></RedirectButton>
                                <RedirectButton label={'Report'} href={`/report/${userId}`}></RedirectButton>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mt-8 w-full">
                                <h2 className="text-xl font-semibold mb-4">About</h2>
                                <p className="text-gray-600 w-[98%]">{profile ? profile.description : "Loading..."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-8 mb-5 flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Active Listings</h1>
                    <div className="cards-container gap-8 grid grid-cols-6">
                        {profile ? profile.lastActiveProducts.map((product) => (
                            <Item key={product.id} img={`${host}${product.images[0]}`} name={product.name} price={product.price} location={product.location} category={product.category} status={product.status} />
                        )) : "Loading..."}
                    </div>
                    {profile ? profile.lastActiveProducts.length >= 6 && (
                        <RedirectButton label={'See All Listings'} href='/products/me'></RedirectButton>
                    ) : ''}
                </section>
            </main>
        </AppLayout >
    );
};

export default Index;