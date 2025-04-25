import { useContext, useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout"
import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";

const Update = () => {
    const { user, setError, setSuccess, userId } = useContext(Context);
    const host = import.meta.env.VITE_HOST;
    const [formData, setFormData] = useState({
        'name': user.name,
        'email': user.email,
        'description': user.description,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/profile/update`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            document.querySelectorAll('.error').forEach(e => e.innerHTML = '');

            if (response.status === 422) {
                const res = await response.json();
                const errors = Object.entries(res.errors).reduce((acc, [key, value]) => {
                    acc[key] = value[0];
                    return acc;
                }, {});

                Object.entries(errors).forEach(([key, message]) => {
                    const errorSpan = document.querySelector(`.${key}-error`);
                    if (errorSpan) {
                        errorSpan.innerHTML = message;
                    }
                });
                return;
            }

            if (!response.ok) {
                setError('Something Went Wrong Try Again');
                return;
            }

            if (response.status !== 204) {
                const res = await response.json();
                setSuccess(res.message);
            } else {
                setSuccess("Profile updated successfully.");
            }

        } catch (error) {
            console.log(error);
        }
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        console.log(formData);

    }, [formData]);

    return (
        <AppLayout>
            <main className='bg-gray-100 min-h-[85vh] flex items-center justify-center p-4'>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                    <Link to={`/profile/${userId}`}>
                        <img src="/back-icon.svg" alt="Get Back To Profile" className='h-8 w-8' />
                    </Link>
                    <h1 className="text-2xl font-bold text-center mb-8 text-black">Edit Your Profile</h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input onChange={handleInputChange} type={'text'} id={'name'} name={'name'} title={'Username'} src={'/user-icon.svg'} placeholder={'New name'} value={formData.name} />

                        <Input onChange={handleInputChange} type={'text'} id={'email'} name={'email'} title={'Email'} src={'/email-icon.svg'} placeholder={'Your email'} value={formData.email} />

                        <Input onChange={handleInputChange} type={'text'} id={'description'} name={'description'} title={'Description'} src={'/description-icon.svg'} placeholder={'Your description'} value={formData.description} />

                        <FormButton title='Update'></FormButton>
                    </form>
                </div>
            </main>
        </AppLayout >
    )
}

export default Update