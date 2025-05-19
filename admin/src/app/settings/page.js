'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FieldEditor from '@/app/components/settings/FieldEditor';
import ImageUploader from '@/app/components/settings/ImageUploader';

export default function SettingsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Website Settings</h1>
        
        <FieldEditor fieldName="branch name" />
        <FieldEditor fieldName="branch short name" />
        <FieldEditor fieldName="rank in india council" />
        <FieldEditor fieldName="active members" />
        <FieldEditor fieldName="events organized" />
        <FieldEditor fieldName="branch age" />
        <FieldEditor fieldName="about above" />
        <FieldEditor fieldName="about mid short" />
        <FieldEditor fieldName="about below" />
        <FieldEditor fieldName="our mission" />
        <FieldEditor fieldName="our vision" />

        <ImageUploader fieldName="branch logo" />
        <ImageUploader fieldName="main carousel" />

      </main>
      <Footer />
    </div>
  );
}
