import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout"
import ItemCard from "../../components/ItemCard";
import NoProductsView from "../../components/products/NoProductsView";

const Favorite = () => {
    const host = import.meta.env.VITE_HOST;
    const [favorites, setFavorites] = useState(null);

    const Request = async () => {
        try {
            const response = await fetch(`${host}/api/favorites`, {
                credentials: 'include',
            })
            const res = await response.json();
            setFavorites(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Request();
    }, []);

    return (
        <AppLayout>
            <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
                <div className="max-w-full">
                    <section className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Favorites</h1>
                    </section>

                    {favorites && favorites.length > 0 ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                                {favorites
                                    .map(product => (
                                        <ItemCard key={product.id} item={product} />
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <NoProductsView />
                    )}
                </div>
            </main>
        </AppLayout>
    )
}

export default Favorite