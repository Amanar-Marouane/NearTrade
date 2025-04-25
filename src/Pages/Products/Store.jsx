import AppLayout from '../../layouts/AppLayout';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Select from '../../components/Select';
import { Context } from '../../context/UserContext';

const Store = () => {
    const navigate = useNavigate();
    const { userId } = useContext(Context);
    const host = import.meta.env.VITE_HOST;
    const [categories, setCategories] = useState(null);
    const [status, setSatus] = useState(null);
    const [images, setImages] = useState([null, null, null, null]);
    const [imageFiles, setImageFiles] = useState([null, null, null, null]);
    const [imageCount, setImageCount] = useState(0);

    const data = async () => {
        try {
            const response = await fetch(`${host}/api/products/add`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (response.status === 403) {
                navigate('/login');
                return;
            }

            setCategories(result.data['categories']);
            setSatus(result.data['status']);
        } catch (error) {
            console.error("Error:", error);
            navigate('/login');
        }
    }

    useEffect(() => {
        data()
    }, []);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImageFiles = [...imageFiles];
        newImageFiles[index] = file;
        setImageFiles(newImageFiles);

        const reader = new FileReader();
        reader.onload = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);

            const actualImages = newImages.filter(img => img !== null);
            setImageCount(actualImages.length);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);

        const newImageFiles = [...imageFiles];
        newImageFiles[index] = null;
        setImageFiles(newImageFiles);

        const actualImages = newImages.filter(img => img !== null);
        setImageCount(actualImages.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        imageFiles.forEach((file) => {
            if (file !== null) {
                formData.append(`images[]`, file);
            }
        });


        try {
            document.querySelectorAll('.error').forEach(element => {
                element.innerHTML = '';
            });

            const response = await fetch(`${host}/api/products`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                credentials: 'include',
                body: formData,
            });

            const result = await response.json();

            if (response.status === 201) {
                navigate('/profile/' + userId);
            }
            console.log(result);

            if (result.errors) {
                const errors = Object.entries(result.errors).reduce((acc, [key, value]) => {
                    acc[key] = value[0];
                    return acc;
                }, {});

                Object.entries(errors).forEach(([key, message]) => {
                    const errorSpan = document.querySelector(`.${key}-error`);
                    if (errorSpan) {
                        errorSpan.innerHTML = message;
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppLayout>
            <main className='min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8'>
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-sm sm:shadow-md rounded-lg p-4 sm:p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <a href="/products/me" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                                <img src="/back-icon.svg" alt="Back" className='h-6 w-6 sm:h-8 sm:w-8' />
                            </a>
                            <h1 className="text-xl sm:text-2xl font-bold text-black">Create New Product</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                title="Product Name"
                                src="/product-icon.svg"
                                placeholder="What you want to sell"
                            />

                            <Input
                                type="text"
                                id="description"
                                name="description"
                                title="Description"
                                src="/description-icon.svg"
                                placeholder="Describe your item"
                            />

                            <Input
                                type="text"
                                id="location"
                                name="location"
                                title="Location"
                                src="/location-icon.svg"
                                placeholder="Location of your item"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <Select name="category_id" label="Category" src="/category-icon.svg">
                                    <option value="null" selected disabled>Select a category</option>
                                    {categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.category}</option>
                                    ))}
                                </Select>

                                <Select name="status" label="Status" src="/status-icon.svg">
                                    <option value="null" selected disabled>Select a status</option>
                                    {status && status.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </Select>
                            </div>

                            <Input
                                type="number"
                                id="price"
                                name="price"
                                title="Price (DH)"
                                src="/price-icon.svg"
                                placeholder="How much you want to sell it for"
                            />

                            <div className="px-4 sm:px-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm sm:text-base font-medium text-gray-700">
                                        Product Images <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-xs sm:text-sm text-gray-500">
                                        Upload at least 1, up to 4 images
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            {image ? (
                                                <div className="relative h-28 sm:h-32 border rounded-lg overflow-hidden group">
                                                    <img
                                                        src={image}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                imageCount < 4 && (index === 0 || images[index - 1] !== null) ? (
                                                    <label className="flex flex-col items-center justify-center h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                        <div className="flex flex-col items-center justify-center p-2 sm:p-4">
                                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                            </svg>
                                                            <p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
                                                                {index === 0 ? "Add main image" : `Add image ${index + 1}`}
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleImageChange(e, index)}
                                                            accept="image/*"
                                                            name="images"
                                                        />
                                                    </label>
                                                ) : null
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {imageCount === 0 && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-2">
                                        At least one image is required
                                    </p>
                                )}
                            </div>

                            <div className="pt-4">
                                <FormButton title="Create Product" />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}

export default Store