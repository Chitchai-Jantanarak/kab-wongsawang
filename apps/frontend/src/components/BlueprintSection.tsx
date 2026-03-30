"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Room {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tag?: string;
}
interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const PLANS: Record<
  string,
  {
    id: string;
    title: string;
    floor: string;
    area: string;
    boundingBox: BoundingBox;
    rooms: Room[];
  }
> = {
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

function FloorPlan({ plan }: { plan: (typeof PLANS)[PlanKey] }) {
  return (
    <svg
      viewBox="0 0 500 380"
      className="w-full h-auto block"
    >
      {/* Exterior Thick Wall Shell */}
      <rect
        x={plan.boundingBox.x}
        y={plan.boundingBox.y}
        width={plan.boundingBox.w}
        height={plan.boundingBox.h}
        fill="rgba(184,154,96,0.02)"
        stroke="rgba(184,154,96,0.9)"
        strokeWidth={3}
        strokeLinejoin="miter"
      />

      {/* Interior Walls & Rooms */}
      {plan.rooms.map((room) => (
        <g key={room.label}>
          <rect
            x={room.x}
            y={room.y}
            width={room.w}
            height={room.h}
            fill="transparent"
            stroke="rgba(184,154,96,0.35)"
            strokeWidth={1.5}
            strokeLinejoin="miter"
          />
          <rect
            x={room.x + 1}
            y={room.y + 1}
            width={room.w - 2}
            height={room.h - 2}
            fill={
              room.tag === "exterior" ? "transparent" : "rgba(184,154,96,0.04)"
            }
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
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 5,
                letterSpacing: "0.08em",
              }}
            >
              [{room.tag}]
            </text>
          )}
        </g>
      ))}

      {/* Compass / Orientation */}
      <g transform="translate(470, 30)">
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="-10"
          stroke="rgba(184,154,96,0.6)"
          strokeWidth={0.7}
        />
        <line
          x1="-10"
          y1="0"
          x2="10"
          y2="0"
          stroke="rgba(184,154,96,0.6)"
          strokeWidth={0.7}
        />
        <text
          x="0"
          y="-13"
          textAnchor="middle"
          fill="rgba(184,154,96,0.6)"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 5.5,
            fontWeight: 600,
          }}
        >
          N
        </text>
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
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-28 px-5 md:px-10 lg:px-16"
      style={{
        background: "#0c0b09",
        borderTop: "1px solid rgba(236,232,225,0.04)",
      }}
    >
      {/* Header */}
      <div ref={headRef} className="mb-10 md:mb-14">
        <div
          className="label label-accent mb-3"
          style={{ letterSpacing: "0.15em" }}
        >
          Architecture
        </div>
        <h2
          className="heading-xl mb-4"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "var(--tone-text)",
          }}
        >
          Architectural Plans
        </h2>
        <div className="h-px w-16" style={{ background: "var(--tone-accent)" }} />
      </div>

      {/* Floor Tabs */}
      <div
        className="flex overflow-x-auto no-scrollbar gap-0 mb-10 md:mb-12 border-b"
        style={{ borderColor: "rgba(236,232,225,0.1)" }}
      >
        {planKeys.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className="px-4 md:px-6 py-3 bg-transparent border-none cursor-pointer transition-all duration-200 whitespace-nowrap"
            style={{
              color: k === active ? "#b89a60" : "rgba(236,232,225,0.3)",
              borderBottom:
                k === active ? "1px solid #b89a60" : "1px solid transparent",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              fontWeight: k === active ? 600 : 400,
            }}
          >
            {PLANS[k].title.split(" · ")[0]}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        {/* Floor Plan SVG */}
        <div
          className="p-4 md:p-8 relative"
          style={{
            border: "1px solid rgba(184,154,96,0.15)",
            background: "rgba(184,154,96,0.015)",
          }}
        >
          <div
            className="flex justify-between mb-4 pb-3 border-b text-xs tracking-wider"
            style={{
              borderColor: "rgba(184,154,96,0.15)",
              color: "rgba(184,154,96,0.7)",
            }}
          >
            <span>KAB RESERVE</span>
            <span>{plan.area}</span>
          </div>

          <FloorPlan plan={plan} />

          <div className="flex items-center gap-2 mt-4">
            <div
              className="w-10 h-px"
              style={{ background: "rgba(184,154,96,0.5)" }}
            />
            <span
              className="text-xs tracking-wider"
              style={{ color: "rgba(184,154,96,0.6)" }}
            >
              10 FEET
            </span>
          </div>
        </div>

        {/* Info Panel */}
        <div className="py-2 lg:py-0">
          <h3
            className="text-xl md:text-2xl mb-2"
            style={{ color: "#ece8e1", fontWeight: 400 }}
          >
            {plan.title.split(" · ")[1]}
          </h3>
          <p
            className="italic text-base mb-6 md:mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(236,232,225,0.5)",
            }}
          >
            {plan.floor}
          </p>

          {/* Rooms List */}
          <div
            className="flex flex-col gap-3 border-t pt-5"
            style={{ borderColor: "rgba(236,232,225,0.1)" }}
          >
            {plan.rooms.map((r) => (
              <div
                key={r.label}
                className="flex justify-between items-center"
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    color: "rgba(236,232,225,0.6)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {r.label}
                </span>
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "rgba(184,154,96,0.6)" }}
                >
                  {Math.round((r.w * r.h) / 12)} SQ FT
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10">
            <Link
              href="/reserve"
              className="inline-block no-underline px-5 py-3 text-sm tracking-wider uppercase font-medium"
              style={{
                color: "#0c0b09",
                background: "#b89a60",
              }}
            >
              Inquire About This Unit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
