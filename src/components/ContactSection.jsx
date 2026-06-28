import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const enBgRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const footerRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subj = subject ? encodeURIComponent(subject) : encodeURIComponent('来自个人网站的留言');
    const bodyParts = [];
    if (name) bodyParts.push('姓名: ' + name);
    if (email) bodyParts.push('邮箱: ' + email);
    if (bodyParts.length) bodyParts.push('');
    if (message) bodyParts.push(message);
    const body = encodeURIComponent(bodyParts.join('\n'));
    window.location.href = 'mailto:' + profile.contact.email + '?subject=' + subj + '&body=' + body;
  };

  const copyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });
      tl.fromTo(enBgRef.current, { opacity: 0, x: -80, skewX: 8, scaleX: 1.2 }, { opacity: 0.04, x: 0, skewX: 0, scaleX: 1, duration: 1.4, ease: 'power4.out' });
      tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.8');
      tl.fromTo(titleRef.current, { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, '-=0.4');
      tl.fromTo(infoRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }, '-=0.3');
      tl.fromTo(formRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }, '-=0.7');
      tl.fromTo(formRef.current?.querySelectorAll('.contact__input, .contact__textarea, .contact__submit'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=0.4');
      tl.fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.1');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__bg" />
      <div className="section__en-bg" ref={enBgRef}>CONTACT</div>
      <div className="contact__content">
        <div className="section-header">
          <span className="section-tag" ref={tagRef}>联系我</span>
          <h2 className="section-title" ref={titleRef}>保持联系</h2>
        </div>
        <div className="contact__body">
          <div className="contact__info" ref={infoRef}>
            <div className="contact__name">{profile.name}</div>
            <div className="contact__title">{profile.subtitle}</div>
            <div className="contact__links">
              <a href={"mailto:" + profile.contact.email} className="contact__link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>{profile.contact.email}</span>
              </a>
              <div className="contact__link" style={{cursor:"pointer"}} onClick={copyPhone} title="点击复制">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>{profile.contact.phone}</span>
              </div>
              <div className="contact__link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{profile.contact.location}</span>
              </div>
            </div>
          </div>
          <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
            <div className="contact__form-row">
              <input type="text" placeholder="您的姓名" className="contact__input" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="您的邮箱" className="contact__input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <input type="text" placeholder="主题" className="contact__input" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea placeholder="请输入您的消息..." className="contact__textarea" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="btn btn--primary contact__submit">
              发送消息
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
        <div className="contact__footer" ref={footerRef}>
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
      <div className={'toast' + (copiedPhone ? ' toast--visible' : '')}>已复制到剪贴板</div>
    </section>
  );
}
