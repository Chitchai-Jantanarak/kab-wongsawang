"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: "living",
    label: "01 — Living",
    name: "The Living Room",
    desc: "Floor-to-ceiling glazing frames unobstructed city views. Natural stone floors, minimal furniture, and curated art define the space.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80&auto=format&fit=crop",
    detail: [
      "4.2m ceiling height",
      "Floor-to-ceiling glass",
      "Natural stone floors",
      "Automated blinds",
    ],
  },
  {
    id: "bedroom",
    label: "02 — Sleeping",
    name: "Primary Suite",
    desc: "A sanctuary of calm. Washed linen, integrated wardrobes, and a walk-in dressing room with natural light.",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1400&q=80&auto=format&fit=crop",
    detail: [
      "Walk-in wardrobe",
      "Integrated lighting",
      "Acoustic glass",
      "Private terrace access",
    ],
  },
  {
    id: "kitchen",
    label: "03 — Kitchen",
    name: "Culinary Space",
    desc: "Matte stone countertops, fully integrated appliances, and a hidden pantry — designed as much for performance as for appearance.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
    detail: [
      "Stone countertops",
      "Integrated appliances",
      "Hidden pantry",
      "Island seating",
    ],
  },
  {
    id: "bath",
    label: "04 — Bath",
    name: "Primary Bathroom",
    desc: "A spa-grade retreat. Freestanding bath, heated stone floors, and a rainfall shower encased in seamless plaster.",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=80&auto=format&fit=crop",
    detail: [
      "Heated stone floors",
      "Rainfall shower",
      "Freestanding bath",
      "Double vanity",
    ],
  },
];

export default function RoomShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    if (imgRef.current && infoRef.current) {
      gsap.fromTo(
        [imgRef.current, infoRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    }
  }, [active]);

  const r = rooms[active];

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="section-dark py-16 md:py-24 lg:py-28"
    >
      {/* Header */}
      <div className="px-5 md:px-10 lg:px-16 mb-10 md:mb-14">
        <div
          className="label label-accent mb-3"
          style={{ letterSpacing: "0.2em" }}
        >
          Interior
        </div>
        <h2
          className="heading-xl"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "var(--tone-text)",
          }}
        >
          Every Room, Considered
        </h2>
      </div>

      {/* Room Tabs - Scrollable on mobile */}
      <div
        className="flex overflow-x-auto no-scrollbar border-t border-b mb-10 md:mb-14"
        style={{ borderColor: "var(--tone-border)" }}
      >
        {rooms.map((rm, i) => (
          <button
            key={rm.id}
            onClick={() => setActive(i)}
            className="label whitespace-nowrap px-5 md:px-8 py-4 bg-transparent border-none cursor-pointer transition-colors duration-200"
            style={{
              color: i === active ? "var(--tone-accent)" : "rgba(236,232,225,0.3)",
              borderBottom:
                i === active
                  ? "1px solid var(--tone-accent)"
                  : "1px solid transparent",
            }}
          >
            {rm.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-stretch">
          {/* Image */}
          <div ref={imgRef} className="overflow-hidden aspect-video lg:aspect-auto lg:min-h-[400px]">
            <img
              src={r.img}
              alt={r.name}
              className="w-full h-full object-cover block"
              style={{ cursor: "grab" }}
              draggable={true}
            />
          </div>

          {/* Info Panel */}
          <div
            ref={infoRef}
            className="flex flex-col justify-center py-4 lg:py-0"
          >
            <div
              className="label mb-3"
              style={{ color: "rgba(236,232,225,0.3)" }}
            >
              {r.label}
            </div>
            <h3
              className="heading-xl mb-4"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                color: "var(--tone-text)",
              }}
            >
              {r.name}
            </h3>
            <div className="hairline mb-5" />
            <p className="body-copy mb-6 md:mb-8">{r.desc}</p>

            {/* Details List */}
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {r.detail.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    color: "rgba(236,232,225,0.55)",
                  }}
                >
                  <span
                    className="w-4 h-px flex-shrink-0"
                    style={{ background: "var(--tone-accent)" }}
                  />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/reserve"
                className="btn inline-block no-underline"
              >
                Reserve a Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-10 px-5">
        {rooms.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
            style={{
              background:
                i === active ? "var(--tone-accent)" : "rgba(236,232,225,0.2)",
              transform: i === active ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
