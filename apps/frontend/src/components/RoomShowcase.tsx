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
    detail: ["4.2m ceiling height", "Floor-to-ceiling glass", "Natural stone floors", "Automated blinds"],
  },
  {
    id: "bedroom",
    label: "02 — Sleeping",
    name: "Primary Suite",
    desc: "A sanctuary of calm. Washed linen, integrated wardrobes, and a walk-in dressing room with natural light.",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1400&q=80&auto=format&fit=crop",
    detail: ["Walk-in wardrobe", "Integrated lighting", "Acoustic glass", "Private terrace access"],
  },
  {
    id: "kitchen",
    label: "03 — Kitchen",
    name: "Culinary Space",
    desc: "Matte stone countertops, fully integrated appliances, and a hidden pantry — designed as much for performance as for appearance.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
    detail: ["Stone countertops", "Integrated appliances", "Hidden pantry", "Island seating"],
  },
  {
    id: "bath",
    label: "04 — Bath",
    name: "Primary Bathroom",
    desc: "A spa-grade retreat. Freestanding bath, heated stone floors, and a rainfall shower encased in seamless plaster.",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=80&auto=format&fit=crop",
    detail: ["Heated stone floors", "Rainfall shower", "Freestanding bath", "Double vanity"],
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
      gsap.fromTo(sectionRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    if (imgRef.current && infoRef.current) {
      gsap.fromTo([imgRef.current, infoRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [active]);

  const r = rooms[active];

  return (
    <section id="rooms" ref={sectionRef} className="section-dark py-28">
      <div className="px-10 mb-14">
        <div className="label label-accent mb-4">Interior</div>
        <h2 className="heading-xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--tone-text)]">
          Every Room, Considered
        </h2>
      </div>

      <div className="flex border-t border-b border-[var(--tone-border)] mb-14 overflow-x-auto">
        {rooms.map((rm, i) => (
          <button
            key={rm.id}
            onClick={() => setActive(i)}
            className={`label px-10 py-5 bg-transparent border-none cursor-pointer transition-colors duration-200 whitespace-nowrap ${
              i === active
                ? "text-[var(--tone-accent)] border-b border-[var(--tone-accent)]"
                : "text-[rgba(236,232,225,0.3)] border-b border-transparent"
            }`}
          >
            {rm.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-12 px-10 items-stretch">
        <div ref={imgRef} className="overflow-hidden aspect-video">
          <img
            src={r.img}
            alt={r.name}
            className="w-full h-full object-cover block cursor-grab"
            draggable={true}
          />
        </div>

        <div ref={infoRef} className="flex flex-col justify-center">
          <div className="label text-[rgba(236,232,225,0.3)] mb-4">{r.label}</div>
          <h3 className="heading-xl text-[clamp(1.5rem,2.5vw,2rem)] text-[var(--tone-text)] mb-5">
            {r.name}
          </h3>
          <div className="hairline mb-6" />
          <p className="body-copy mb-8">{r.desc}</p>

          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {r.detail.map((d) => (
              <li key={d} className="flex items-center gap-2 font-serif text-[0.95rem] font-light text-[rgba(236,232,225,0.55)]">
                <span className="w-4 h-[1px] bg-[var(--tone-accent)] shrink-0" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href="/reserve" className="btn no-underline inline-block">
              Reserve a Tour
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-12 px-10">
        {rooms.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${
              i === active ? "bg-[var(--tone-accent)] scale-125" : "bg-[rgba(236,232,225,0.2)] scale-100"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
