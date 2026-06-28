import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile } from '../data/profile';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const greetingRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const taglineEnRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const glowRef = useRef(null);

  const titleLines = profile.heroTagline.split('\n');

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Opening overlay: panels slide apart
    tl.to(topPanelRef.current, { y: '-100%', duration: 1.3, ease: 'power4.inOut' }, 0);
    tl.to(bottomPanelRef.current, { y: '100%', duration: 1.3, ease: 'power4.inOut' }, 0);
    tl.to(glowRef.current, { opacity: 0, duration: 0.6 }, 0.5);

    // Greeting text fades + slides down
    tl.fromTo(greetingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.1'
    );

    // Badge
    tl.fromTo(badgeRef.current,
      { y: 25, opacity: 0, rotateX: -10 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8 },
      '-=0.3'
    );

    // Title lines with compression-settle effect
    const titleEls = titleRef.current?.querySelectorAll('.hero__title-line');
    if (titleEls) {
      titleEls.forEach((el, i) => {
        tl.fromTo(el,
          { scaleX: 0.82, scaleY: 0.88, y: 28, opacity: 0, transformOrigin: 'left center' },
          { scaleX: 1, scaleY: 1, y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
          i === 0 ? '-=0.3' : '-=0.5'
        );
        tl.to(el, { scaleX: 1.02, scaleY: 1.01, duration: 0.25, ease: 'power2.out' }, '-=0.6');
        tl.to(el, { scaleX: 1, scaleY: 1, duration: 0.45, ease: 'sine.out' }, '-=0.15');
      });
    }

    // Description
    tl.fromTo(descRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    );

    // English tagline
    tl.fromTo(taglineEnRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 0.4, duration: 0.6 },
      '-=0.3'
    );

    // Buttons stagger
    tl.fromTo(actionsRef.current?.querySelectorAll('.btn'),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
      '-=0.2'
    );

    // Scroll indicator
    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Opening overlay */}
      <div className="opening-overlay" ref={overlayRef}>
        <div className="opening-overlay__top" ref={topPanelRef} />
        <div className="opening-overlay__bottom" ref={bottomPanelRef} />
        <div className="opening-overlay__glow" ref={glowRef} />
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__greeting" ref={greetingRef}>{profile.heroGreeting}</div>
        <div className="hero__badge" ref={badgeRef}>{profile.title}</div>
        <div className="hero__title-wrapper" ref={titleRef}>
          <h1 className="hero__title">
            {titleLines.map((line, i) => (
              <span key={i} className="hero__title-line">{line}</span>
            ))}
          </h1>
        </div>
        <p className="hero__desc" ref={descRef}>{profile.heroDescription}</p>
        <div className="hero__tagline-en" ref={taglineEnRef}>{profile.heroTaglineEn}</div>

        <div className="hero__actions" ref={actionsRef}>
          <a href="#about" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            了解更多
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            联系我
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator" ref={scrollRef}>
        <span>向下滚动</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
