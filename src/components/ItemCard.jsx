import { FaMapMarkerAlt, FaStar, FaRegHeart } from "react-icons/fa";

const App = ({ img, name, price, location, rating, reviewsCount }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-48 object-contain"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                    <FaRegHeart className="text-gray-600 hover:text-blue-600 transition-colors" size={20} />
                </button>
            </div>
            <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                <p className="font-semibold text-lg text-blue-600">{price} DH</p>
                <div className="flex items-center text-gray-600 space-x-2">
                    <FaMapMarkerAlt size={16} />
                    <span className="text-sm">{location}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaStar size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-600">
                        {rating} • {reviewsCount} reviews
                    </span>
                </div>
            </div>
        </div>
    );
};

export default App;
