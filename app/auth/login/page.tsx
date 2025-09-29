"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useClaimStore } from "@/store/useClaimStore";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, isLoggedIn } = useAuthStore();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiRequest("/users/login", "POST", {
        email,
        password,
      });
      // alert("Login successful!");
      // TODO: store JWT in cookies - Done!

      const data = await apiRequest("/users/me");
      console.log("USERS DATA", data);
      const userData = data as { id: string; username: string; email: string };
      useClaimStore.getState().initializeUserStats();
      useClaimStore.getState().loadClaimedGames();
      setUser(userData, "Login Succesful!");
      // redirect to deals after successful login
      router.push("/deals");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError("Invalid credentials for login");
      } else {
        setError("Invalid credentials for login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 rounded-lg shadow-md w-full max-w-sm "
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
