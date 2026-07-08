import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// Lazy-load below-fold sections — they don't need to block initial render
const AboutSection = lazy(() => import("./components/AboutSection"));
const SkillsSection = lazy(() => import("./components/SkillsSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
// Lightfall is the heaviest component (WebGL shader) — defer it
const Lightfall = lazy(() => import("./components/Lightfall"));

gsap.registerPlugin(ScrollTrigger);

// Lightweight placeholder while sections load
function SectionFallback() {
  return <div style={{ minHeight: '60vh' }} />;
}

function App() {
  const bgRef = useRef(null);
  const [bgPaused, setBgPaused] = useState(false);
  const [showLightfall, setShowLightfall] = useState(false);

  // Defer Lightfall until 800ms after mount — hero animation runs first
  useEffect(() => {
    const id = setTimeout(() => setShowLightfall(true), 800);
    return () => clearTimeout(id);
  }, []);

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
        {showLightfall && (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
