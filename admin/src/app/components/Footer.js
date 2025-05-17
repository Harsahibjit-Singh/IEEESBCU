// components/Footer.js
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-700 text-white py-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} IEEE Chandigarh University Student Branch. All rights reserved.
    </footer>
  );
}
