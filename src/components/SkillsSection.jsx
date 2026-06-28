import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  code: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  server: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  tool: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  layers: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
};

function SkillBar({ name, level }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" />
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <div className="skill-card__icon">{icons[skill.icon] || icons.code}</div>
        <h3 className="skill-card__title">{skill.category}</h3>
      </div>
      <div className="skill-card__bars">
        {skill.items.map((item, i) => (<SkillBar key={i} {...item} />))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const enBgRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });

      tl.fromTo(enBgRef.current,
        { opacity: 0, x: -80, skewX: 8, scaleX: 1.2 },
        { opacity: 0.03, x: 0, skewX: 0, scaleX: 1, duration: 1.4, ease: 'power4.out' }
      );
      tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.8');
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
        '-=0.4'
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards?.length) {
        tl.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // After cards appear, animate skill bars inside each card
      const allBars = cardsRef.current?.querySelectorAll('.skill-card');
      if (allBars?.length) {
        // For each card, animate its bars with a slight delay
        allBars.forEach((card) => {
          const fills = card.querySelectorAll('.skill-bar__fill');
          tl.to(fills, {
            width: (i, el) => el.parentElement.previousElementSibling.querySelector('.skill-bar__level')?.textContent || '0%',
            duration: 1.2, ease: 'power3.out', stagger: 0.05
          }, '-=0.6');
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="section__en-bg" ref={enBgRef}>SKILLS</div>
      <div className="section-header">
        <span className="section-tag" ref={tagRef}>个人优势</span>
        <h2 className="section-title" ref={titleRef}>技术能力</h2>
      </div>
      <div className="skills__grid" ref={cardsRef}>
        {profile.skills.map((skill, i) => (<SkillCard key={i} skill={skill} />))}
      </div>
    </section>
  );
}
