import { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import { Link, Outlet } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Chat = () => {
    const host = import.meta.env.VITE_HOST;
    const [recentChats, setRecentChats] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const History = async () => {
        try {
            const response = await fetch(`${host}/api/message/history`, {
                credentials: 'include',
            });
            const res = await response.json();
            setRecentChats(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        History();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <AppLayout>
            <main className="h-[85vh] flex">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
                >
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {isSidebarOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={toggleSidebar}
                    />
                )}

                <section className={`
                    h-full bg-white border-r border-gray-200 rounded-lg shadow-sm
                    md:w-[30%] md:static md:block md:translate-x-0
                    fixed top-0 left-0 w-[280px] z-40
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="p-6 pt-16 md:pt-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">Recent Chats</h2>
                        <div className="space-y-3">
                            {recentChats?.map((chat) => (
                                <Link
                                    key={chat.id}
                                    to={`${chat.id}`}
                                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm"
                                    onClick={() => {
                                        if (window.innerWidth < 768) {
                                            setSidebarOpen(false);
                                        }
                                    }}
                                >
                                    <img
                                        src={`${host}/${chat.profile}`}
                                        alt={chat.name}
                                        className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-lg truncate">{chat.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
        </AppLayout>
    )
}

export default Chat