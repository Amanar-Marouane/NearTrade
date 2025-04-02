import { FaStar } from "react-icons/fa";

const App = ({ img, name, rating, comment }) => {
    return (
        <div className="flex items-start gap-2">
            <img src={img} alt={name} className="w-8 h-8 rounded-[50%]" />
            <div>
                <h1 className="text-lg font-semibold">{name}</h1>
                <div className="flex items-center gap-2">
                    <FaStar color="gold" />
                    <h1 className="font-semibold">{rating}</h1>
                </div>
                <h1>{comment}</h1>
            </div>
        </div>
    )
}

export default App;