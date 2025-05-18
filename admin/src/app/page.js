'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedHeroSection from "@/app/components/AnimatedHeroSection";
import AuthButton from "@/app/components/AuthButton";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ParticleBackground from "@/app/components/ParticleBackground";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error.message}</div>;
  if (user) return null; // Redirect will handle this

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <AnimatedHeroSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            IEEE CUSB Admin Portal
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Manage your student branch with powerful tools
          </p>
          <AuthButton />
        </motion.div>
      </AnimatedHeroSection>
    </div>
  );
}