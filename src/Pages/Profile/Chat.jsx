import AppLayout from "../../layouts/AppLayout"
import { Link, Outlet } from "react-router-dom"

const Chat = () => {
    const recentChats = [
        {
            id: 1,
            name: "John Smith",
            image: "https://i.pravatar.cc/150?img=1",
            lastMessage: "Hey, how are you?"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            image: "https://i.pravatar.cc/150?img=2",
            lastMessage: "The project looks great!"
        },
        {
            id: 3,
            name: "Mike Wilson",
            image: "https://i.pravatar.cc/150?img=3",
            lastMessage: "Let's meet tomorrow"
        }
    ];

    return (
        <AppLayout>
            <main className="h-[85vh] flex">
                <section className="w-[30%] h-full bg-white border-r border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">Recent Chats</h2>
                        <div className="space-y-3">
                            {recentChats.map((chat) => (
                                <Link key={chat.id} to={`${chat.id}`} className="flex items-center space-x-4 p-3 hover:bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm">
                                    <img
                                        src={chat.image}
                                        alt={chat.name}
                                        className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-lg truncate">{chat.name}</h3>
                                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                
                <Outlet />
            </main>
        </AppLayout>
    )
}

export default Chat