import { useContext, useState } from "react";
import { FaMapMarkerAlt, FaRegHeart, FaTag, FaTags, FaStar } from "react-icons/fa";
import clsx from 'clsx';
import { Context } from "../context/UserContext";

const ItemCard = ({ item }) => {
    const host = import.meta.env.VITE_HOST;
    const { name, price, location, category, status, images, id, isFaved, favorites_count, average_rating } = item;
    const [favCount, setFavCount] = useState(favorites_count);
    const [isFavorite, setIsFavorite] = useState(isFaved);
    const { handleFavorite } = useContext(Context);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.id;
        console.log(id);

        setIsFavorite(prevIsFavorite => !prevIsFavorite);
        const updatedCount = handleFavorite(id);
        setFavCount(updatedCount);
    };

    return (
        <a href={`/product/${id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="relative">
                    <img
                        src={`${host}${images[0]}`}
                        alt={name}
                        className="w-full h-48 object-contain bg-gray-100"
                    />
                    <button
                        id={id}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-200 transition"
                        onClick={toggleFavorite}
                    >
                        <FaRegHeart
                            className={clsx(
                                'transition-colors',
                                isFavorite
                                    ? 'hover:text-gray-700 fill-red-700'
                                    : 'hover:text-red-700 fill-gray-700'
                            )}
                            size={20}
                        />
                        <p className="text-xs font-semibold text-gray-700">{favCount}</p>
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg text-black truncate">{name}</h3>

                    <div className="flex items-center text-md text-black font-bold space-x-2">
                        <FaTag size={16} className="text-gray-700" />
                        <span>{price} DH</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <div className="flex">
                        <FaStar className="text-yellow-500" />
                        </div>
                        <span className="text-sm text-gray-600">({average_rating})</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <FaMapMarkerAlt size={14} />
                        <span>{location ?? 'Ghir hna'}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <FaTags size={14} />
                        <span>{category} | {status}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ItemCard;