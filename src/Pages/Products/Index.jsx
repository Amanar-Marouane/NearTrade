import { useEffect, useState } from "react";
import SearchInput from "./../../components/SearchInput";
import ItemCard from './../../components/ItemCard';
import AppLayout from "../../layouts/AppLayout";
import LoadingContent from "../../services/loadingContent";
import NoProductsView from "../../components/products/NoProductsView";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const [priceRange, setPriceRange] = useState(0);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(0);
    const [inFilterMode, setInFilterMode] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productStatus, setProductSatus] = useState([]);
    const [filterData, setFilterData] = useState({
        'name': '',
        'location': '',
        'status': [],
        'price': '',
        'category_id': '',
    });

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
            setProductSatus(result.data['status']);
        } catch (error) {
            console.error("Error:", error);
            navigate('/login');
        }
    }

    const index = async () => {
        try {
            const response = await fetch(`${host}/api/products`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            setStatus(response.status);
            const result = await response.json();
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();
        index();
    }, []);

    useEffect(() => {
        const filter = async () => {
            try {
                const response = await fetch(`${host}/api/product/filter`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(filterData),
                });
                setStatus(response.status);
                const result = await response.json();
                setFilteredProducts(result.data);
                setInFilterMode(true);
            } catch (error) {
                console.log(error);
            }
        };
        filter();
    }, [filterData]);

    return (
        <AppLayout>
            <main className="h-[85vh] flex overflow-hidden">
                <LoadingContent status={status} />
                <div className="w-[25%] border-r border-gray-200 p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Search & Filter</h2>
                    <form className="space-y-6">
                        <SearchInput onChange={(e) => {
                            setFilterData(prev => ({ ...prev, name: e.target.value }));
                        }}
                            type="text" id="search" name="search" placeholder="Search items nearby..." />

                        <div className="relative">
                            <input onChange={(e) => {
                                setFilterData(prev => ({ ...prev, location: e.target.value }));
                            }}
                                type='text' id='location' placeholder='Where You Want To Search In' name='location' className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400" />
                            <label htmlFor="location">
                                <img src='/location-icon.svg' className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </label>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>1 DH</span>
                                    <span>20000 DH</span>
                                </div>
                                <input
                                    type="range"
                                    name="price"
                                    min="1"
                                    max="20000"
                                    value={priceRange}
                                    onChange={(e) => {
                                        setPriceRange(e.target.value);
                                        setFilterData(prev => ({ ...prev, price: e.target.value }));

                                    }}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="text-sm text-gray-600">
                                    Selected: {priceRange} DH
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800">Condition: </h3>
                            <div className="flex flex-wrap gap-4">
                                {status && productStatus.map((status, index) => {
                                    return <div key={index} className="flex items-center gap-2">
                                        <input type="checkbox" id={"status" + index} value={status} onChange={(e) => {
                                            if (e.target.checked)
                                                setFilterData(prev => ({ ...prev, status: [...prev.status, e.target.value] }));
                                            else
                                                setFilterData(prev => ({ ...prev, status: prev.status.filter(value => value !== e.target.value) }));
                                        }} />
                                        <label htmlFor={"status" + index} className="text-gray-600">{status}</label>
                                    </div>;
                                })}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800">Categories: </h3>
                            <select onChange={(e) => {
                                setFilterData(prev => ({ ...prev, category_id: e.target.value }));
                            }}
                                name="category_id" id="category_id" className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white">
                                <option value="" selected>All categories</option>
                                {categories && categories.map((category) => {
                                    return <option key={category.id} value={category.id}>{category.category}</option>;
                                })}
                            </select>
                        </div>
                    </form>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="p-6 border-b border-gray-200 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800">Featured Listings</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {!inFilterMode ? products.map((product) => (
                                    <ItemCard key={product.id} id={product.id} img={`${host}${product.images[0]}`} name={product.name} price={product.price} location={product.location} category={product.category} status={product.status} />
                                )) :
                                    filteredProducts.map((product) => (
                                        <ItemCard key={product.id} id={product.id} img={`${host}${product.images[0]}`} name={product.name} price={product.price} location={product.location} category={product.category} status={product.status} />
                                    ))
                                }

                            </div>
                        ) : (
                            <NoProductsView />
                        )}
                    </div>

                </div>
            </main>
        </AppLayout>
    );
};

export default Index;
