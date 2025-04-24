import { useContext, useEffect, useState } from "react"
import FormButton from "../../components/FormButton"
import Input from "../../components/Input"
import GuestLayout from "../../layouts/GuestLayout"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../../context/UserContext"

const PasswordReset = () => {
    const host = import.meta.env.VITE_HOST;
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const { setSuccess, setError } = useContext(Context);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if (progress === 3) navigate('/login');
    }, [progress])

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            document.querySelectorAll('.error').forEach(element => {
                element.innerHTML = '';
            });

            const response = await fetch(`${host}/api/reset-password/send-vc`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const res = await response.json();
            if (response.status === 200) {
                const email = formData.get('email');
                setEmail(email);
                setSuccess(res.message);
                setProgress(1);
                return;
            }

            if (res.errors) {
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
            setError(res.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            document.querySelectorAll('.error').forEach(element => {
                element.innerHTML = '';
            });

            const response = await fetch(`${host}/api/reset-password/verify`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const res = await response.json();
            if (response.status === 200) {
                setSuccess(res.message);
                setProgress(2);
                return;
            }

            if (response.status === 400) {
                document.querySelector(`.verification-error`).innerHTML = 'Verification code is not valid or it might be expired';
                return;
            }
            setError(res.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('email', email);

        try {
            document.querySelectorAll('.error').forEach(element => {
                element.innerHTML = '';
            });

            const response = await fetch(`${host}/api/reset-password/set`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const res = await response.json();
            if (response.status === 200) {
                setSuccess(res.message);
                setProgress(3);
                return;
            }
            
            setError(res.message);

            if (res.errors) {
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GuestLayout>
            <main className="min-h-[93vh] bg-gray-100 flex items-center justify-center p-4'">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                    <Link to={'/login'}>
                        <img src="/back-icon.svg" alt="Get Back To Profile" className='h-8 w-8' />
                    </Link>

                    {progress === 0 && (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-8 text-black">Reset Your Password</h1>

                            <form className="space-y-6" onSubmit={handleEmailSubmit}>
                                <Input type={'email'} id={'email'} name={'email'} title={'Email adress'} src={'/email-icon.svg'} placeholder={'Your email'} />

                                <FormButton title='Check'></FormButton>
                            </form>
                        </>
                    )}
                    {progress === 1 && (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-8 text-black">Reset Your Password</h1>

                            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
                                <Input type={'text'} id={'verification'} name={'verification'} title={'Verification code'} src={'/lock-icon.svg'} placeholder={'Verification code'} />

                                <FormButton title='Check'></FormButton>
                            </form>
                        </>
                    )}

                    {progress === 2 && (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-8 text-black">Reset Your Password</h1>

                            <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                                <Input type={'password'} id={'password'} name={'password'} title={'New Password'} src={'/lock-icon.svg'} placeholder={'Type a new password'} />
                                <Input type={'password'} id={'password_confirmation'} name={'password_confirmation'} title={'Password confirmation'} src={'/lock-icon.svg'} placeholder={'Confirm your new password'} />

                                <FormButton title='Check'></FormButton>
                            </form>
                        </>
                    )}
                </div>
            </main>
        </GuestLayout>
    )
}

export default PasswordReset