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
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        Array.from(cardsRef.current?.children ?? []),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        Array.from(statsRef.current?.children ?? []),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="buying"
      ref={sectionRef}
      className="section-light py-16 md:py-24 lg:py-28 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-10 md:mb-14">
          <div
            className="label mb-3"
            style={{ color: "var(--tone-accent)" }}
          >
            Ownership
          </div>
          <h2
            className="heading-xl mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "#1a1510",
            }}
          >
            Acquire a Residence
          </h2>
          <div className="hairline" />
        </div>

        {/* Units Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(26,21,16,0.06)" }}
        >
          {units.map((u) => (
            <div
              key={u.id}
              className="bg-white cursor-pointer overflow-hidden group"
            >
              {/* Image */}
              <div className="h-48 md:h-56 lg:h-60 overflow-hidden">
                <img
                  src={u.img}
                  alt={u.name}
                  className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div
                  className="label mb-2"
                  style={{
                    color:
                      u.status === "Signature"
                        ? "var(--tone-accent)"
                        : "rgba(26,21,16,0.35)",
                  }}
                >
                  {u.id} &nbsp;·&nbsp; {u.status}
                </div>
                <h3
                  className="heading-lg mb-1"
                  style={{ fontSize: "1.4rem", color: "#1a1510" }}
                >
                  {u.name}
                </h3>
                <p
                  className="italic mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.9rem",
                    color: "rgba(26,21,16,0.45)",
                  }}
                >
                  {u.floor} &nbsp;·&nbsp; {u.area}
                </p>

                <div
                  className="h-px mb-4"
                  style={{ background: "rgba(26,21,16,0.07)" }}
                />

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span
                    className="heading-lg"
                    style={{ fontSize: "1.2rem", color: "#1a1510" }}
                  >
                    {u.price}
                  </span>
                  <button
                    className="btn px-4 py-2 text-xs"
                    style={{
                      borderColor: "rgba(26,21,16,0.25)",
                      color: "rgba(26,21,16,0.65)",
                    }}
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-12 md:mt-16 border-t border-b py-8 md:py-10"
          style={{ borderColor: "rgba(26,21,16,0.08)" }}
        >
          {[
            { n: "40", l: "Floors" },
            { n: "12", l: "Residences" },
            { n: "24/7", l: "Concierge" },
            { n: "\u221E", l: "Views" },
          ].map(({ n, l }, i) => (
            <div
              key={l}
              className="text-center py-4 md:py-0"
              style={{
                borderRight:
                  i < 3 ? "1px solid rgba(26,21,16,0.08)" : "none",
              }}
            >
              <div
                className="heading-xl mb-1"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1a1510" }}
              >
                {n}
              </div>
              <div
                className="label"
                style={{ color: "rgba(26,21,16,0.35)" }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
