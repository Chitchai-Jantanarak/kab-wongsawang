"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { label: "Central Park", dist: "4 min" },
  { label: "Hudson Yards", dist: "6 min" },
  { label: "MoMA", dist: "8 min" },
  { label: "JFK Airport", dist: "38 min" },
  { label: "Private Club", dist: "2 min" },
  { label: "Fine Dining", dist: "Walking" },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [leftRef.current, rightRef.current],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-light py-16 md:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Content */}
          <div ref={leftRef} className="order-2 lg:order-1">
            <div
              className="label mb-3"
              style={{ color: "var(--tone-accent)" }}
            >
              Location
            </div>
            <h2
              className="heading-xl mb-4"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                color: "#1a1510",
              }}
            >
              One KAB Plaza,
              <br />
              New York
            </h2>
            <div className="hairline mb-6" />
            <p
              className="mb-8 md:mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(26,21,16,0.55)",
              }}
            >
              Positioned at the intersection of culture, commerce, and calm —
              steps from Central Park and the city&apos;s finest institutions.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
              {highlights.map(({ label, dist }) => (
                <div
                  key={label}
                  className="border-t pt-3"
                  style={{ borderColor: "rgba(26,21,16,0.08)" }}
                >
                  <div
                    className="italic mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.9rem",
                      color: "rgba(26,21,16,0.4)",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    className="heading-lg"
                    style={{ fontSize: "1rem", color: "#1a1510" }}
                  >
                    {dist}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div
            ref={rightRef}
            className="order-1 lg:order-2 relative min-h-[320px] md:min-h-[400px] lg:min-h-[440px]"
            style={{ background: "#e8e4de" }}
          >
            <svg
              viewBox="0 0 400 440"
              className="absolute inset-0 w-full h-full"
            >
              <rect width="400" height="440" fill="#e8e4de" />

              {/* Buildings */}
              {[
                { x: 10, y: 10, w: 80, h: 120 },
                { x: 110, y: 10, w: 100, h: 60 },
                { x: 230, y: 10, w: 60, h: 80 },
                { x: 310, y: 10, w: 80, h: 120 },
                { x: 10, y: 150, w: 80, h: 80 },
                { x: 110, y: 90, w: 100, h: 80 },
                { x: 230, y: 110, w: 60, h: 60 },
                { x: 310, y: 150, w: 80, h: 80 },
                { x: 10, y: 250, w: 80, h: 100 },
                { x: 110, y: 190, w: 100, h: 80 },
                { x: 230, y: 190, w: 60, h: 80 },
                { x: 310, y: 250, w: 80, h: 100 },
                { x: 10, y: 370, w: 80, h: 60 },
                { x: 110, y: 290, w: 100, h: 60 },
                { x: 230, y: 290, w: 60, h: 60 },
                { x: 310, y: 370, w: 80, h: 60 },
                { x: 110, y: 370, w: 100, h: 60 },
                { x: 230, y: 370, w: 60, h: 60 },
              ].map((b, i) => (
                <rect
                  key={i}
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill="rgba(26,21,16,0.07)"
                  rx={0}
                />
              ))}

              {/* Park */}
              <rect
                x={10}
                y={10}
                width={80}
                height={360}
                fill="rgba(80,110,70,0.08)"
              />
              <text
                x={50}
                y={200}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 6,
                  fill: "rgba(80,110,70,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Central Park
              </text>

              {/* Location Marker */}
              <g transform="translate(200, 220)">
                <circle r={8} fill="rgba(184,154,96,0.9)" />
                <circle r={4} fill="white" />
              </g>

              <text
                x={210}
                y={222}
                dominantBaseline="middle"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 8,
                  fill: "rgba(26,21,16,0.6)",
                  fontStyle: "italic",
                }}
              >
                KAB Reserve
              </text>

              {/* Compass */}
              <g transform="translate(375, 30)">
                <line
                  x1="0"
                  y1="12"
                  x2="0"
                  y2="-12"
                  stroke="rgba(26,21,16,0.3)"
                  strokeWidth={0.8}
                />
                <line
                  x1="-12"
                  y1="0"
                  x2="12"
                  y2="0"
                  stroke="rgba(26,21,16,0.3)"
                  strokeWidth={0.8}
                />
                <text
                  x="0"
                  y="-15"
                  textAnchor="middle"
                  fill="rgba(26,21,16,0.35)"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 6 }}
                >
                  N
                </text>
              </g>
            </svg>

            {/* Location Label */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{
                background: "rgba(26,21,16,0.06)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <div
                className="label"
                style={{ color: "rgba(26,21,16,0.4)" }}
              >
                One KAB Plaza, Midtown Manhattan
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
