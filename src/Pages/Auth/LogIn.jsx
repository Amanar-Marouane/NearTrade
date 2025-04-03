import Input from "../../components/Input"
import OAuth from "../../components/OAuth"
import FormButton from "../../components/form-button"
import AuthSwitcher from '../../components/auth-switcher';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const jsonObject = Object.fromEntries(formData.entries());

    try {
      document.querySelectorAll('.error').forEach(element => {
        element.innerHTML = '';
      });
      
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(jsonObject),
      });

      if (response.status === 200 || response.status === 403) navigate('/profile');

      const result = await response.json();

      if (response.status === 401) {
        document.querySelector(`.password-error`).innerHTML = 'Credentials not matching, check your info';
      }

      if (result.errors) {
        const errors = Object.entries(result.errors).reduce((acc, [key, value]) => {
          acc[key] = value[0];
          return acc;
        }, {});

        Object.entries(errors).forEach(([key, message]) => {
          const errorSpan = document.querySelector(`.${key}-error`);
          if (errorSpan) {
            errorSpan.innerHTML = message;
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const IsLogged = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/islogged", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      const result = await response.json();
      if (result.data) navigate('/profile');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   IsLogged()
  // }, []);

  return (
    <main>

      <AuthSwitcher initialAuthType="login" />

      <OAuth></OAuth>

      <section className="w-full flex flex-col justify-center items-center py-12 gap-2">
        <div className="w-full relative">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="absolute right-[50%] translate-x-[50%] translate-y-[-50%] bg-white px-4">
            <h2>Or Continue With</h2>
          </div>
        </div>
        <form className="w-[30%] flex flex-col justify-center items-center gap-6 mt-6" onSubmit={handleSubmit}>
          <Input title="Email Address" id="email" name="email" type="text" placeholder="Enter your email" src="/email-icon.svg" />

          <Input title="Password" id="password" name="password" type="password" placeholder="Create a password" src="/lock-icon.svg" />

          <FormButton title={"Log In"}></FormButton>
        </form>
      </section>

    </main>
  );
};

export default LogIn;
