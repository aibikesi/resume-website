import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card__period">{project.period}</div>
      <h4 className="project-card__title">{project.title}</h4>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tech">
        {project.tech.map((t, i) => (<span key={i} className="project-card__tech-tag">{t}</span>))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1500);
  };
  const sectionRef = useRef(null);
  const enBgRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const avatarRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const eduRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });

      // English background title
      tl.fromTo(enBgRef.current,
        { opacity: 0, x: -80, skewX: 8, scaleX: 1.2 },
        { opacity: 0.03, x: 0, skewX: 0, scaleX: 1, duration: 1.4, ease: 'power4.out' }
      );

      // Tag + Title + Desc
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.8'
      );
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      );

      // Avatar parallax
      tl.fromTo(avatarRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

      // Bio
      tl.fromTo(bioRef.current?.querySelectorAll('p'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      );

      // Stats stagger
      tl.fromTo(statsRef.current?.querySelectorAll('.stat-card'),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );

      // Education
      tl.fromTo(eduRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.2'
      );

      // Projects stagger
      tl.fromTo(projectsRef.current?.querySelectorAll('.project-card'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="section__en-bg" ref={enBgRef}>ABOUT</div>
      <div className="section-header">
        <span className="section-tag" ref={tagRef}>关于我</span>
        <h2 className="section-title" ref={titleRef}>个人简介</h2>
        <p className="section-desc" ref={descRef}>了解我的经历与学习方向</p>
      </div>
      <div className="about__grid">
        <div className="about__left">
          <div className="about__avatar-wrapper" ref={avatarRef}>
            <img src={profile.avatar} alt={profile.name} className="about__avatar" />
            <div className="about__avatar-glow" />
          </div>
          <div className="about__contact">
            <div className="about__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>{profile.contact.email}</span>
            </div>
            <div className="about__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span style={{cursor:"pointer"}} onClick={handleCopyPhone} title="????">{profile.contact.phone}</span>
            </div>
            <div className="about__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{profile.contact.location}</span>
            </div>
          </div>
        </div>
        <div className="about__right">
          <div className="about__bio" ref={bioRef}>
            {profile.bio.map((p, i) => (<p key={i}>{p}</p>))}
          </div>
          <div className="about__stats" ref={statsRef}>
            {profile.stats.map((s, i) => (<StatCard key={i} {...s} />))}
          </div>
          <div className="about__education" ref={eduRef}>
            <h3 className="about__section-title">教育背景</h3>
            <div className="edu-card">
              <div className="edu-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div>
                <h4>{profile.education.school}</h4>
                <p>{profile.education.degree} · {profile.education.period}</p>
                <p className="edu-card__gpa">GPA: {profile.education.gpa}</p>
                <div className="edu-card__courses">
                  {profile.education.courses.map((c, i) => (<span key={i} className="edu-card__course-tag">{c}</span>))}
                </div>
              </div>
            </div>
          </div>
          <div className="about__projects" ref={projectsRef}>
            <h3 className="about__section-title">项目实践</h3>
            <div className="projects__grid">
              {profile.projects.map((proj, i) => (<ProjectCard key={i} project={proj} />))}
            </div>
          </div>
        </div>
      </div>
    <div className={'toast' + (copiedPhone ? ' toast--visible' : '')}>???????</div>
    </section>
  );
}


