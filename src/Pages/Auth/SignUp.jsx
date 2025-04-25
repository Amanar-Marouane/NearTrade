import Input from "../../components/Input";
import OAuth from "../../components/OAuth";
import FormButton from "../../components/FormButton";
import AuthSwitcher from '../../components/AuthSwitcher';
import GuestLayout from "../../layouts/GuestLayout";
import { Context } from "../../context/UserContext";
import { useContext } from "react";

const SignUp = () => {
  const host = import.meta.env.VITE_HOST;
  const { setIsAuthenticated, setUser, setUserId } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${host}/api/signup`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          // "Content-Type": "application/json",
        },
        credentials: 'include',
        body: formData,
      });

      if (response.status === 201 || response.status === 403) {
        setIsAuthenticated(true);
        setUser(result.data);
        setUserId(result.data['id']);
      }

      const result = await response.json();

      if (result.errors) {
        const errors = Object.entries(result.errors).reduce((acc, [key, value]) => {
          acc[key] = value[0];
          return acc;
        }, {});

        document.querySelectorAll('.error').forEach(element => {
          element.innerHTML = '';
        });

        Object.entries(errors).forEach(([key, message]) => {
          const errorSpan = document.querySelector(`.${key}-error`);
          if (errorSpan) {
            errorSpan.innerHTML = message;
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <GuestLayout>
      < main >
        <AuthSwitcher initialAuthType="signup" />

        <OAuth></OAuth>

        <section className="w-full flex flex-col justify-center items-center py-6 sm:py-8 md:py-12 gap-2">
          <div className="w-full relative">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="absolute right-[50%] translate-x-[50%] translate-y-[-50%] bg-white px-4">
              <h2 className="text-sm sm:text-base">Or Continue With</h2>
            </div>
          </div>
          <form className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] flex flex-col justify-center items-center gap-4 sm:gap-6 mt-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <Input title="Username" id="name" name="name" type="text" placeholder="Choose a username" src="/user-icon.svg" />

            <Input title="Email Address" id="email" name="email" type="text" placeholder="Enter your email" src="/email-icon.svg" />

            <Input title="Description" id="description" name="description" type="text" placeholder="Enter your description" src="/description-icon.svg" />

            <Input title="Profile" id="profile" name="profile" type="file" placeholder="Insert your profile image" src="/profile-icon.svg" />

            <Input title="Password" id="password" name="password" type="password" placeholder="Create a password" src="/lock-icon.svg" />

            <Input title="Confirm Password" id="password_confirmation" name="password_confirmation" type="password" placeholder="Confirm your password" src="/lock-icon.svg" />

            <FormButton title={"Create Account"}></FormButton>
          </form>
        </section>
      </main >
    </GuestLayout>
  );
};

export default SignUp;
