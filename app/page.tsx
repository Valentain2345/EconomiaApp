import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import Showcase from '@/components/sections/Showcase';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Experience from '@/components/sections/Experience';
import Rooms from '@/components/sections/Rooms';
import ChatPreview from '@/components/sections/ChatPreview';
import PlayerPreview from '@/components/sections/PlayerPreview';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
return (
    <div className="relative">
      <Navbar />
      <main className="relative">
        <Hero />
        <SocialProof />
        <Showcase />
        <Features />
        <HowItWorks />
        <Experience />
        <Rooms />
        <ChatPreview />
        <PlayerPreview />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
