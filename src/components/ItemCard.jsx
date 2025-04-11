import { FaMapMarkerAlt, FaRegHeart, FaTag, FaTags } from "react-icons/fa";

const ItemCard = ({ img, name, price, location, status, category, id }) => {
    return (
        <a href={`/product/${id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="relative">
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-48 object-contain bg-gray-100"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-200 transition">
                        <FaRegHeart className="text-gray-700 hover:text-black transition-colors" size={20} />
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg text-black truncate">{name}</h3>

                    <div className="flex items-center text-md text-black font-bold space-x-2">
                        <FaTag size={16} className="text-gray-700" />
                        <span>{price} DH</span>
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
