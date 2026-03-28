"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Buy", id: "buying" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const pastHero = window.scrollY >= heroHeight;
      setInHero(!pastHero);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldHide = mounted && inHero;

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-6 transition-all duration-400 ${
        shouldHide
          ? "bg-transparent opacity-0 -translate-y-2.5 pointer-events-none"
          : scrolled
          ? "bg-[rgba(10,9,7,0.85)] backdrop-blur-[8px] border-b border-[rgba(236,232,225,0.06)]"
          : "bg-transparent"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-serif text-[1.1rem] font-light tracking-[0.18em] text-[rgba(236,232,225,0.75)] bg-none border-none cursor-pointer p-0"
      >
        KAB
      </button>

      <div className="flex gap-10 items-center">
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className="label text-[rgba(236,232,225,0.45)] bg-none border-none cursor-pointer p-0 transition-colors duration-200 hover:text-[rgba(236,232,225,0.85)]"
          >
            {label}
          </button>
        ))}

        <Link
          href="/reserve"
          className="label text-[var(--tone-accent)] no-underline border border-[rgba(184,154,96,0.35)] px-4 py-1.5 transition-colors duration-200 hover:bg-[rgba(184,154,96,0.1)]"
        >
          Reserve
        </Link>
      </div>
    </nav>
  );
}
