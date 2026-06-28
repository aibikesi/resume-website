import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/profile';

const SECTION_IDS = ['#hero', '#about', '#skills', '#contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const sectionOffsets = useRef([]);
  const ticking = useRef(false);

  useEffect(() => {
    // Cache section positions once
    const updateOffsets = () => {
      sectionOffsets.current = SECTION_IDS.map(id => {
        const el = document.querySelector(id);
        return el ? el.offsetTop : 0;
      });
    };
    updateOffsets();
    window.addEventListener('resize', updateOffsets);

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const sy = window.scrollY;
        // Update scrolled state
        const shouldScroll = sy > 80;
        setScrolled(prev => prev !== shouldScroll ? shouldScroll : prev);

        // Update active section (iterate from bottom to top)
        let newActive = SECTION_IDS[0];
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          if (sy >= sectionOffsets.current[i] - 250) {
            newActive = SECTION_IDS[i];
            break;
          }
        }
        setActive(prev => prev !== newActive ? newActive : prev);

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffsets);
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <nav className={'navbar' + (scrolled ? ' navbar--scrolled' : '')}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo" onClick={(e) => handleClick(e, '#hero')}>
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-text">{profile.nameEn.split(' ')[0].toLowerCase()}</span>
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>
        <div className="navbar__links">
          {profile.navItems.map((item) => (
            <a key={item.href} href={item.href}
              className={'navbar__link' + (active === item.href ? ' navbar__link--active' : '')}
              onClick={(e) => handleClick(e, item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="navbar__cta" onClick={(e) => handleClick(e, '#contact')}>
          联系我
        </a>
      </div>
    </nav>
  );
}
