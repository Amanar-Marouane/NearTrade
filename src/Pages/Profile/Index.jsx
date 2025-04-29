import { FaCamera, FaPen, FaStar, } from "react-icons/fa";
import Item from './../../components/ItemCard';
import { useContext, useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import RedirectButton from "../../components/RedirectButton";
import { Context } from '../../context/UserContext';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoProductsView from "../../components/products/NoProductsView";

const Index = () => {
    const host = import.meta.env.VITE_HOST;
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const { setError, setSuccess, userId } = useContext(Context);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const User = async () => {
        try {
            const response = await fetch(`${host}/api/profile/${id}`, {
                credentials: 'include',
            });
            const res = await response.json();
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { User() }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('profile', file);

        try {
            const response = await fetch(`${host}/api/imgupdate`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.status !== 204) {
                const res = await response.json();
                throw new Error(res.message || 'Failed to update profile image');
            }

            setSuccess('Profile image updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile image:', error);
            setError('Failed to update profile image. Please try again.');
        }
    };

    return (
        <AppLayout>
            <main className="bg-gray-50 min-h-screen">
                <section className="relative">
                    <div className="h-[20vh] sm:h-[25vh] w-full">
                        <img
                            src="/profile cover.png"
                            alt="User Profile Cover"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute left-4 sm:left-8 lg:left-12 -bottom-16 z-10">
                        <div className="relative">
                            <img
                                src={user ? user.profile : null}
                                alt="User Profile Image"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            {user && user.id === userId && (
                                <>
                                    <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50">
                                        <FaCamera size={15} />
                                    </label>
                                    <form encType="multipart/form-data">
                                        <input name="profile" onChange={handleImageChange} type="file" id="image-upload" className="hidden" accept="image/*" />
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="px-4 sm:px-8 mt-20 mb-5">
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user ? user.name : "Loading..."}</h1>
                                    {user && user.id === userId && (
                                        <Link to={'/profile/update'}>
                                            <FaPen className="cursor-pointer hover:text-gray-600" size={15} />
                                        </Link>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">Member since January {user ? user.member_since : "Loading..."}</p>
                            </div>
                            <div className="flex gap-2">
                                {user && user.id !== userId && (
                                    <RedirectButton label={'Message'} href={`/chat/${user.id}`} />
                                )}
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold mb-3">About</h2>
                            <p className="text-gray-600 text-sm sm:text-base">{user ? user.description : "Loading..."}</p>
                        </div>
                    </div>
                </section>

                <section className="px-4 sm:px-8 mb-8">
                    <div className="max-w-full">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">Active Listings</h1>

                        {user && user.lastActiveProducts && user.lastActiveProducts.length <= 0 ? (
                            <NoProductsView />
                        ) : user ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                                    {user.lastActiveProducts
                                        .slice(0, isMobile ? 1 : undefined)
                                        .map((product) => (
                                            <Item key={product.id} item={product} />
                                        ))}
                                </div>
                                {((isMobile && user.lastActiveProducts.length >= 1) ||
                                    (!isMobile && user.lastActiveProducts.length >= 6)) && (
                                        <div className="flex justify-center mt-8">
                                            <RedirectButton label="See All Listings" href="/products/me" />
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600">Loading...</div>
                        )}
                    </div>
                </section>
            </main>
        </AppLayout>
    );
};

export default Index;