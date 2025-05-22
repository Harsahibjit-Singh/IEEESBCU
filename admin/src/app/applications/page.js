'use client';

import { useEffect, useState } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FormBuilder from "./FormBuilder";
import FormCard from "./FormCard";

export default function ApplicationPage() {
  const { user, isLoading } = useUser();
  const [forms, setForms] = useState([]);

useEffect(() => {
  const fetchForms = async () => {
    const res = await fetch('/api/forms/allforms');
    const data = await res.json();

    // If the API returns { forms: [...] }
    setForms(data.forms ?? []); // fallback to [] if undefined
  };

  fetchForms();
}, []);


  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Volunteer Application Form Builder</h1>

        <FormBuilder user={user} onFormCreated={(form) => setForms(prev => [form, ...prev])} />

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Forms</h2>
          <div className="grid gap-4">
            {forms.map(form => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
