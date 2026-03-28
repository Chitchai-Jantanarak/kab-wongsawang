"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIP_TRIANGLE = "polygon(50% 22%, 50% 22%, 61% 76%, 39% 76%)";
const CLIP_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const FRAME_COUNT = 60;
const frames = Array.from({ length: FRAME_COUNT }, (_, i) => `/assets/frames/frame_${String(i).padStart(4, '0')}.webp`);

const letterStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  fontSize: "clamp(96px, 20vw, 260px)",
  lineHeight: 0.88,
  letterSpacing: "-0.03em",
  userSelect: "none" as const,
  display: "block",
};

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const kRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLImageElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = frames.map((src) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          img.src = src;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    gsap.set(videoWrapRef.current, { clipPath: CLIP_TRIANGLE });

    const ctx = gsap.context(() => {
      const enter = gsap.timeline({ defaults: { ease: "power3.out" } });
      enter
        .fromTo(kRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
        .fromTo(aRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.3)
        .fromTo(bRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
        .fromTo(taglineRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2);

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stickyRef.current,
          pinSpacing: false,
          onUpdate(self) {
            const frameIndex = Math.min(
              Math.round(self.progress * (FRAME_COUNT - 1)),
              FRAME_COUNT - 1
            );
            setCurrentFrame(frameIndex);
          },
        },
      });

      st.to(kRef.current, { x: "-55vw", opacity: 0, ease: "power2.inOut" }, 0);
      st.to(bRef.current, { x: "55vw", opacity: 0, ease: "power2.inOut" }, 0);
      st.to(taglineRef.current, { opacity: 0, ease: "power2.inOut" }, 0);
      st.to(scrollHintRef.current, { opacity: 0 }, 0.02);

      st.fromTo(
        videoWrapRef.current,
        { clipPath: CLIP_TRIANGLE },
        { clipPath: CLIP_FULL, ease: "power2.inOut" },
        0.08
      );

      st.to(aRef.current, { opacity: 0, ease: "power2.inOut" }, 0.15);

      st.fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.65);
    }, wrapRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <div ref={wrapRef} className="relative h-[380vh] bg-[var(--tone-bg)]">
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[var(--tone-bg)]"
      >
        <div
          ref={videoWrapRef}
          className="absolute inset-0 z-[2] will-change-[clip-path]"
        >
          {imagesLoaded && (
            <img
              ref={frameRef}
              src={frames[currentFrame]}
              alt="Walkthrough"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[rgba(10,9,7,0.15)] via-transparent to-[rgba(10,9,7,0.5)]" />
        </div>

        <div className="absolute inset-0 z-[4] flex items-center justify-center gap-[clamp(8px,1.8vw,32px)]">
          <span
            ref={kRef}
            style={{ ...letterStyle, color: "transparent", WebkitTextStroke: "1px rgba(236,232,225,0.3)", willChange: "transform" }}
          >
            K
          </span>

          <span
            ref={aRef}
            style={{ ...letterStyle, color: "transparent", WebkitTextStroke: "1px rgba(236,232,225,0.65)", willChange: "opacity", position: "relative" }}
          >
            A
          </span>

          <span
            ref={bRef}
            style={{ ...letterStyle, color: "transparent", WebkitTextStroke: "1px rgba(236,232,225,0.3)", willChange: "transform" }}
          >
            B
          </span>
        </div>

        <div
          ref={taglineRef}
          className="absolute bottom-[22%] left-1/2 -translate-x-1/2 text-center z-[6] whitespace-nowrap"
        >
          <p className="label text-[rgba(236,232,225,0.3)]">
            KAB Reserve &nbsp;·&nbsp; Private Residences
          </p>
        </div>

        <div
          ref={ctaRef}
          className="absolute bottom-[11%] left-1/2 -translate-x-1/2 text-center z-[10] opacity-0 whitespace-nowrap"
        >
          <p className="heading-xl text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--tone-warm)] mb-4">
            Enter the Residence
          </p>
          <div className="hairline mx-auto mb-5" />
          <div className="flex justify-center gap-4">
            <button
              className="btn"
              onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Rooms
            </button>
            <Link href="/reserve" className="btn no-underline">
              Reserve a Visit
            </Link>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-[8]"
        >
          <span className="label text-[rgba(236,232,225,0.2)]">scroll</span>
          <div className="scroll-bounce text-[rgba(236,232,225,0.18)]">
            <svg width="1" height="24" viewBox="0 0 1 24">
              <line x1="0.5" y1="0" x2="0.5" y2="24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
