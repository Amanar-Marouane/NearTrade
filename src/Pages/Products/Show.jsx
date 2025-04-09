
// import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import RedirectButton from '../../components/RedirectButton';
import ItemCard from '../../components/ItemCard';
import Comment from '../../components/Comment';
import AppLayout from "../../layouts/AppLayout";

const Show = () => {
    // const { id } = useParams();

    const featuredProducts = [
        {
            name: "iPhone 13 Pro",
            price: 899,
            location: "Agadir-Dcheira",
            rating: 4.8,
            reviews: 15,
            image: "/iphone.png"
        },
        {
            name: "Modern Leather Sofa",
            price: 599,
            location: "Agadir-Dcheira",
            rating: 4.9,
            reviews: 23,
            image: "/iphone.png"
        },
    ];

    return (
        <AppLayout>
            <main className="px-8 py-12 flex flex-col gap-8">
                <section className="bg-gray-100 w-full h-[60vh] flex">
                    <div className="w-[50%] h-full p-4 flex flex-col justify-center items-center">
                        <img src="/public/iphone.png" alt="" className="object-contain w-full h-full" />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-bold">Iphone 13 Wlh Ila ba9i jdiiid</h1>
                            <h1 className="text-3xl font-semibold">500DH</h1>
                            <div className="flex items-center space-x-2">
                                <FaStar size={16} className="text-blue-600" />
                                <span className="text-sm text-gray-600">
                                    4.8 (25 reviews)
                                </span>
                            </div>
                            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quo ad, earum vitae qui aperiam repellendus! Aperiam, nostrum sapiente praesentium inventore vel nisi, quisquam enim quam, eum rem ratione exercitationem.</h2>
                            <div>
                                <h1 className="font-bold text-xl">HightLights:</h1>
                                <ul className="list-disc ml-8">
                                    <li>Cpu Akhir Makayn</li>
                                    <li>Camera Tahowa Akhir Makayn</li>
                                    <li>GPU Tahowa Akhir Makaynch</li>
                                </ul>
                            </div>
                            <div className="flex gap-8">
                                <RedirectButton title={'Secure Purchase'} />
                                <RedirectButton title={'Message Seller'} />
                            </div>
                        </div>
                        <div className="">
                            <h1 className="text-xl font-semibold">Seller Info:</h1>
                            <div className="flex gap-4">
                                <img src="/public/profile image.jpg" alt="" className="h-8 w-8 rounded-[50%]" />
                                <div>
                                    <h1>Marouane Allaoui</h1>
                                    <div className="flex items-center space-x-2">
                                        <FaStar size={16} className="text-blue-600" />
                                        <span className="text-sm text-gray-600">
                                            4.8 (25 reviews)
                                        </span>
                                    </div>
                                    <h1>Member Since 2001</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="space-y-8">
                    <h1 className="font-bold text-3xl">Similar Items:</h1>
                    <div className="grid grid-cols-6 gap-8">
                        {featuredProducts.map((product) => (
                            <ItemCard img={product.image} name={product.name} price={product.price} location={product.location} rating={product.rating} reviewsCount={product.reviewsCount} />
                        ))}
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