import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[var(--tone-bg)] py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[rgba(184,154,96,0.02)] border-[rgba(184,154,96,0.15)]">
          <CardHeader>
            <CardTitle className="heading-xl text-[var(--tone-text)]">Reserve Your Visit</CardTitle>
            <CardDescription className="body-copy">
              Book a private tour of our residence.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--tone-muted)]">Coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
