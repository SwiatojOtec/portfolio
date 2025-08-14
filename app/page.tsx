import AnimatedBackground from '../components/AnimatedBackground'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import AnimatedSkills from '../components/AnimatedSkills'
import CareerTimeline from '../components/CareerTimeline'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-500">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <AnimatedSkills />
      <CareerTimeline />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
} 