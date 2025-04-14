import AppLayout from '../../layouts/AppLayout';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from '../../components/Select';
import LoadingContent from '../../services/loadingContent';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const [categories, setCategories] = useState(null);
    const [status, setStatus] = useState(null);
    const [images, setImages] = useState([null, null, null, null]);
    const [imageFiles, setImageFiles] = useState([null, null, null, null]);
    const [imageCount, setImageCount] = useState(0);
    const [product, setProduct] = useState([]);
    const [fetchStatus, setFetchStatus] = useState([]);

    const data = async () => {
        try {
            const response = await fetch(`${host}/api/product/add`, {
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
            setStatus(result.data['status']);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const item = async () => {
        try {
            const response = await fetch(`${host}/api/product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            setFetchStatus(response.status);

            const result = await response.json();
            const prod = result.data['product'];
            if (!prod['canUpdate']) navigate('/products/me');
            
            setProduct(prod);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();
        item();
    }, []);

    useEffect(() => {
        if (!product || !product.images) return;

        const existingImagesCount = product.images.length || 0;
        setImageCount(existingImagesCount);

        const newImages = [...images];
        for (let i = 0; i < existingImagesCount && i < 4; i++) {
            newImages[i] = product.images[i];
        }
        setImages(newImages);

        const fetchFiles = async () => {
            const newFiles = await Promise.all(
                product.images.slice(0, 4).map((url) => toFile(url))
            );
            const paddedFiles = [...newFiles];
            while (paddedFiles.length < 4) paddedFiles.push(null);
            setImageFiles(paddedFiles);
        };

        fetchFiles();
    }, [product]);


    async function toFile(imageUrl) {
        const urlParts = imageUrl.split('/');
        const fullFileName = urlParts[urlParts.length - 1];
        const fileNameParts = fullFileName.split('.');
        const extension = fileNameParts.pop();
        const mimeType = ('image/' + extension);

        const response = await fetch(`${host + '/api/image/' + fullFileName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const blob = await response.blob();
        if (blob.size === 0) {
            throw new Error('Blob is empty!');
        }

        return new File([blob], fullFileName, { type: mimeType });
    }


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

            const response = await fetch(`${host}/api/product/update/${id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                credentials: 'include',
                body: formData,
            });

            const result = await response.json();

            if (response.status === 200) {
                navigate('/products/me');
            }

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
            <LoadingContent status={fetchStatus} />
            <main className='bg-gray-100 min-h-screen flex items-center justify-center p-4'>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                    <a href="/products/me">
                        <img src="/back-icon.svg" alt="Get Back To The List" className='h-8 w-8' />
                    </a>

                    <h1 className="text-2xl font-bold text-center mb-8 text-black">Edit Your Item</h1>

                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <Input type={'text'} id={'name'} name={'name'} title={'Product Name'} src={'/product-icon.svg'} placeholder={'What you want to sell'} value={product.name} />

                        <Input type={'text'} id={'description'} name={'description'} title={'Description'} src={'/description-icon.svg'} placeholder={'Describe your item'} value={product.description} />

                        <Input type={'text'} id={'location'} name={'location'} title={'Location'} src={'/location-icon.svg'} placeholder={'Location your item'} value={product.location} />

                        <Select name={'category_id'} label={'Category'} src={'/category-icon.svg'} value={product.category_id}>
                            <option value="null" selected disabled>Select a category</option>
                            {categories && categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.category}</option>;
                            })}
                        </Select>

                        <Select name={'status'} label={'Status'} src={'/status-icon.svg'} value={product.status}>
                            <option value="null" selected disabled>Select a status</option>
                            {status && status.map((status, index) => {
                                return <option key={index} value={status}>{status}</option>;
                            })}
                        </Select>

                        <Input type={'number'} id={'price'} name={'price'} title={'Price (DH)'} src={'/price-icon.svg'} placeholder={'How much you going to sell it'} value={product.price} />

                        <div className='px-6'>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Product Images <span className="text-red-500">*</span>
                                <span className="text-gray-500 text-xs ml-2">
                                    (Upload at least 1, up to 4 images)
                                </span>
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        {image ? (
                                            <div className="relative h-32 border rounded-lg overflow-hidden">
                                                <img
                                                    src={typeof image === 'string' && image.startsWith('data:')
                                                        ? image
                                                        : `${host}${image}`}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ) : (
                                            imageCount < 4 && (index === 0 || images[index - 1] !== null) ? (
                                                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                        </svg>
                                                        <p className="text-xs text-gray-500">
                                                            {index === 0 ? "Add main image" : `Add image ${index + 1}`}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => handleImageChange(e, index)}
                                                        name={`image-${index}`}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            ) : null
                                        )}
                                    </div>
                                ))}
                            </div>

                            {imageCount === 0 && (
                                <p className="text-red-500 text-xs mt-2">
                                    At least one image is required
                                </p>
                            )}
                        </div>

                        <FormButton title='Create Product'></FormButton>
                    </form>
                </div>
            </main>
        </AppLayout>
    )
}

export default Update