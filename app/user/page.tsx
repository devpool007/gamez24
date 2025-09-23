// app/user/page.tsx
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useClaimStore } from "@/store/useClaimStore";
import Image from "next/image";
import Link from "next/link";

export default function UserPage() {
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const { user: userDetails } = useClaimStore();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-1/2 flex-col items-center gap-4 text-center">
          <p className="mb-8 text-2xl font-bold font-gaming">
            Please log in or sign up to create a new user account to access this
            page.
          </p>
          <div className="flex w-full gap-4">
            <Link
              href={"auth/signup"}
              type="button"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white font-gaming font-semibold"
            >
              Sign Up
            </Link>
            <Link
              href={"auth/login"}
              type="button"
              className="w-full rounded bg-green-600 px-4 py-2 text-white font-gaming font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-4 py-8">
      {/* Header */}
      <div className="relative w-full max-w-md">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute right-0 top-0 rounded-lg bg-accent px-3 py-1 text-sm cursor-pointer"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            src={"/epic_games.png"}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-300 object-cover"
          />
          {isEditing && (
            <button
              onClick={() => alert("Open profile picture modal")}
              className="absolute bottom-0 right-0 rounded-full bg-blue-500 px-2 py-1 text-xs text-white shadow hover:bg-blue-600"
            >
              Change
            </button>
          )}
        </div>
        <h1 className="text-2xl font-semibold">{user.email || "Anonymous"}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Stats Table */}
      <div className="mt-8 w-full max-w-md overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow">
          <thead className="bg-accent">
            <tr>
              <th className="px-4 py-2 text-left">Platform</th>
              <th className="px-4 py-2 text-right">Games Claimed</th>
              <th className="px-4 py-2 text-right">Money Saved (€)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { platform: "Steam", games: userDetails?.stats.steamGames, saved: userDetails?.stats.totalSaved },
              { platform: "Epic", games: userDetails?.stats.epicGames, saved: userDetails?.stats.totalSaved },
              { platform: "GOG", games: userDetails?.stats.gogGames, saved: userDetails?.stats.totalSaved },
            ].map((stat) => (
              <tr key={stat.platform} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{stat.platform}</td>
                <td className="px-4 py-2 text-right">{stat.games}</td>
                <td className="px-4 py-2 text-right">€{stat.saved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Button */}
      <div className="mt-12 w-full max-w-md">
        <button
          onClick={async () => {
            await logout();
          }}
          className="w-full rounded-lg bg-red-500 py-2 text-white shadow hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
