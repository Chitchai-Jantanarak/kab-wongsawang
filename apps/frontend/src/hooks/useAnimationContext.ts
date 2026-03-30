'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | { amount: number; from: string };
}

export function useCountUp(endValue: number, duration: number = 2) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration,
      snap: { value: 1 },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(obj.value).toLocaleString();
        }
      },
    });
  }, [endValue, duration]);

  return ref;
}

export function useTextReveal(text: string) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    ref.current.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block" style="opacity: 0; transform: translateY(10px);">${char}</span>`)
      .join('');

    const chars = ref.current.querySelectorAll('span');
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
    });
  }, [text]);

  return ref;
}

export function useStaggerReveal(config: AnimationConfig = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    stagger = 0.1,
  } = config;

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
      }
    );
  }, [duration, delay, ease, stagger]);

  return ref;
}

export function useHoverScale(scale: number = 1.05) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [scale]);

  return ref;
}

export function useLazyReveal(threshold: number = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
