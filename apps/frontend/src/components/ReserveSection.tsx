"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReserveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "", note: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([headRef.current, formRef.current], { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <div className="label text-[rgba(236,232,225,0.3)] mb-2">{label}</div>
      {children}
    </div>
  );

  const inputProps = (key: keyof typeof form) => ({
    className: "field-input",
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="section-mid py-28 px-8"
    >
      <div className="max-w-[820px] mx-auto">
        <div ref={headRef} className="mb-16">
          <div className="label label-accent mb-5">Private Access</div>
          <h2 className="heading-xl text-[clamp(2rem,4.5vw,3.2rem)] text-[var(--tone-text)] mb-5">
            Reserve Your Evening
          </h2>
          <div className="hairline" />
        </div>

        {!sent ? (
          <div ref={formRef}>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="grid grid-cols-2 gap-x-12 gap-y-10"
            >
              <Field label="Full Name">
                <input {...inputProps("name")} placeholder="Your name" required />
              </Field>
              <Field label="Email">
                <input {...inputProps("email")} type="email" placeholder="your@email.com" required />
              </Field>
              <Field label="Phone">
                <input {...inputProps("phone")} type="tel" placeholder="+1 (000) 000-0000" />
              </Field>
              <Field label="Preferred Date">
                <input {...inputProps("date")} type="date" />
              </Field>
              <Field label="Guests">
                <select
                  {...inputProps("guests")}
                  className="field-input bg-transparent appearance-none"
                  style={{ color: form.guests ? "var(--tone-text)" : "rgba(236,232,225,0.25)", fontStyle: "italic" }}
                >
                  <option value="" disabled className="bg-[#111009]">Select</option>
                  {[1,2,3,4,5,"6+"].map(n => <option key={n} value={n} className="bg-[#111009]">{n}</option>)}
                </select>
              </Field>
              <Field label="Special Requests">
                <textarea
                  {...inputProps("note") as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
                  placeholder="Any notes..."
                  rows={1}
                  className="field-input resize-none"
                />
              </Field>
              <div className="col-span-full pt-2">
                <button type="submit" className="btn">Confirm Reservation</button>
              </div>
            </form>
          </div>
        ) : (
          <div ref={formRef} className="pt-8">
            <div className="hairline mb-8" />
            <h3 className="heading-xl text-[1.8rem] text-[var(--tone-text)] mb-3">
              Received
            </h3>
            <p className="body-copy">We'll be in touch to confirm your visit.</p>
          </div>
        )}
      </div>
    </section>
  );
}
