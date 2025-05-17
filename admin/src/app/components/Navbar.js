// components/Navbar.js
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-indigo-700 py-4 px-8 flex items-center justify-between shadow">
      <div className="text-white text-xl font-bold">IEEE CUSB Dashboard</div>
      <div>
        <a
          href="/api/auth/logout"
          className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 font-semibold transition"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
