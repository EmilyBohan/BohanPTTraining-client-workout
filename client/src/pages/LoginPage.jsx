import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import InputForm from "./InputForm";

const serverURL = import.meta.env.VITE_APP_API_URL

const LoginForm = () => {
  
  // form inputs states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function that runs when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };

    console.log(
      `fetch to the backend to make the login using these credentials: ${Object.values(credentials)}`,
    );

    const response = await fetch(`${serverURL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log(data)
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <h2 className="text-xl text-center font-medium text-gray-900">Sign In</h2>
      <InputForm
        name="email"
        type="email"
        label="Email"
        value={email}
        setState={setEmail}
        required={true}
      />
      <InputForm
        name="password"
        type="password"
        label="Password"
        value={password}
        setState={setPassword}
        required={true}
      />
      <button
        type="submit"
        className="px-4 py-2 w-full border flex justify-center items-center bg-primary text-white gap-2 rounded-lg hover:bg-white hover:text-primary hover:border-primary hover:shadow transition duration-150"
      >
        Login
      </button>
      <div className="relative">
        <span className="block w-full h-px bg-gray-300"></span>
        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
          Or continue with
        </p>
      </div>
      <a
        className="px-4 py-2 border flex justify-center items-center bg-white text-primary gap-2 rounded-lg border-primary hover:shadow transition duration-150"
        href="serverurl/profile"
      >
        <FcGoogle size={20} />
        <span>Login with Google</span>
      </a>
      <div className="text-sm font-medium text-gray-500 ">
        Not registered?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Create account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
