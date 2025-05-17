// components/DashboardLayout.js
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {children}
    </div>
  );
}
