// components/DashboardWelcome.js
import React from "react";

export default function DashboardWelcome({ user }) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-indigo-700 mb-4">
        {user && user.name
          ? `Hi, welcome ${user.name}`
          : "Hi Admin, welcome to IEEE CUSB Dashboard"}
      </h1>
    </section>
  );
}
