export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-10 py-10 border-t border-[rgba(236,232,225,0.06)] bg-[#070605]">
      <span className="font-serif text-[1rem] font-light tracking-[0.16em] text-[rgba(236,232,225,0.3)]">
        KAB Reserve
      </span>

      <div className="flex gap-10">
        <a href="/" className="label text-[rgba(236,232,225,0.18)] no-underline transition-colors duration-200 hover:text-[rgba(236,232,225,0.5)]">
          Privacy
        </a>
        <a href="/" className="label text-[rgba(236,232,225,0.18)] no-underline transition-colors duration-200 hover:text-[rgba(236,232,225,0.5)]">
          Terms
        </a>
        <a href="/" className="label text-[rgba(236,232,225,0.18)] no-underline transition-colors duration-200 hover:text-[rgba(236,232,225,0.5)]">
          Sitemap
        </a>
      </div>

      <p className="label text-[rgba(236,232,225,0.15)]">© 2026 KAB Reserve</p>
    </footer>
  );
}
