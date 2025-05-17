'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DashboardWelcome from '../../components/DashboardWelcome'
import DashboardLayout from '../../components/DashboardLayout'

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <DashboardLayout>
      <Navbar />
      <DashboardWelcome user={user} />
      {/* Add dashboard content here */}
      <Footer />
    </DashboardLayout>
  )
}
