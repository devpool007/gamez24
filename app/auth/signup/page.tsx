"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useClaimStore } from "@/store/useClaimStore";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, isLoggedIn } = useAuthStore();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiRequest("/users/signup", "POST", {
        email,
        username,
        password,
      });
      const data = await apiRequest("/users/me");
      console.log("USERS DATA", data);
      const userData = data as { id: string; username:string; email: string };
      useClaimStore.getState().initializeUserStats();
      useClaimStore.getState().loadClaimedGames();
      setUser(userData, "Sign Up Succesful!");
      // alert("Signup successful you are now logged in!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError("An unexpected error occurred while signup");
      } else {
        setError("An unexpected error occurred while signup");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Trying to log u in...</p>
          </div>
        </div>
      )} */}
      <form
        onSubmit={handleSignup}
        className="p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Username"
          className="border p-2 w-full mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {isLoggedIn && (
          <p className="text-green-500 mb-2">Sign up and Login Successful!</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
