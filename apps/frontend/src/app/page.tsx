import { useEffect } from "react";
import Link from "next/link";
import { useRoomStore } from "@/store";

export default function HomePage() {
  const { rooms, fetchRooms, isLoading } = useRoomStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Luxury Residence</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Book your perfect space. Rooms on floors 1-4, facilities on floor 5.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/rooms"
            className="rounded-md bg-primary px-6 py-3 text-primary-foreground hover:opacity-90"
          >
            View Rooms
          </Link>
          <Link
            href="/bookings"
            className="rounded-md border border-input bg-background px-6 py-3 hover:bg-accent"
          >
            My Bookings
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Building Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FloorCard
            floor={1}
            title="Floor 1-3"
            description="Modern living spaces"
            types={["Studio", "Loft", "Single"]}
          />
          <FloorCard
            floor={4}
            title="Floor 4"
            description="Luxury penthouse suites"
            types={["Penthouse"]}
          />
          <FloorCard
            floor={5}
            title="Floor 5"
            description="Premium amenities"
            types={["Garden", "Fitness", "Swimming Pool"]}
          />
        </div>
      </section>
    </main>
  );
}

function FloorCard({
  floor,
  title,
  description,
  types,
}: {
  floor: number;
  title: string;
  description: string;
  types: string[];
}) {
  return (
    <div className="rounded-lg border border-border p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">Floor {floor}</span>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
