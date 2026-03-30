"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    checkAuth();
    
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const pastHero = window.scrollY >= heroHeight;
      setInHero(!pastHero);
      setVisible(pastHero);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [checkAuth]);

  const shouldHide = mounted && inHero;
  const fadeInComplete = visible;

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  const handleMyBookings = () => {
    setUserMenuOpen(false);
    router.push("/reserve");
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 lg:px-10"
        style={{
          background: shouldHide
            ? "transparent"
            : scrolled
            ? "rgba(10,9,7,0.9)"
            : "transparent",
          backdropFilter: scrolled && !shouldHide ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled && !shouldHide ? "blur(12px)" : "none",
          transition:
            "background 0.4s, backdrop-filter 0.4s, opacity 0.4s, transform 0.4s",
          borderBottom:
            scrolled && !shouldHide ? "1px solid rgba(236,232,225,0.06)" : "none",
          opacity: shouldHide ? 0 : fadeInComplete ? 1 : 0,
          transform: shouldHide
            ? "translateY(-10px)"
            : fadeInComplete
            ? "translateY(0)"
            : "translateY(-10px)",
          pointerEvents: shouldHide ? "none" : "auto",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-base tracking-widest bg-transparent border-none cursor-pointer p-0"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "0.18em",
            color: "rgba(236,232,225,0.8)",
          }}
        >
          KAB
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {[
            { label: "Rooms", id: "rooms" },
            { label: "Buy", id: "buying" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="label bg-transparent border-none cursor-pointer p-0 transition-colors duration-200 hover:text-[rgba(236,232,225,0.85)]"
              style={{ color: "rgba(236,232,225,0.45)" }}
            >
              {label}
            </button>
          ))}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 label no-underline px-4 py-2 border transition-all duration-200"
                style={{
                  color: "var(--tone-accent)",
                  borderColor: "rgba(184,154,96,0.4)",
                }}
              >
                <div className="h-6 w-6 rounded-full bg-[var(--tone-accent)] flex items-center justify-center text-[var(--tone-bg)] text-xs font-semibold">
                  {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span>{user?.name || "Account"}</span>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 py-2 min-w-[180px] border border-[var(--tone-border)]"
                  style={{
                    background: "rgba(10,9,7,0.95)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <button
                    onClick={handleMyBookings}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer"
                    style={{ color: "var(--tone-text)" }}
                  >
                    My Bookings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer"
                    style={{ color: "var(--tone-muted)" }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={{ pathname: "/login" }}
              className="label no-underline px-5 py-2 border transition-all duration-200 hover:bg-[var(--tone-accent)] hover:text-[var(--tone-bg)]"
              style={{
                color: "var(--tone-accent)",
                borderColor: "rgba(184,154,96,0.4)",
              }}
            >
              Sign In
            </Link>
          )}

          <Link
            href="/reserve"
            className="label no-underline px-5 py-2 border transition-all duration-200 hover:bg-[var(--tone-accent)] hover:text-[var(--tone-bg)]"
            style={{
              color: "var(--tone-accent)",
              borderColor: "rgba(184,154,96,0.4)",
            }}
          >
            Reserve
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className="w-5 h-px bg-[rgba(236,232,225,0.6)] transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="w-5 h-px bg-[rgba(236,232,225,0.6)] mt-1.5 transition-all duration-300"
            style={{
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            className="w-5 h-px bg-[rgba(236,232,225,0.6)] mt-1.5 transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-400"
        style={{
          background: "rgba(10,9,7,0.98)",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {[
          { label: "Rooms", id: "rooms" },
          { label: "Buy", id: "buying" },
          { label: "Contact", id: "contact" },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className="heading-lg text-2xl bg-transparent border-none cursor-pointer transition-colors duration-200"
            style={{ color: "rgba(236,232,225,0.7)" }}
          >
            {label}
          </button>
        ))}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="heading-lg text-2xl bg-transparent border-none cursor-pointer transition-colors duration-200"
            style={{ color: "rgba(236,232,225,0.7)" }}
          >
            Sign Out
          </button>
        ) : (
          <Link
            href={{ pathname: "/login" }}
            onClick={() => setMobileMenuOpen(false)}
            className="btn mt-4 no-underline"
          >
            Sign In
          </Link>
        )}

        <Link
          href="/reserve"
          onClick={() => setMobileMenuOpen(false)}
          className="btn mt-4 no-underline"
        >
          Reserve a Visit
        </Link>
      </div>
    </>
  );
}
