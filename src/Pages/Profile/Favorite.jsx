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
            console.log(res.data);
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
            <main className="min-h-[85vh] p-8 space-y-8">
                <section>
                    <h1 className="font-bold text-3xl">My Favorites:</h1>
                </section>
                {favorites && favorites.length > 0 ? (
                    <section className="grid grid-cols-6 gap-4">
                        {
                            favorites.map(product => (
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

export default Favorite