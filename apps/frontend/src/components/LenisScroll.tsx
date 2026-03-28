"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, 
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const scrollFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(scrollFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(scrollFn);
    };
  }, []);

  return null;
}