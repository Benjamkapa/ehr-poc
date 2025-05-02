import React from "react";
import { CgLogIn } from "react-icons/cg";
import { HiOutlineLogin } from "react-icons/hi";
import { LuLogIn } from "react-icons/lu";
import { SlLogin } from "react-icons/sl";

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-semibold">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full border rounded px-3 py-2"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const Login = ({ email, password, setEmail, setPassword, handleSubmit, error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 text-center font-thin">EHR SYSTEM</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="justify-center mx-auto block w-2/3 bg-primary text-white py-2 rounded-full hover:bg-blue-800 transition duration-100"
        >
          Login 
          <HiOutlineLogin className="inline-block ml-2" />
        </button>
      </form>
    </div>
  );
};

export default Login;
