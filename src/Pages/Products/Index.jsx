import React, { useEffect, useState } from "react";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as IoIcons from 'react-icons/io5';
import { FaMapMarkerAlt, FaStar, FaRegHeart } from "react-icons/fa";
import Header from './../../components/Header';

const Index = () => {
    const [icons, setIcons] = useState([]);

    const testWords = [
        'computer', 'bicycle', 'pizza', 'football', 'music',
        'camera', 'book', 'phone', 'car', 'house',
        'coffee', 'shopping', 'gaming', 'travel', 'food',
        'movie', 'sports', 'fashion', 'art', 'technology'
    ];

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
        }
    ];

    const findIconForWord = (word) => {
        const allIcons = {
            ...FaIcons,
            ...MdIcons,
            ...GiIcons,
            ...BiIcons,
            ...HiIcons,
            ...IoIcons
        };

        const iconKey = Object.keys(allIcons).find(key =>
            key.toLowerCase().includes(word.toLowerCase())
        );

        return iconKey ? allIcons[iconKey] : null;
    };

    useEffect(() => {
        const loadIcons = async () => {
            try {
                const iconsData = testWords.map(word => ({
                    name: word,
                    icon: findIconForWord(word)
                }));

                setIcons(iconsData);
            } catch (error) {
                console.error('Error loading icons:', error);
            }
        };

        loadIcons();
    }, []);

    return (
        <main className="min-h-[95vh]">
            <Header />

            <section className="categories-section bg-[#D3D3D3]">
                <div className="categories-container">
                    {icons.map((category, index) => (
                        <div key={index} className="icon-container" data-word={category.name}>
                            <p className="category-name">{category.name}</p>
                            <div className="icon-wrapper">
                                {category.icon ? (
                                    <category.icon className="icon-image" size={24} />
                                ) : (
                                    <span className="icon-image">📦</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-8 mb-8 px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Featured Listings</h2>
                    <select className="px-4 py-2 border rounded-md bg-white" defaultValue="newest">
                        <option value="newest">Sort by: Newest</option>
                        <option value="price">Sort by: Price</option>
                        <option value="rating">Sort by: Rating</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-contain"
                                />
                                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                                    <FaRegHeart className="text-gray-600 hover:text-red-500 transition-colors" size={20} />
                                </button>
                            </div>
                            <div className="p-4 space-y-3">
                                <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                                <p className="font-semibold text-lg text-gray-900">${product.price}</p>
                                <div className="flex items-center text-gray-600 space-x-2">
                                    <FaMapMarkerAlt size={16} />
                                    <span className="text-sm">{product.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaStar size={16} className="text-yellow-400" />
                                    <span className="text-sm text-gray-600">
                                        {product.rating} • {product.reviews} reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Index;
