"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const units = [
  {
    id: "01",
    name: "Penthouse",
    floor: "40th Floor",
    area: "4,200 sq ft",
    beds: "4 Bed · 4.5 Bath",
    price: "$6,800,000",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
    status: "Signature",
  },
  {
    id: "02",
    name: "Sky",
    floor: "32nd Floor",
    area: "2,800 sq ft",
    beds: "3 Bed · 3 Bath",
    price: "$4,200,000",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=80&auto=format&fit=crop",
    status: "Available",
  },
  {
    id: "03",
    name: "Garden",
    floor: "12th Floor",
    area: "1,650 sq ft",
    beds: "2 Bed · 2 Bath",
    price: "$2,100,000",
    img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=900&q=80&auto=format&fit=crop",
    status: "Available",
  },
];

export default function BuyingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      gsap.fromTo(Array.from(cardsRef.current?.children ?? []), { opacity: 0, y: 48 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
      });
      gsap.fromTo(Array.from(statsRef.current?.children ?? []), { opacity: 0 }, {
        opacity: 1, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="buying"
      ref={sectionRef}
      className="section-light py-28 px-8"
    >
      <div className="max-w-[1080px] mx-auto">
        <div ref={headRef} className="mb-16">
          <div className="label mb-5 text-[var(--tone-accent)]">Ownership</div>
          <h2 className="heading-xl text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1510] mb-5">
            Acquire a Residence
          </h2>
          <div className="hairline" />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-3 gap-[2px] max-md:grid-cols-1"
        >
          {units.map((u) => (
            <div
              key={u.id}
              className="bg-white cursor-pointer overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={u.img}
                  alt={u.name}
                  className="w-full h-full object-cover transition-transform duration-600 block"
                />
              </div>

              <div className="p-7">
                <div
                  className={`label mb-2 ${
                    u.status === "Signature"
                      ? "text-[var(--tone-accent)]"
                      : "text-[rgba(26,21,16,0.35)]"
                  }`}
                >
                  {u.id} &nbsp;·&nbsp; {u.status}
                </div>
                <h3 className="heading-lg text-[1.5rem] text-[#1a1510] mb-1">
                  {u.name}
                </h3>
                <p className="font-serif text-[0.95rem] italic text-[rgba(26,21,16,0.45)] mb-5">
                  {u.floor} &nbsp;·&nbsp; {u.area}
                </p>

                <div className="h-[1px] bg-[rgba(26,21,16,0.07)] mb-5" />

                <div className="flex items-center justify-between">
                  <span className="heading-lg text-[1.3rem] text-[#1a1510]">
                    {u.price}
                  </span>
                  <button
                    className="btn border-[rgba(26,21,16,0.25)] text-[rgba(26,21,16,0.65)] py-2 px-5"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-4 gap-0 mt-20 border-t border-b border-[rgba(26,21,16,0.08)] py-10"
        >
          {[
            { n: "40", l: "Floors" },
            { n: "12", l: "Residences" },
            { n: "24/7", l: "Concierge" },
            { n: "∞", l: "Views" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center border-r border-[rgba(26,21,16,0.08)] last:border-r-0">
              <div className="heading-xl text-[2.2rem] text-[#1a1510]">
                {n}
              </div>
              <div className="label text-[rgba(26,21,16,0.35)] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
