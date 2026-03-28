'use client'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CLIP_TRIANGLE = "polygon(50% 22%, 50% 22%, 61% 76%, 39% 76%)";
const CLIP_FULL     = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export default function Hero() {
  const wrapRef        = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const kRef           = useRef<HTMLSpanElement>(null);
  const aRef           = useRef<HTMLSpanElement>(null);
  const bRef           = useRef<HTMLSpanElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const videoWrapRef   = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const taglineRef     = useRef<HTMLDivElement>(null);
  const scrollHintRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialise the clip before the first paint so there is no flash
    gsap.set(videoWrapRef.current, { clipPath: CLIP_TRIANGLE });

    const ctx = gsap.context(() => {
      /* ── ENTRANCE ────────────────────────────────── */
      const enter = gsap.timeline({ defaults: { ease: "power3.out" } });
      enter
        .fromTo(kRef.current,          { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
        .fromTo(aRef.current,          { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.3)
        .fromTo(bRef.current,          { x: 60,  opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
        .fromTo(taglineRef.current,    { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo(scrollHintRef.current, { opacity: 0 },         { opacity: 1, duration: 0.6 },      1.2);

      /* ── SCROLL TRIGGER ──────────────────────────── */
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: false,
          onUpdate(self) {
            const v = videoRef.current;
            if (v && v.readyState >= 2 && v.duration) {
              v.currentTime = self.progress * v.duration * 0.001;
            }
          },
        },
      });

      /* Phase 1: K and B pan away (0 → 0.35) */
      st.to(kRef.current,          { x: "-55vw", opacity: 0, ease: "power2.inOut" }, 0);
      st.to(bRef.current,          { x:  "55vw", opacity: 0, ease: "power2.inOut" }, 0);
      st.to(taglineRef.current,    { opacity: 0, ease: "power2.inOut" }, 0);
      st.to(scrollHintRef.current, { opacity: 0 }, 0.02);

      /* Phase 2: Triangle clip expands to full screen (0.1 → 0.60) */
      st.fromTo(
        videoWrapRef.current,
        { clipPath: CLIP_TRIANGLE },
        { clipPath: CLIP_FULL, ease: "power2.inOut" },
        0.08
      );

      /* Phase 3: A letter fades as video fills (0.18 → 0.50) */
      st.to(aRef.current, { opacity: 0, ease: "power2.inOut" }, 0.15);

      /* Phase 4: CTA appears (0.65 → 1.0) */
      st.fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.65);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const letterStyle: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: "clamp(96px, 20vw, 260px)",
    lineHeight: 0.88,
    letterSpacing: "-0.03em",
    userSelect: "none",
    display: "block",
  };

  return (
    <div
      ref={wrapRef}
      style={{ height: "380vh", background: "var(--tone-bg)", position: "relative" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ background: "var(--tone-bg)" }}
      >
        {/* ── Video layer — clipped to A triangle initially ── */}
        <div
          ref={videoWrapRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            willChange: "clip-path",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/walkthrough.mp4"
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Vignette over video */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(10,9,7,0.15) 0%, transparent 40%, rgba(10,9,7,0.5) 100%)",
          }} />
        </div>

        {/* ── KAB text layer ── */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(8px, 1.8vw, 32px)",
          }}
        >
          {/* K */}
          <span ref={kRef} style={{ ...letterStyle, color: "transparent",
            WebkitTextStroke: "1px rgba(236,232,225,0.3)", willChange: "transform" }}>
            K
          </span>

          {/* A — the triangular door */}
          <span ref={aRef} style={{ ...letterStyle, color: "transparent",
            WebkitTextStroke: "1px rgba(236,232,225,0.65)", willChange: "opacity",
            position: "relative" }}>
            A
          </span>

          {/* B */}
          <span ref={bRef} style={{ ...letterStyle, color: "transparent",
            WebkitTextStroke: "1px rgba(236,232,225,0.3)", willChange: "transform" }}>
            B
          </span>
        </div>

        {/* ── Tagline ── */}
        <div ref={taglineRef} style={{
          position: "absolute", bottom: "22%", left: "50%",
          transform: "translateX(-50%)", textAlign: "center", zIndex: 6, whiteSpace: "nowrap",
        }}>
          <p className="label" style={{ color: "rgba(236,232,225,0.3)" }}>
            KAB Reserve &nbsp;·&nbsp; Private Residences
          </p>
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} style={{
          position: "absolute", bottom: "11%", left: "50%",
          transform: "translateX(-50%)", textAlign: "center",
          zIndex: 10, opacity: 0, whiteSpace: "nowrap",
        }}>
          <p className="heading-xl" style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: "var(--tone-warm)", marginBottom: "1rem",
          }}>
            Enter the Residence
          </p>
          <div className="hairline" style={{ margin: "0 auto 1.4rem" }} />
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button className="btn"
              onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Rooms
            </button>
            <Link href="/reserve" className="btn"
              style={{ textDecoration: "none" }}>
              Reserve a Visit
            </Link>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div ref={scrollHintRef} style={{
          position: "absolute", bottom: "6%", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: 6, zIndex: 8,
        }}>
          <span className="label" style={{ color: "rgba(236,232,225,0.2)" }}>scroll</span>
          <div className="scroll-bounce" style={{ color: "rgba(236,232,225,0.18)" }}>
            <svg width="1" height="24" viewBox="0 0 1 24">
              <line x1="0.5" y1="0" x2="0.5" y2="24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
