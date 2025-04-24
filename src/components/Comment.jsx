import { FaStar } from "react-icons/fa";

const Comment = ({ img, name, rating, comment }) => {
    return (
        <div className="flex items-start gap-4 p-4 bg-white shadow-sm rounded-lg">
            <img
                src={img}
                alt={`${name}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-800">{name}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FaStar color="gold" />
                    <span className="font-medium">{rating}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{comment}</p>
            </div>
        </div>
    );
};

export default Comment;
