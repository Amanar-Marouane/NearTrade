import { useNavigate, useParams } from "react-router-dom";
import FormButton from "../FormButton";
import { useContext, useEffect, useRef, useState } from "react";
import Pusher from 'pusher-js';
import { Context } from "../../context/UserContext";
import LoadingContent from "../../services/loadingContent";

const Convo = () => {
    const host = import.meta.env.VITE_HOST;
    const navigate = useNavigate();
    const { id } = useParams();
    const { userId, setError } = useContext(Context);
    const [message, setMessage] = useState("");
    const [chatId, setChatId] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const [access, setAccess] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (id && userId) {
            const idChecker = async () => {
                try {
                    const response = await fetch(`${host}/api/is_user/${id}`, {
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        }
                    });
                    setStatus(response.status);

                    const res = await response.json();
                    setAccess(res.data);
                    if (!res.data) navigate('/chat');
                } catch (error) {
                    console.log(error);
                }
            }
            idChecker();
        }
    }, []);

    useEffect(() => {
        if (!access) return;

        const getChatId = async () => {
            try {
                const response = await fetch(`${host}/api/chat_id/${id}/${userId}`, {
                    credentials: 'include',
                });
                const res = await response.json();
                setChatId(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getChatId();
    }, [access]);

    useEffect(() => {
        if (!access) return;
        if (!chatId) return;

        const Index = async () => {
            try {
                const response = await fetch(`${host}/api/message/${chatId}`, {
                    credentials: 'include',
                });
                const res = await response.json();
                setConversation(res.data);
                setOtherUser(res.message);
            } catch (error) {
                console.log(error);
            }
        };
        Index();

        // Pusher.logToConsole = true;

        const pusher = new Pusher('3c0a9b14f19d9778fed6', {
            cluster: 'mt1',
            encrypted: true,
            authEndpoint: '/broadcasting/auth'
        });

        const channel = pusher.subscribe('chat.' + chatId);

        channel.bind('chatEvent', (data) => {
            if (data.message.sender_id !== userId) {
                console.log(data);

                setConversation((prev) => [
                    ...prev,
                    {
                        id: data.message.id,
                        sender: data.message.sender,
                        message: data.message.message,
                        timestamp: data.message.timestamp,
                        sender_id: data.message.sender_id,
                        receiver_id: data.message.receiver_id,
                        type: data.message.type || 'message',
                        status: data.message.status,
                        product: data.message.product,
                        offer: data.message.offer,
                        chat_id: data.message.chat_id,
                    }
                ]);
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [id, userId, chatId, access]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageData = message;
        setMessage('');

        if (message !== '') {

            try {
                const response = await fetch(`${host}/api/message`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageData,
                        receiver_id: id,
                    }),
                });
                if (!response.ok) {
                    setError('Check your connection');
                }
                const res = await response.json();
                setConversation((prev) => [
                    ...prev,
                    res.data
                ]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    return (
        <section className="w-full h-full flex flex-col">
            <LoadingContent status={status} />

            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold">Conversation with {otherUser ?? '...'}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 ${msg.type === 'Offer'
                            ? 'bg-yellow-100 border-2 border-yellow-300 text-gray-800'
                            : msg.sender_id !== userId
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}>
                            <p className="font-medium text-sm">{msg.sender_id === userId ? 'Me' : otherUser}</p>
                            {msg.type === 'Offer' ? (
                                <div className="space-y-2">
                                    <p>{msg.message}</p>
                                    <p className="font-semibold">{msg.offer} DH</p>
                                    {msg.status === 'Pending' && msg.sender_id !== userId && (
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    )}
                                    {msg.status && msg.status !== 'Pending' && (
                                        <p className={`mt-2 font-medium ${msg.status === 'Accepted' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            Status: {msg.status}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p>{msg.message}</p>
                            )}
                            <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex justify-between gap-4">
                    <div className={`flex justify-center items-center border p-1 w-full`}>
                        <label htmlFor={id}>
                            <img src={'/description-icon.svg'} alt="Input Icon" className="w-8 h-8" />
                        </label>
                        <input
                            autoComplete="on"
                            className="w-full p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                            type={"text"}
                            name={'message'}
                            id={'message'}
                            placeholder={"Send message"}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div>
                        <FormButton title="Send" />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Convo