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
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(0);
    const [inFilterMode, setInFilterMode] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productStatus, setProductSatus] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterData, setFilterData] = useState({
        'name': '',
        'location': '',
        'status': [],
        'price': '',
        'category_id': '',
    });

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
        const debounceTimer = setTimeout(() => {
            const filter = async () => {
                try {
                    const response = await fetch(`${host}/api/products/filter`, {
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
        }, 500)

        return () => clearTimeout(debounceTimer);
    }, [filterData]);

    return (
        <AppLayout>
            <main className="h-[85vh] flex flex-col lg:flex-row overflow-hidden">
                <LoadingContent status={status} />

                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                </button>

                <div className={`${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                    fixed lg:static inset-y-0 left-0 z-40 w-64 lg:w-[25%] transform transition-transform duration-300 ease-in-out
                    border-b lg:border-r border-gray-200 p-4 sm:p-6 bg-white overflow-y-auto`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Search & Filter</h2>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <form className="space-y-4 sm:space-y-6">
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

                        <div className="space-y-2 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Price Range </h3>
                            <div className="space-y-2 sm:space-y-4">
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="(1- 20000 DH)"
                                    min="1"
                                    onChange={(e) => {
                                        setFilterData(prev => ({ ...prev, price: e.target.value }));
                                        if (e.target.value <= 0) e.target.value = 1;
                                        if (e.target.value > 20000) e.target.value = 20000;
                                    }}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Condition: </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                {status && productStatus.map((status, index) => {
                                    return <div key={index} className="flex items-center gap-2">
                                        <input type="checkbox" id={"status" + index} value={status} onChange={(e) => {
                                            if (e.target.checked)
                                                setFilterData(prev => ({ ...prev, status: [...prev.status, e.target.value] }));
                                            else
                                                setFilterData(prev => ({ ...prev, status: prev.status.filter(value => value !== e.target.value) }));
                                        }} />
                                        <label htmlFor={"status" + index} className="text-sm sm:text-base text-gray-600">{status}</label>
                                    </div>;
                                })}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Categories: </h3>
                            <select onChange={(e) => {
                                setFilterData(prev => ({ ...prev, category_id: e.target.value }));
                            }}
                                name="category_id" id="category_id" className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-sm sm:text-base">
                                <option value="" selected>All categories</option>
                                {categories && categories.map((category) => {
                                    return <option key={category.id} value={category.id}>{category.category}</option>;
                                })}
                            </select>
                        </div>
                    </form>
                </div>

                {isFilterOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setIsFilterOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col">
                    <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Featured Listings</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {products && products.length > 0 ? (
                            !inFilterMode ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {products.map((product) => (
                                        <ItemCard key={product.id} item={product} />
                                    ))}
                                </div>
                            ) : (
                                filteredProducts && filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {filteredProducts.map((product) => (
                                            <ItemCard key={product.id} item={product} />
                                        ))}
                                    </div>
                                ) : (
                                    <NoProductsView />
                                )
                            )
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
