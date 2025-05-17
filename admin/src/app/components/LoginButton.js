// components/LoginButton.js
import React from "react";

export default function LoginButton() {
  return (
    <button
      className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
      onClick={() => (window.location.href = "/api/auth/login")}
    >
      Login
    </button>
  );
}
