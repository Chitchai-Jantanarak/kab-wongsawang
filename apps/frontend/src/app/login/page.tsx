"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { ArrowLeft, Building2, Mail, Lock, User, Check, Loader2, Crown, Gem, Star } from "lucide-react";

type AuthMode = "login" | "register";

interface MembershipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "guest",
    name: "Guest",
    price: "Free",
    description: "Browse and explore our residence",
    features: [
      "View floor plans",
      "Explore room details",
      "Save favorite rooms",
    ],
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "visitor",
    name: "Visitor",
    price: "$29",
    description: "Book site visits and tours",
    features: [
      "All Guest benefits",
      "Book site visits",
      "Schedule tours",
      "Receive updates",
    ],
    icon: <Gem className="h-5 w-5" />,
    popular: true,
  },
  {
    id: "resident",
    name: "Resident",
    price: "$99",
    description: "Priority access and exclusive benefits",
    features: [
      "All Visitor benefits",
      "Priority booking",
      "Exclusive previews",
      "Direct developer contact",
      "Customization options",
    ],
    icon: <Crown className="h-5 w-5" />,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuthStore();
  const [mode, setMode] = useState<AuthMode>("login");
  const [selectedTier, setSelectedTier] = useState<string>("visitor");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let success = false;
    if (mode === "login") {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.email, formData.password, formData.name);
    }
    
    if (success) {
      router.push("/reserve");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--tone-bg)]" />
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[var(--tone-accent)]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[var(--tone-accent)]/5 to-transparent rounded-full blur-3xl" />

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[var(--tone-muted)] hover:text-[var(--tone-accent)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="label">Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-5xl px-4 py-12">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-[var(--tone-accent)]" />
            <span className="font-serif text-2xl tracking-widest" style={{ color: "var(--tone-text)" }}>
              KAB
            </span>
          </div>
          <h1 className="heading-xl text-4xl md:text-5xl mb-3" style={{ color: "var(--tone-text)" }}>
            {mode === "login" ? "Welcome Back" : "Join KAB"}
          </h1>
          <p className="body-copy max-w-md mx-auto">
            {mode === "login" 
              ? "Sign in to manage your bookings and reservations"
              : "Select your membership tier to get started"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === "register" ? (
            <motion.div
              key="tiers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Membership Tiers */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {MEMBERSHIP_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={cn(
                      "relative p-6 text-left transition-all duration-300 border",
                      selectedTier === tier.id
                        ? "border-[var(--tone-accent)] bg-[var(--tone-accent-light)]"
                        : "border-[var(--tone-border)] hover:border-[var(--tone-accent)]/50 bg-transparent"
                    )}
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--tone-accent)] text-[var(--tone-bg)] text-xs label">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        selectedTier === tier.id 
                          ? "bg-[var(--tone-accent)] text-[var(--tone-bg)]" 
                          : "bg-[var(--tone-border)] text-[var(--tone-muted)]"
                      )}>
                        {tier.icon}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg" style={{ color: "var(--tone-text)" }}>
                          {tier.name}
                        </h3>
                        <p className="text-sm" style={{ color: "var(--tone-accent)" }}>
                          {tier.price}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: "var(--tone-muted)" }}>
                      {tier.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--tone-muted)" }}>
                          <Check className="h-3 w-3 mt-0.5 text-[var(--tone-accent)] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {selectedTier === tier.id && (
                      <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-[var(--tone-accent)] flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-[var(--tone-bg)]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="label block mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tone-muted)]" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field-input pl-12"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label block mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tone-muted)]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field-input pl-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label block mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tone-muted)]" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="field-input pl-12"
                      placeholder="Create a password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    `Join as ${MEMBERSHIP_TIERS.find(t => t.id === selectedTier)?.name}`
                  )}
                </button>
              </form>

              <p className="text-center mt-6 text-sm" style={{ color: "var(--tone-muted)" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[var(--tone-accent)] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="label block mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tone-muted)]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field-input pl-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label block mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tone-muted)]" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="field-input pl-12"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <p className="text-center mt-6 text-sm" style={{ color: "var(--tone-muted)" }}>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-[var(--tone-accent)] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Note */}
        <div className="mt-12 text-center">
          <p className="label text-[var(--tone-muted)]">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
