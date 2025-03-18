"use client";

import { useAuth } from "@/pages/auth";
import { useState } from "react";

export default function Page() {
  const { user, login, logout } = useAuth(); // Access authentication context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    login("mock-token"); // Replace with actual API logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-teal-400" >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!user ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-200"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, <span className="text-teal-500">{user.email}</span>
            </h2>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}