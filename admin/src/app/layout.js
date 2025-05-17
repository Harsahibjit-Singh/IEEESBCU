import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {UserProvider} from "@auth0/nextjs-auth0/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IEEE CUSB",
  description: "Admin panel for IEEE CUSB",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </UserProvider>
  );
}
