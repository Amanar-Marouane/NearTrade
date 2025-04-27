import AppLayout from "../../layouts/AppLayout"
import ItemCard from "../../components/ItemCard"
import { useNavigate } from "react-router-dom";
import LoadingContent from "../../services/loadingContent";
import { useState, useEffect } from "react";
import NoProductsView from "../../components/products/NoProductsView";
import { Link } from "react-router-dom";

const UserProducts = () => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const [status, setStatus] = useState(0);
    const [products, setProducts] = useState(null);

    const UserProducts = async () => {
        try {
            const response = await fetch(`${host}/api/products/me`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            const result = await response.json();
            setStatus(response.status);
            if (response.status === 403) navigate('/login');
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        UserProducts()
    }, [])

    return (
        <AppLayout>
            <LoadingContent status={status} />
            <main className="min-h-[85vh] px-4 py-6 sm:px-6 lg:px-8">
                <div className="max-w-7xl">
                    <section className="mb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Products</h1>
                            <Link to={"/new"}>
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Product
                                </button>
                            </Link>
                        </div>
                    </section>

                    {products && products.length > 0 ? (
                        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                            {products.map(product => (
                                <ItemCard key={product.id} item={product} />
                            ))}
                        </section>
                    ) : (
                        <NoProductsView />
                    )}
                </div>
            </main>
        </AppLayout>
    )
}

export default UserProducts