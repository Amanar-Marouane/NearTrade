import { FaMapMarkerAlt, FaStar, FaRegHeart, FaEdit, FaUserFriends, FaShoppingBag, FaExclamationTriangle } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import Item from './../../components/ItemCard';

const App = () => {
    const featuredProducts = [
        {
            name: "iPhone 13 Pro",
            price: 899,
            location: "Agadir-Dcheira",
            rating: 4.8,
            reviews: 15,
            image: "./iphone.png"
        },
        {
            name: "Modern Leather Sofa",
            price: 599,
            location: "Agadir-Dcheira",
            rating: 4.9,
            reviews: 23,
            image: "./iphone.png"
        },
    ];

    const productsSectionCount = document.querySelectorAll('.card').length;

    return (
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
                            src="/profile image.jpg"
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
                            <h1 className="text-2xl font-bold text-gray-900">Marouane L3alawi</h1>
                            <p className="text-gray-600 text-sm">Member since January 2023</p>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" size={16} />
                                    <span className="font-medium">4.9</span>
                                    <span className="text-gray-500">(128 reviews)</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-700">
                                    <span>243 transactions</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-700">
                                    <span>98% response rate</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                <BiMessageDetail size={20} />
                                Message
                            </button>
                            <button className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-gray-700">
                                <FaExclamationTriangle size={16} />
                                Report
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">About</h2>
                            <p className="text-gray-600 w-[98%]">
                                Passionate about technology and trading. I sell high-quality tech products and accessories.
                                Feel free to check out my listings or contact me for any inquiries.Passionate about technology and trading. I sell high-quality tech products and accessories.
                            </p>
                        </div>

                        <div className="w-full">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Recent Reviews</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="border-b pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium">Michael R.</span>
                                        <div className="flex text-yellow-400">
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Great seller! Item was exactly as described and shipping was fast.</p>
                                </div>

                                <div className="border-b pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium">Michael R.</span>
                                        <div className="flex text-yellow-400">
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                            <FaStar size={16} />
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Great seller! Item was exactly as described and shipping was fast.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 mb-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Active Listings</h1>
                <div className="cards-container gap-8 grid grid-cols-6">
                    {featuredProducts.map((product) => (
                        <Item img={product.image} name={product.name} price={product.price} location={product.location} rating={product.rating} reviewsCount={product.reviewsCount} />
                    ))}
                </div>
                {productsSectionCount >= 6 && (
                    <button type="submit" className="px-6 py-4 bg-black text-white rounded-lg">
                        See All Listings
                    </button>
                )}
            </section>
        </main>
    );
};

export default App;