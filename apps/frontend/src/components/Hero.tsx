"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Narrow tall triangle for initial clip – works on any aspect ratio
const CLIP_INITIAL = "polygon(50% 20%, 50% 20%, 56% 80%, 44% 80%)";
const CLIP_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const FRAME_COUNT = 60;
const frames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/assets/frames/frame_${String(i).padStart(4, "0")}.webp`
);

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (!cancelled && loaded === frames.length) setImagesLoaded(true);
      };
      img.src = src;
      imgs.push(img);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    // Set initial hidden states
    gsap.set(videoWrapRef.current, { clipPath: CLIP_INITIAL, scale: 0.88 });
    gsap.set(kRef.current, { opacity: 0, x: 0 });
    gsap.set(bRef.current, { opacity: 0, x: 0 });
    gsap.set(aRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(taglineRef.current, { opacity: 0, y: 16 });
    gsap.set(scrollHintRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      // ── Entrance sequence ─────────────────────────────────────────────
      const enter = gsap.timeline({ defaults: { ease: "power3.out" } });
      enter
        .to(videoWrapRef.current, { scale: 1, duration: 1.6, ease: "power2.out" }, 0.1)
        .to(kRef.current, { x: 0, opacity: 1, duration: 1.1 }, 0.35)
        .to(aRef.current, { opacity: 1, scale: 1, duration: 1.2 }, 0.35)
        .to(bRef.current, { x: 0, opacity: 1, duration: 1.1 }, 0.35)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.05)
        .to(scrollHintRef.current, { opacity: 1, duration: 0.7 }, 1.35);

      // ── Scroll timeline ──────────────────────────────────────────────
      // IMPORTANT: use fromTo on EVERY property so scrub goes both ways (scroll up = revert)
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const frameIndex = Math.min(
              Math.round(self.progress * (FRAME_COUNT - 1)),
              FRAME_COUNT - 1
            );
            setCurrentFrame(frameIndex);
          },
        },
      });

      // Phase 0 → 0.35: letters exit, tagline + scroll-hint fade out, clip begins to open
      st.fromTo(kRef.current,
        { x: 0, opacity: 1 },
        { x: "-55vw", opacity: 0, ease: "power2.inOut" },
        "<"
      );
      st.fromTo(bRef.current,
        { x: 0, opacity: 1 },
        { x: "55vw", opacity: 0, ease: "power2.inOut" },
        "<"
      );
      st.fromTo(taglineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -10, ease: "power2.inOut" },
        "<"
      );
      st.fromTo(scrollHintRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "power1.inOut" },
        "<+=0.02"
      );

      // Phase 0.05 → 0.65: clip-path expands + scale settles
      st.fromTo(videoWrapRef.current,
        { clipPath: CLIP_INITIAL, scale: 1 },
        { clipPath: CLIP_FULL, scale: 1, ease: "power2.inOut" },
        "<+=0.05"
      );

      // Phase 0.12 → 0.45: center letter A fades
      st.fromTo(aRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.08, ease: "power2.inOut" },
        "<+=0.07"
      );

      // Phase 0.55 → 1.0: CTA appears
      st.fromTo(ctaRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.55
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  const letterStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
    fontWeight: 300,
    fontSize: "clamp(72px, 16vw, 220px)",
    lineHeight: 0.88,
    letterSpacing: "-0.03em",
    userSelect: "none",
    display: "block",
    willChange: "transform, opacity",
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: "420vh", background: "var(--tone-bg)" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100dvh", background: "var(--tone-bg)" }}
      >
        {/* Frame sequence — full bleed */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0"
          style={{
            zIndex: 2,
            willChange: "clip-path, transform",
            transformOrigin: "center center",
          }}
        >
          {/* Fallback background color while frames load */}
          <div className="absolute inset-0" style={{ background: "#110f0c" }} />

          {imagesLoaded && (
            <img
              key={currentFrame}
              src={frames[currentFrame]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          )}

          {/* Gradient overlay for text legibility */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,9,7,0.18) 0%, transparent 30%, rgba(10,9,7,0.55) 100%)",
            }}
          />
        </div>

        {/* KAB Letters — centred, always in flow */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 4, pointerEvents: "none" }}
        >
          <span
            ref={kRef}
            style={{
              ...letterStyle,
              color: "transparent",
              WebkitTextStroke: "1px rgba(236,232,225,0.22)",
              marginRight: "clamp(4px, 1vw, 20px)",
            }}
          >
            K
          </span>
          <span
            ref={aRef}
            style={{
              ...letterStyle,
              color: "transparent",
              WebkitTextStroke: "1px rgba(236,232,225,0.55)",
            }}
          >
            A
          </span>
          <span
            ref={bRef}
            style={{
              ...letterStyle,
              color: "transparent",
              WebkitTextStroke: "1px rgba(236,232,225,0.22)",
              marginLeft: "clamp(4px, 1vw, 20px)",
            }}
          >
            B
          </span>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="absolute left-1/2 text-center"
          style={{
            bottom: "clamp(18%, 22%, 26%)",
            transform: "translateX(-50%)",
            zIndex: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <p
            className="label"
            style={{ color: "rgba(236,232,225,0.32)", letterSpacing: "0.28em" }}
          >
            KAB Reserve&nbsp;&nbsp;·&nbsp;&nbsp;Private Residences
          </p>
        </div>

        {/* CTA — appears after full reveal */}
        <div
          ref={ctaRef}
          className="absolute left-0 right-0 flex flex-col items-center text-center px-6"
          style={{
            bottom: "clamp(8%, 11%, 14%)",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          <p
            className="heading-xl mb-4"
            style={{
              fontSize: "clamp(1.3rem, 2.4vw, 2rem)",
              color: "var(--tone-warm)",
            }}
          >
            Enter the Residence
          </p>
          <div className="hairline mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none">
            <button
              className="btn"
              onClick={() =>
                document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Rooms
            </button>
            <Link href="/reserve" className="btn" style={{ textDecoration: "none" }}>
              Reserve a Visit
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute left-1/2 flex flex-col items-center gap-2"
          style={{
            bottom: "clamp(3%, 4.5%, 6%)",
            transform: "translateX(-50%)",
            zIndex: 8,
            pointerEvents: "none",
          }}
        >
          <span className="label" style={{ color: "rgba(236,232,225,0.18)" }}>
            scroll
          </span>
          <div className="scroll-bounce" style={{ color: "rgba(236,232,225,0.16)" }}>
            <svg width="1" height="26" viewBox="0 0 1 26" aria-hidden="true">
              <line x1="0.5" y1="0" x2="0.5" y2="26" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
