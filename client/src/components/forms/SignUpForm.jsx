import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import InputForm from "./InputForm";

const SignUpForm = () => {
  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // function that runs when the form is submitted
  const handleSignUp = async (e) => {
    e.preventDefault();
    const credentials = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    console.log(
      `fetch to the backend to make the login using these credentials: ${Object.values(credentials)}`,
    );
  };

  return (
    <form className="space-y-6" onSubmit={handleSignUp}>
      <h2 className="text-xl text-center font-medium text-gray-900">Sign Up</h2>
      <InputForm
        name="firstName"
        type="text"
        label="First Name"
        value={firstName}
        setState={setFirstName}
        required={true}
      />
      <InputForm
        name="lastName"
        type="text"
        label="Last Name"
        value={lastName}
        setState={setLastName}
        required={true}
      />
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
      <InputForm
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        setState={setConfirmPassword}
        required={true}
      />
      <button
        type="submit"
        className="px-4 py-2 w-full border flex justify-center items-center bg-primary text-white gap-2 rounded-lg hover:bg-white hover:text-primary hover:border-primary hover:shadow transition duration-150"
      >
        Sign Up
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
        <span>Sign up with Google</span>
      </a>
      <div className="text-sm font-medium text-gray-500 ">
        Already have an account?{" "}
        <Link to="/" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
