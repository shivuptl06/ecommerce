import React from "react";

const Auth = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Login / Signup</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
