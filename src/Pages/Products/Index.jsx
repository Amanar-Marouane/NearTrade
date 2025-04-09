import { useState } from "react";
import SearchInput from "./../../components/SearchInput";
import LocationSelect from "./../../components/LocationSelect";
import ItemCard from './../../components/ItemCard';
import AppLayout from "../../layouts/AppLayout";

const Index = () => {
    const [priceRange, setPriceRange] = useState(5000);
    const featuredProducts = [
        {
            name: "iPhone 13 Pro",
            price: 899,
            location: "Agadir-Dcheira",
            rating: 4.8,
            reviewsCount: 15,
            image: "./iphone.png"
        },
        {
            name: "Modern Leather Sofa",
            price: 599,
            location: "Agadir-Dcheira",
            rating: 4.9,
            reviewsCount: 23,
            image: "./iphone.png"
        },
        {
            name: "Mountain Bike",
            price: 450,
            location: "Agadir-Dcheira",
            rating: 4.7,
            reviewsCount: 8,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviewsCount: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviewsCount: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviewsCount: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviewsCount: 12,
            image: "./iphone.png"
        },
        {
            name: "Gaming Console",
            price: 299,
            location: "Agadir-Dcheira",
            rating: 4.6,
            reviewsCount: 12,
            image: "./iphone.png"
        }
    ];

    return (
        <AppLayout>
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
                            {featuredProducts.map((product) => (
                                <ItemCard img={product.image} name={product.name} price={product.price} location={product.location} rating={product.rating} reviewsCount={product.reviewsCount} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
};

export default Index;
