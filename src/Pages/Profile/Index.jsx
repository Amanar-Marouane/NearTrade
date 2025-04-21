import { FaCamera, FaPen, FaStar, } from "react-icons/fa";
import Item from './../../components/ItemCard';
import { useContext } from "react";
import AppLayout from "../../layouts/AppLayout";
import RedirectButton from "../../components/RedirectButton";
import { Context } from '../../context/UserContext';
import { Link } from "react-router-dom";

const Index = () => {
    const host = import.meta.env.VITE_HOST;
    const { userId, user, setError, setSuccess } = useContext(Context);

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
        < AppLayout >
            <main className="bg-gray-50 min-h-screen">
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
                                src={user ? user.profile : null}
                                alt="User Profile Image"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            <label htmlFor="image-upload" className="absolute bottom-0 right-0">
                                <FaCamera size={15} className="cursor-pointer" />
                            </label>
                            <form encType="multipart/form-data">
                                <input name="profile" onChange={handleImageChange} type="file" id="image-upload" className="hidden" />
                            </form>
                        </div>
                    </div>
                </section>

                <section className="px-8 mt-20 mb-5">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="flex justify-center items-center gap-4">
                                    <h1 className="text-2xl font-bold text-gray-900">{user ? user.name : "Loading..."}</h1>
                                    <Link to={'/profile/update'}>
                                        <FaPen className="cursor-pointer" size={15} />
                                    </Link>
                                </div>
                                <p className="text-gray-600 text-sm">Member since January {user ? user.member_since : "Loading..."}</p>

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
                                <p className="text-gray-600 w-[98%]">{user ? user.description : "Loading..."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-8 mb-5 flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Active Listings</h1>
                    <div className="cards-container gap-8 grid grid-cols-6 w-full">
                        {user ? user.lastActiveProducts.map((product) => (
                            <Item key={product.id} item={product} />
                        )) : "Loading..."}
                    </div>
                    {user ? user.lastActiveProducts.length >= 6 && (
                        <RedirectButton label={'See All Listings'} href='/products/me'></RedirectButton>
                    ) : ''}
                </section>
            </main>
        </AppLayout >
    );
};

export default Index;