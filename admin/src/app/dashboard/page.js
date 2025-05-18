'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeBanner from "@/app/components/WelcomeBanner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <Navbar />
      <div className="flex-1 p-6">
        <WelcomeBanner user={user} />
        {/* Dashboard content will go here */}
      </div>
      <Footer />
    </DashboardLayout>
  );
}