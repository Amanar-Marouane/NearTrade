import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id }) => {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HOST;
    const Delete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/products/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.status === 200) navigate('/products/me');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={Delete}>
            <button type="Submit" className="px-5 py-3 border-1 text-black rounded-lg cursor-pointer">
                Delete
            </button>
        </form>
    )
}

export default DeleteButton