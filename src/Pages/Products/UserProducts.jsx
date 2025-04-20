import AppLayout from "../../layouts/AppLayout"
import ItemCard from "../../components/ItemCard"
import { useNavigate } from "react-router-dom";
import LoadingContent from "../../services/loadingContent";
import { useState, useEffect } from "react";
import NoProductsView from "../../components/products/NoProductsView";

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
            <main className="min-h-[85vh] p-8 space-y-8">
                <section>
                    <h1 className="font-bold text-3xl">My Products:</h1>
                </section>
                {products && products.length > 0 ? (
                    <section className="grid grid-cols-6 gap-4">
                        {
                            products.map(product => (
                                <ItemCard key={product.id} item={product} />
                            ))
                        }
                    </section>
                ) : (
                    <NoProductsView />
                )}
            </main>
        </AppLayout>
    )
}

export default UserProducts