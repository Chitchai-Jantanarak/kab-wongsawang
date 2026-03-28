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
      gsap.fromTo([leftRef.current, rightRef.current], { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-light py-28">
      <div className="grid grid-cols-2 max-w-[1100px] mx-auto">
        <div ref={leftRef} className="pr-14 pl-10">
          <div className="label mb-4 text-[var(--tone-accent)]">Location</div>
          <h2 className="heading-xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#1a1510] mb-5">
            One KAB Plaza,<br />New York
          </h2>
          <div className="hairline mb-7" />
          <p className="font-serif font-light text-[1.05rem] leading-[1.75] text-[rgba(26,21,16,0.55)] mb-10">
            Positioned at the intersection of culture, commerce, and calm — steps from Central Park
            and the city's finest institutions.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {highlights.map(({ label, dist }) => (
              <div key={label} className="border-t border-[rgba(26,21,16,0.08)] pt-3">
                <div className="font-serif text-[0.95rem] text-[rgba(26,21,16,0.4)] mb-1 italic">
                  {label}
                </div>
                <div className="heading-lg text-[1.1rem] text-[#1a1510]">
                  {dist}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="relative bg-[#e8e4de] min-h-[440px]">
          <svg viewBox="0 0 400 440" className="absolute inset-0 w-full h-full">
            <rect width="400" height="440" fill="#e8e4de" />

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
              { x: 110, y: 370, w: 100, h: 60 },
              { x: 230, y: 370, w: 60, h: 60 },
              { x: 310, y: 370, w: 80, h: 60 },
              { x: 110, y: 370, w: 100, h: 60 },
              { x: 230, y: 370, w: 60, h: 60 },
            ].map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="rgba(26,21,16,0.07)" rx={0} />
            ))}

            <rect x={10} y={10} width={80} height={360} fill="rgba(80,110,70,0.08)" />
            <text
              x={50} y={200} textAnchor="middle" dominantBaseline="middle"
              className="font-[family-name:var(--app-font-sans)] text-[6px] fill-[rgba(80,110,70,0.5)] tracking-[0.1em] uppercase"
            >
              Central Park
            </text>

            <g transform="translate(200, 220)">
              <circle r={8} fill="rgba(184,154,96,0.9)" />
              <circle r={4} fill="white" />
            </g>

            <text
              x={210} y={222} dominantBaseline="middle"
              className="font-serif text-[8px] fill-[rgba(26,21,16,0.6)] italic"
            >
              KAB Reserve
            </text>

            <g transform="translate(375, 30)">
              <line x1="0" y1="12" x2="0" y2="-12" stroke="rgba(26,21,16,0.3)" strokeWidth={0.8} />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(26,21,16,0.3)" strokeWidth={0.8} />
              <text x="0" y="-15" textAnchor="middle" fill="rgba(26,21,16,0.35)" className="font-[family-name:var(--app-font-sans)] text-[6px]">N</text>
            </g>
          </svg>

          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(26,21,16,0.06)] p-5 backdrop-blur-[4px]">
            <div className="label text-[rgba(26,21,16,0.4)]">One KAB Plaza, Midtown Manhattan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
