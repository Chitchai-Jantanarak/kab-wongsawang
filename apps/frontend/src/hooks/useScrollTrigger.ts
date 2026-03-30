'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  scrub?: boolean | number;
  pin?: boolean | string;
}

export function useScrollTrigger(
  callback: (trigger: ScrollTrigger) => void,
  options: ScrollTriggerOptions = {}
) {
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: options.trigger || triggerRef.current,
      start: options.start || 'top center',
      end: options.end || 'bottom center',
      markers: options.markers || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onUpdate: options.onUpdate,
      scrub: options.scrub,
      pin: options.pin,
    });

    callback(scrollTrigger);

    return () => {
      scrollTrigger.kill();
    };
  }, [callback, options]);

  return triggerRef;
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: (i, target) => {
        return gsap.getProperty(target, 'offsetHeight') as number * speed;
      },
      scrollTrigger: {
        trigger: ref.current,
        scrub: true,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

export function useRevealOnScroll(stagger: boolean = false) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-reveal]');
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: stagger ? 0.2 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stagger]);

  return ref;
}
