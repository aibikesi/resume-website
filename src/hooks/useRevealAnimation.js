import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(ref, options = {}) {
  const {
    from = {},
    to = {},
    trigger = null,
    start = 'top 85%',
    end = 'top 30%',
    scrub = false,
    markers = false,
    toggleActions = 'play none none none'
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, 
        { opacity: 0, y: 60, ...from },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: trigger || el,
            start,
            end,
            scrub,
            markers,
            toggleActions,
          },
          ...to
        }
      );
    }, el);
    return () => ctx.revert();
  }, [ref, trigger, start, end, scrub, markers, JSON.stringify(from), JSON.stringify(to)]);
}

export function useStaggerReveal(containerRef, itemsSelector, options = {}) {
  const {
    fromVars = { opacity: 0, y: 40 },
    staggerAmount = 0.12,
    start = 'top 85%',
    ease = 'power4.out',
    markers = false,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll(itemsSelector);
    if (!items.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(items, 
        fromVars,
        {
          opacity: 1, y: 0,
          duration: 1.2,
          stagger: staggerAmount,
          ease,
          scrollTrigger: {
            trigger: container,
            start,
            markers,
            toggleActions: 'play none none none',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, [containerRef, itemsSelector, staggerAmount, start, ease, markers, JSON.stringify(fromVars)]);
}

export function useParallax(ref, { strength = 0.15, start = 'top bottom', end = 'bottom top' } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 0 },
        {
          y: () => -strength * el.offsetHeight * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [ref, strength, start, end]);
}

export function useSectionTitle(containerRef, titleSelector, enTitleSelector, options = {}) {
  const { staggerDelay = 0.15, start = 'top 80%' } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const ctx = gsap.context(() => {
      const enTitle = container.querySelector(enTitleSelector);
      const cnTitle = container.querySelector(titleSelector);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
        }
      });

      if (enTitle) {
        tl.fromTo(enTitle,
          { opacity: 0, x: -80, skewX: 5, scale: 0.95 },
          { opacity: 1, x: 0, skewX: 0, scale: 1, duration: 1.2, ease: 'power4.out' }
        );
      }
      if (cnTitle) {
        tl.fromTo(cnTitle,
          { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
          staggerDelay > 0 ? `-=${0.4}` : '-=0.4'
        );
      }
    }, container);
    return () => ctx.revert();
  }, [containerRef, titleSelector, enTitleSelector, staggerDelay, start]);
}
