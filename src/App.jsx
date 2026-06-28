import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Lightfall from "./components/Lightfall";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const bgRef = useRef(null);
  const [bgPaused, setBgPaused] = useState(false);

  // Pause Lightfall when tab is hidden to save GPU/CPU
  useEffect(() => {
    const handleVisibility = () => setBgPaused(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Scroll-driven background opacity – RAF throttled, no gsap.to() on every frame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
            bgRef.current.style.opacity = Math.max(0.2, Math.min(0.6, 0.6 - progress * 0.3));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="app__bg" ref={bgRef}>
        <Lightfall
          colors={['#FF2D55', '#FF6B6B', '#FF3344']}
          backgroundColor="#1A0A0E"
          speed={0.25}
          streakCount={2}
          streakWidth={0.8}
          streakLength={0.7}
          glow={0.5}
          density={0.35}
          twinkle={0.6}
          zoom={3.5}
          backgroundGlow={0.25}
          opacity={0.65}
          mouseInteraction={true}
          mouseStrength={0.3}
          mouseRadius={0.8}
          dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
          paused={bgPaused}
        />
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
