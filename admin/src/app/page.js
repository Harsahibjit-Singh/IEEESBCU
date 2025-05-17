'use client'
import AnimatedHero from '@/app/components/AnimatedHero'
import AboutSection from '@/app/components/AboutSection'
import LoginButton from '@/app/components/LoginButton'
import HomeLayout from '@/app/components/HomeLayout'

export default function HomePage() {
  return (
    <HomeLayout>
      <AnimatedHero>
        <LoginButton />
      </AnimatedHero>
      <AboutSection />
    </HomeLayout>
  )
}
