import Input from "../../components/Input"
import OAuth from "../../components/OAuth"
import FormButton from "../../components/form-button"
import AuthSwitcher from '../../components/auth-switcher';

const SignUp = () => {
  return (
    <main>
      <AuthSwitcher initialAuthType="signup" />

      <OAuth></OAuth>

      <section className="w-full flex flex-col justify-center items-center py-12 gap-2">
        <div className="w-full relative">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="absolute right-[50%] translate-x-[50%] translate-y-[-50%] bg-white px-4">
            <h2>Or Continue With</h2>
          </div>
        </div>
        <form className="w-[30%] flex flex-col justify-center items-center gap-6 mt-6">
          <Input title="Username" id="name" name="name" type="text" placeholder="Choose a username" src="/user-icon.svg" />

          <Input title="Email Address" id="email" name="email" type="text" placeholder="Enter your email" src="/email-icon.svg" />

          <Input title="Password" id="password" name="password" type="password" placeholder="Create a password" src="/lock-icon.svg" />

          <Input title="Confirm Password" id="confirm-password" name="confirm-password" type="password" placeholder="Confirm your password" src="/lock-icon.svg" />

          <FormButton title={"Create Account"}></FormButton>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
