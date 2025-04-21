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

const Show = () => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const { id } = useParams();
    const [product, setProduct] = useState({ images: [] });
    const [profile, setProfile] = useState([]);
    const [status, setStatus] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { userId } = useContext(Context);
    const [favCount, setFavCount] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const { handleFavorite } = useContext(Context);

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

    // const featuredProducts = [
    //     {
    //         name: "iPhone 13 Pro",
    //         price: 899,
    //         location: "Agadir-Dcheira",
    //         rating: 4.8,
    //         reviews: 15,
    //         image: "/iphone.png"
    //     },
    //     {
    //         name: "Modern Leather Sofa",
    //         price: 599,
    //         location: "Agadir-Dcheira",
    //         rating: 4.9,
    //         reviews: 23,
    //         image: "/iphone.png"
    //     },
    // ];


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
                                <RedirectButton label={'Secure Purchase'} />
                                <RedirectButton label={'Message Seller'} />

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
                                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                                    <img src={profile ? profile.profile : ''} alt={profile ? profile.name : ''} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h1 className="font-semibold text-black">{profile ? profile.name : ''}</h1>
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
                <section className="space-y-8">
                    <h1 className="font-bold text-3xl">Similar Items:</h1>
                    <div className="grid grid-cols-6 gap-8">
                        {/* {featuredProducts.map((product, index) => (
                            <ItemCard key={index} item={product} />
                        ))} */}
                    </div>
                </section>
                <section className="space-y-4">
                    <h1 className="font-bold text-3xl">Costumers Reviews:</h1>
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
                            <h1>Based On 55 Reviews</h1>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Comment img={'/public/profile image.jpg'} name={'Marouane Allaoui'} rating={'4.8'} comment={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sint a aut doloribus minima sit veritatis culpa inventore nemo non optio, sed recusandae, quam illo perspiciatis aliquam ex veniam. Voluptates.'} />
                        <Comment img={'/public/profile image.jpg'} name={'Marouane Allaoui'} rating={'4.8'} comment={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sint a aut doloribus minima sit veritatis culpa inventore nemo non optio, sed recusandae, quam illo perspiciatis aliquam ex veniam. Voluptates.'} />
                        <Comment img={'/public/profile image.jpg'} name={'Marouane Allaoui'} rating={'4.8'} comment={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sint a aut doloribus minima sit veritatis culpa inventore nemo non optio, sed recusandae, quam illo perspiciatis aliquam ex veniam. Voluptates.'} />
                    </div>
                </section>
            </main>
        </AppLayout>
    )
}

export default Show;