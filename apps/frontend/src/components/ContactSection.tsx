"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([leftRef.current, rightRef.current], { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const ip = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value }),
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-dark py-28 px-8"
    >
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 gap-20 items-start">
        <div ref={leftRef}>
          <div className="label label-accent mb-5">Get in Touch</div>
          <h2 className="heading-xl text-[clamp(2rem,4vw,3rem)] text-[var(--tone-text)] mb-5">
            Speak with<br />Our Team
          </h2>
          <div className="hairline mb-10" />
          <p className="body-copy mb-12">
            Whether you're ready to purchase or simply want to learn more, our team is here to guide you.
          </p>

          <div className="flex flex-col gap-7">
            {[
              { l: "Sales Office", v: "+1 (212) 000-0000" },
              { l: "Email", v: "residences@kab.com" },
              { l: "Location", v: "One KAB Plaza, New York" },
              { l: "Hours", v: "Mon–Sat · 10 – 7 PM" },
            ].map(({ l, v }) => (
              <div key={l}>
                <div className="label text-[rgba(236,232,225,0.3)] mb-1">{l}</div>
                <div className="font-serif text-[1rem] font-light text-[rgba(236,232,225,0.75)]">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef}>
          {!sent ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex flex-col gap-8"
            >
              {[
                { label: "Name", key: "name", type: "text", ph: "Your name" },
                { label: "Email", key: "email", type: "email", ph: "your@email.com" },
              ].map(({ label, key, type, ph }) => (
                <div key={key}>
                  <div className="label text-[rgba(236,232,225,0.3)] mb-2">{label}</div>
                  <input className="field-input" type={type} placeholder={ph} required {...ip(key as keyof typeof form)} />
                </div>
              ))}

              <div>
                <div className="label text-[rgba(236,232,225,0.3)] mb-2">Enquiry</div>
                <select
                  className="field-input bg-transparent appearance-none"
                  {...ip("subject")}
                  style={{ color: form.subject ? "var(--tone-text)" : "rgba(236,232,225,0.25)", fontStyle: "italic" }}
                >
                  <option value="" disabled className="bg-[#0a0907]">Select a topic</option>
                  {["Purchase a Residence", "Private Tour", "Lounge Reservation", "General"].map(o => (
                    <option key={o} value={o} className="bg-[#0a0907]">{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="label text-[rgba(236,232,225,0.3)] mb-2">Message</div>
                <textarea
                  className="field-input resize-none"
                  placeholder="Your message..."
                  rows={4}
                  {...ip("message")}
                />
              </div>

              <button type="submit" className="btn self-start">Send</button>
            </form>
          ) : (
            <div className="pt-4">
              <div className="hairline mb-8" />
              <h3 className="heading-xl text-[1.8rem] text-[var(--tone-text)] mb-3">
                Message sent
              </h3>
              <p className="body-copy">We'll respond within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
