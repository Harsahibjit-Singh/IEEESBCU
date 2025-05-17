// components/HomeLayout.js
import React from "react";

export default function HomeLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      {children}
    </main>
  );
}
