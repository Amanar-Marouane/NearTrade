import React, { useState } from "react";
import SearchInput from "./../../components/SearchInput";
import LocationSelect from "./../../components/LocationSelect";
import { FaMapMarkerAlt, FaStar, FaRegHeart } from "react-icons/fa";

const Index = () => {
    const [priceRange, setPriceRange] = useState(5000);
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
        {
            name: "Mountain Bike",
            price: 450,
            location: "Agadir-Dcheira",
            rating: 4.7,
            reviews: 8,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviews: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviews: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviews: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviews: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviews: 12,
            image: "./iphone.png"
        }
    ];

    return (
        <main className="h-screen flex overflow-hidden">
            <div className="w-[25%] border-r border-gray-200 p-6 bg-white">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Search & Filter</h2>
                <div className="space-y-6">
                    <SearchInput type="text" id="search" name="search" placeholder="Search items nearby..." />

                    <div className="flex gap-2 items-center">
                        <select className="px-4 py-2 border border-gray-200 rounded-md bg-white" defaultValue="newest">
                            <option value="newest">Sort by: Newest</option>
                            <option value="price">Sort by: Price</option>
                            <option value="rating">Sort by: Rating</option>
                        </select>
                        <LocationSelect name="location" id="location" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Price Range</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>1 DH</span>
                                <span>5000 DH</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="5000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="text-sm text-gray-600">
                                Selected: {priceRange} DH
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">Condition: </h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="new" id="new" value="New" />
                                <label htmlFor="new" className="text-gray-600">New</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="used" id="used" value="Used" />
                                <label htmlFor="used" className="text-gray-600">Used</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="refurbished" id="refurbished" value="Refurbished" />
                                <label htmlFor="refurbished" className="text-gray-600">Refurbished</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="damaged" id="damaged" value="Damaged" />
                                <label htmlFor="damaged" className="text-gray-600">Damaged</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">Categories: </h3>
                        <select name="category" id="category" className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white">
                            <option value="" selected>All Categories</option>
                            <option value="1">Entertainment</option>
                            <option value="2">Sports</option>
                            <option value="3">Cooking</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="p-6 border-b border-gray-200 bg-white">
                    <h2 className="text-2xl font-semibold text-gray-800">Featured Listings</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-contain"
                                    />
                                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                                        <FaRegHeart className="text-gray-600 hover:text-blue-600 transition-colors" size={20} />
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                                    <p className="font-semibold text-lg text-blue-600">{product.price} DH</p>
                                    <div className="flex items-center text-gray-600 space-x-2">
                                        <FaMapMarkerAlt size={16} />
                                        <span className="text-sm">{product.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaStar size={16} className="text-blue-600" />
                                        <span className="text-sm text-gray-600">
                                            {product.rating} • {product.reviews} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Index;
