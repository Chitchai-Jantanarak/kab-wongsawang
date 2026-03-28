"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Room { label: string; x: number; y: number; w: number; h: number; tag?: string }
interface BoundingBox { x: number; y: number; w: number; h: number; }

const PLANS: Record<string, { 
  id: string; 
  title: string; 
  floor: string; 
  area: string; 
  boundingBox: BoundingBox; 
  rooms: Room[] 
}> = {
    floor1: {
      id: "floor1",
      title: "Floor 1 · Studio",
      floor: "1st Floor · 850 sq ft",
      area: "1BR/STUDIO · 1BA",
      boundingBox: { x: 100, y: 50, w: 300, h: 260 },
      rooms: [
        { label: "ENTRY", x: 100, y: 50, w: 100, h: 80 },
        { label: "BATH", x: 200, y: 50, w: 100, h: 80 },
        { label: "KITCHEN", x: 300, y: 50, w: 100, h: 80 },
        { label: "LIVING / BED", x: 100, y: 130, w: 300, h: 130 },
        { label: "BALCONY", x: 100, y: 260, w: 300, h: 50, tag: "exterior" },
      ],
    },
    floor2: {
      id: "floor2",
      title: "Floor 2 · Loft",
      floor: "2nd Floor · 1,450 sq ft",
      area: "1BR LOFT · 1.5BA",
      boundingBox: { x: 60, y: 40, w: 380, h: 280 },
      rooms: [
        { label: "LIVING", x: 60, y: 40, w: 200, h: 100 },
        { label: "KITCHEN / DINING", x: 260, y: 40, w: 180, h: 100 },
        { label: "LOFT BEDROOM", x: 60, y: 140, w: 150, h: 120, tag: "raised" },
        { label: "BATH", x: 210, y: 140, w: 90, h: 120 },
        { label: "CLOSET", x: 300, y: 140, w: 140, h: 120 },
        { label: "TERRACE", x: 60, y: 260, w: 380, h: 60, tag: "exterior" },
      ],
    },
    floor3: {
      id: "floor3",
      title: "Floor 3 · Grand Loft",
      floor: "3rd Floor · 2,200 sq ft",
      area: "2BR · 2BA",
      boundingBox: { x: 40, y: 30, w: 420, h: 310 },
      rooms: [
        { label: "GREAT ROOM", x: 40, y: 30, w: 240, h: 130 },
        { label: "KITCHEN", x: 280, y: 30, w: 180, h: 130 },
        { label: "PRIMARY SUITE", x: 40, y: 160, w: 160, h: 120 },
        { label: "ENSUITE", x: 200, y: 160, w: 80, h: 120 },
        { label: "GUEST BED", x: 280, y: 160, w: 100, h: 120 },
        { label: "GUEST BATH", x: 380, y: 160, w: 80, h: 120 },
        { label: "PRIVATE DECK", x: 40, y: 280, w: 420, h: 60, tag: "exterior" },
      ],
    },
    floor4: {
      id: "floor4",
      title: "Floor 4 · Penthouse",
      floor: "4th Floor · 4,200 sq ft",
      area: "4BR · 4.5BA",
      boundingBox: { x: 20, y: 20, w: 460, h: 330 },
      rooms: [
        { label: "LIVING", x: 20, y: 20, w: 220, h: 100 },
        { label: "DINING", x: 240, y: 20, w: 140, h: 100 },
        { label: "KITCHEN", x: 380, y: 20, w: 100, h: 100 },
        { label: "PRIMARY", x: 20, y: 120, w: 180, h: 130, tag: "suite" },
        { label: "PRIMARY BATH", x: 200, y: 120, w: 100, h: 130 },
        { label: "OFFICE", x: 300, y: 120, w: 90, h: 130 },
        { label: "BR 2", x: 390, y: 120, w: 90, h: 130 },
        { label: "BR 3", x: 20, y: 250, w: 140, h: 100 },
        { label: "LIBRARY", x: 160, y: 250, w: 140, h: 100 },
        { label: "TERRACE", x: 300, y: 250, w: 180, h: 100, tag: "exterior" },
      ],
    },
  };

type PlanKey = keyof typeof PLANS;

function FloorPlan({ plan }: { plan: typeof PLANS[PlanKey] }) {
  return (
    <svg viewBox="0 0 500 380" className="w-full h-auto block">
      <rect
        x={plan.boundingBox.x} y={plan.boundingBox.y}
        width={plan.boundingBox.w} height={plan.boundingBox.h}
        fill="rgba(184,154,96,0.02)"
        stroke="rgba(184,154,96,0.9)"
        strokeWidth={3}
        strokeLinejoin="miter"
      />
      {plan.rooms.map((room) => (
        <g key={room.label}>
          <rect
            x={room.x} y={room.y} width={room.w} height={room.h}
            fill="transparent"
            stroke="rgba(184,154,96,0.35)"
            strokeWidth={1.5}
            strokeLinejoin="miter"
          />
          <rect
            x={room.x + 1} y={room.y + 1}
            width={room.w - 2} height={room.h - 2}
            fill={room.tag === "exterior" ? "transparent" : "rgba(184,154,96,0.04)"}
          />
          <text
            x={room.x + room.w / 2}
            y={room.y + room.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(236,232,225,0.45)"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: room.w > 120 ? 7 : 5.5,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {room.label}
          </text>
          {room.tag && (
            <text
              x={room.x + room.w / 2}
              y={room.y + room.h / 2 + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(184,154,96,0.6)"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 5, letterSpacing: "0.08em" }}
            >
              [{room.tag}]
            </text>
          )}
        </g>
      ))}
      <g transform="translate(470, 30)">
        <line x1="0" y1="10" x2="0" y2="-10" stroke="rgba(184,154,96,0.6)" strokeWidth={0.7} />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="rgba(184,154,96,0.6)" strokeWidth={0.7} />
        <text x="0" y="-13" textAnchor="middle" fill="rgba(184,154,96,0.6)" className="font-[family-name:var(--app-font-sans)] text-[5.5px] font-semibold">N</text>
      </g>
    </svg>
  );
}

export default function BlueprintSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<PlanKey>("floor4");
  const planKeys = Object.keys(PLANS) as PlanKey[];
  const plan = PLANS[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0c0b09] py-28 px-10 border-t border-[rgba(236,232,225,0.04)]"
    >
      <div ref={headRef} className="mb-16">
        <div className="label label-accent mb-4 text-[var(--tone-accent,#b89a60)] tracking-[0.1em] uppercase text-[0.85rem]">
          Architecture
        </div>
        <h2 className="heading-xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--tone-text,#ece8e1)] mb-5">
          Architectural Plans
        </h2>
        <div className="h-[1px] w-[60px] bg-[var(--tone-accent,#b89a60)]" />
      </div>

      <div className="flex mb-12 border-b border-[rgba(236,232,225,0.1)]">
        {planKeys.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`px-8 py-3.5 bg-transparent border-none cursor-pointer transition-all duration-200 uppercase text-[0.8rem] tracking-[0.05em] ${
              k === active
                ? "text-[#b89a60] border-b border-[#b89a60] font-semibold"
                : "text-[rgba(236,232,225,0.3)] border-b border-transparent font-light"
            }`}
          >
            {PLANS[k].title.split(" · ")[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-16 items-start">
        <div className="border border-[rgba(184,154,96,0.15)] p-10 bg-[rgba(184,154,96,0.015)] relative">
          <div className="flex justify-between mb-6 border-b border-[rgba(184,154,96,0.15)] pb-3">
            <span className="text-[rgba(184,154,96,0.7)] text-[0.7rem] tracking-[0.1em]">KAB RESERVE</span>
            <span className="text-[rgba(184,154,96,0.7)] text-[0.7rem] tracking-[0.1em]">{plan.area}</span>
          </div>

          <FloorPlan plan={plan} />

          <div className="flex items-center gap-2 mt-5">
            <div className="w-10 h-[1px] bg-[rgba(184,154,96,0.5)]" />
            <span className="text-[rgba(184,154,96,0.6)] text-[0.55rem] tracking-[0.05em]">10 FEET</span>
          </div>
        </div>

        <div>
          <h3 className="text-[1.6rem] text-[#ece8e1] mb-2 font-light">
            {plan.title.split(" · ")[1]}
          </h3>
          <p className="font-serif italic text-[1.05rem] text-[rgba(236,232,225,0.5)] mb-8">
            {plan.floor}
          </p>

          <div className="flex flex-col gap-4 border-t border-[rgba(236,232,225,0.1)] pt-6">
            {plan.rooms.map((r) => (
              <div key={r.label} className="flex justify-between items-center">
                <span className="font-serif text-[1rem] text-[rgba(236,232,225,0.6)] tracking-[0.02em]">
                  {r.label}
                </span>
                <span className="text-[rgba(184,154,96,0.6)] text-[0.6rem] tracking-[0.05em]">
                  {Math.round((r.w * r.h) / 12)} SQ FT
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/reserve"
              className="inline-block no-underline text-[#0c0b09] bg-[#b89a60] px-6 py-3 text-[0.8rem] tracking-[0.05em] uppercase font-medium"
            >
              Inquire About This Unit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
