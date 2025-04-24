import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RedirectButton from '../../components/RedirectButton';
import ItemCard from '../../components/ItemCard';
import Comment from '../../components/Comment';
import AppLayout from "../../layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingContent from "../../services/loadingContent";
import DeleteButton from "../../components/products/DeleteButton";
import { Context } from "../../context/UserContext";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Show = () => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const { id } = useParams();
    const [product, setProduct] = useState({ images: [] });
    const [profile, setProfile] = useState([]);
    const [status, setStatus] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { userId, handleFavorite, setSuccess } = useContext(Context);
    const [favCount, setFavCount] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [offerPrice, setOfferPrice] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(5);


    const Product = async () => {
        try {
            const response = await fetch(`${host}/api/products/${id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (response.status === 403) navigate('/home');
            setStatus(response.status);
            setProfile(result.data.user);
            setProduct(result.data.product);
            setFavCount(result.data.product.favorites_count);
            setIsFavorite(result.data.product.isFaved);
            setReviews(result.data.product.reviews);

        } catch (error) {
            console.log(error);
        }
    }

    const toggleFavorite = (id) => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
        const updatedCount = handleFavorite(id);
        setFavCount(updatedCount);
    };

    useEffect(() => {
        Product();
    }, []);

    const goToPrevious = () => {
        if (!product.images || product.images.length <= 1) return;
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? product.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (!product.images || product.images.length <= 1) return;
        const isLastImage = currentIndex === product.images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const showControls = product.images && product.images.length > 1;

    const handleOfferSubmit = (e) => {
        e.preventDefault();
        const price = parseFloat(offerPrice);

        if (isNaN(price) || price <= 0) {
            setError('Please enter a valid positive number');
            return;
        }

        setShowConfirmation(true);
    };

    const confirmOffer = async () => {
        try {
            const response = await fetch(`${host}/api/deal/${product.id}`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'offer': offerPrice }),
            });
            const res = await response.json();
            setSuccess(res.message);
            navigate(`/chat/${profile.id}`);
        } catch (error) {
            console.log(error);
        }
        setShowOfferForm(false);
        setShowConfirmation(false);
        setOfferPrice('');
        setError('');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('rating', rating);

        try {
            const response = await fetch(`${host}/api/review/${product?.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            })

            const res = await response.json();

            if (response.status === 200) {
                setReviews(prevReviews => [
                    res.data,
                    ...prevReviews,
                ]);
            }
        } catch (error) {
            console.log(error);
        }

        e.target.reset();
    };

    return (
        <AppLayout>
            <main className="px-8 py-12 flex flex-col gap-8">
                <LoadingContent status={status} />
                <section className="bg-gray-100 w-full h-[60vh] flex">
                    <div className="w-[50%] h-full p-4">
                        <div className="relative w-full h-full">
                            <div className="relative overflow-hidden rounded-lg h-full">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={`${host}${product.images[currentIndex]}`}
                                        alt={`${product.name || 'Product'} - Image ${currentIndex + 1}`}
                                        className="object-contain w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <p className="text-gray-500">No image available</p>
                                    </div>
                                )}

                                {showControls && (
                                    <>
                                        <button
                                            onClick={goToPrevious}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
                                        >
                                            <FaChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={goToNext}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
                                        >
                                            <FaChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {showControls && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                                    {product.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between w-[50%] bg-white">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start justify-between w-full">
                                <div>
                                    <h1 className="text-4xl font-bold text-black">{product ? product.name : ''}</h1>
                                    <h1 className="text-3xl font-semibold text-black">{product ? product.price : '??'}DH</h1>
                                </div>

                                <div className="flex justify-center items-center flex-col">
                                    <button
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                                        onClick={() => toggleFavorite(id)}
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
                                        <p className="text-xm font-semibold text-gray-700">{favCount}</p>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FaStar size={16} className="text-black" />
                                <span className="text-sm text-gray-700">
                                    4.8 (25 reviews)
                                </span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                                <h2 className="text-gray-800">{product ? product.description : ''}</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="bg-gray-100 text-black-800 px-3 py-1 rounded-full text-sm">
                                    {product ? product.category : 'Uncategorized'}
                                </span>
                            </div>

                            <div className="flex gap-6 pt-3">
                                {product && product.user_id !== userId && (() => (
                                    <>
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                            onClick={() => setShowOfferForm(true)}
                                        >
                                            Offre a deal
                                        </button>
                                        <RedirectButton label={'Message Seller'} href={`/chat/${product.user_id}`} />
                                    </>
                                ))()}

                                {product && product.user_id === userId && (() => (
                                    <>
                                        <DeleteButton id={product.id} />
                                        <RedirectButton label="Edit" href={`/product/update/${product.id}`} />
                                    </>
                                ))()}
                            </div>

                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h1 className="text-xl font-bold text-black mb-4">Seller Info:</h1>
                            <div className="flex gap-4 items-center">
                                <Link to={"/profile/" + profile?.id}>
                                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                                        <img src={profile ? profile.profile : ''} alt={profile ? profile.name : ''} className="h-full w-full object-cover" />
                                    </div>
                                </Link>
                                <div>
                                    <Link to={"/profile/" + profile?.id}>
                                        <h1 className="font-semibold text-black">{profile ? profile.name : ''}</h1>
                                    </Link>
                                    <div className="flex items-center space-x-2 my-1">
                                        <FaStar size={14} className="text-black" />
                                        <span className="text-sm text-gray-700">
                                            4.8 (25 reviews)
                                        </span>
                                    </div>
                                    <h1 className="text-sm text-gray-600">Member Since {profile ? profile.member_since : ''}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {userId !== product.user_id && (
                    <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                        <form className="space-y-4" onSubmit={handleReviewSubmit}>
                            <div>
                                <label className="block text-gray-700 mb-2">Your Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="focus:outline-none"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            <FaStar
                                                size={24}
                                                className={clsx(
                                                    'transition-colors',
                                                    (hoverRating || rating) >= star
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {rating ? `Selected: ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Your Review</label>
                                <textarea
                                    name="review"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Share your experience with this product..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                )}
                <section className="space-y-4">
                    <h1 className="font-bold text-3xl">Customer Reviews:</h1>

                    {reviews && reviews.length > 0 ? (
                        <>
                            <div className="flex gap-2">
                                <h1 className="font-semibold text-2xl">4.8</h1>
                                <div>
                                    <div className="flex">
                                        <FaStar color="gold" />
                                        <FaStar color="gold" />
                                        <FaStar color="gold" />
                                        <FaStar color="gold" />
                                        <FaStar color="gold" />
                                    </div>
                                    <h1>Based on 55 Reviews</h1>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <Comment
                                        key={review.id}
                                        img={`${host}/${review.user_profile}`}
                                        name={review.user_name}
                                        rating={review.rating}
                                        comment={review.review}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 pb-0 bg-gray-50 rounded-lg">
                            <FaStar className="text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500 text-lg">No reviews yet</p>
                            <p className="text-gray-400 text-sm mt-2">Be the first to review this product</p>
                        </div>
                    )}
                </section>


                {showOfferForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>
                            <form onSubmit={handleOfferSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Your Offer (DH)
                                    </label>
                                    <input
                                        type="number"
                                        name="offre"
                                        value={offerPrice}
                                        onChange={(e) => {
                                            setOfferPrice(e.target.value);
                                            setError('');
                                        }}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter your offer"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    {error && (
                                        <p className="text-red-500 text-xs mt-1">{error}</p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowOfferForm(false);
                                            setError('');
                                        }}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Submit Offer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">Confirm Your Offer</h2>
                            <p className="mb-4">Are you sure you want to offer {offerPrice} DH for this item?</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setShowConfirmation(false);
                                        setError('');
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmOffer}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Yes, Submit Offer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </AppLayout>
    )
}

export default Show;