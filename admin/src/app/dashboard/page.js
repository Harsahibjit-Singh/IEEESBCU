'use client';

import { useState } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeBanner from "@/app/components/WelcomeBanner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ExecutiveSearch from "@/app/components/dashboard-components/executives/ExecutiveSearch";
import ExecutiveCard from "@/app/components/dashboard-components/executives/ExecutiveCard";
import ExecutiveModal from "@/app/components/dashboard-components/executives/ExecutiveModal";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const [executives, setExecutives] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleModalClose = (shouldRefresh) => {
    setModalOpen(false);
    setSelectedId(null);
    if (shouldRefresh) {
      // Optionally re-fetch executives
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <Navbar />
      <div className="flex-1 p-6">
        <WelcomeBanner user={user} />
        <ExecutiveSearch onSearch={setExecutives} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.isArray(executives) ? (
            executives.map((executive) => (
              <ExecutiveCard
                key={executive.id}
                executive={executive}
                onClick={handleCardClick}
              />
            ))
          ) : (
            <p className="text-red-500">Unexpected API response. Please try again.</p>
          )}

        </div>
      </div>
      <ExecutiveModal id={selectedId} open={modalOpen} onClose={handleModalClose} />
      <Footer />
    </DashboardLayout>
  );
}



//write note for below on frontend
// we can multiple searching like cs, wie, 
// tell diff between current and former



// new executive 