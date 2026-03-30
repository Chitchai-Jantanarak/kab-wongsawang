export default function Footer() {
  return (
    <footer
      className="px-5 md:px-10 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
      style={{
        background: "#070605",
        borderTop: "1px solid rgba(236,232,225,0.06)",
      }}
    >
      {/* Logo */}
      <span
        className="order-2 md:order-1"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "1rem",
          letterSpacing: "0.16em",
          color: "rgba(236,232,225,0.3)",
        }}
      >
        KAB Reserve
      </span>

      {/* Links */}
      <div className="order-1 md:order-2 flex gap-6 md:gap-10">
        {["Privacy", "Terms", "Sitemap"].map((l) => (
          <a
            key={l}
            href="#"
            className="label transition-colors duration-200 hover:text-[rgba(236,232,225,0.5)]"
            style={{
              color: "rgba(236,232,225,0.18)",
              textDecoration: "none",
            }}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p
        className="order-3 label"
        style={{ color: "rgba(236,232,225,0.15)" }}
      >
        2026 KAB Reserve
      </p>
    </footer>
  );
}
