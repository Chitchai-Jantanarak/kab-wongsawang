"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Building3D } from "@/components/Building3D";
import { RoomSchedule } from "@/components/RoomSchedule";
import { useRooms } from "@/hooks/useRooms";
import { useAuthStore } from "@/store/auth.store";
import type { Room } from "@/types/room";
import { ArrowLeft, Building2, LogIn, Home, Building, Waves, Coffee, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

const FLOOR_DATA = [
  { 
    floor: 0, 
    name: "Ground Floor", 
    icon: Coffee,
    desc: "Open plan lobby & welcoming lounge",
    type: "lobby" as const,
    bookable: false,
    color: "from-amber-900/30 to-amber-800/20"
  },
  { 
    floor: 1, 
    name: "Floor 1", 
    icon: Building,
    desc: "Studio apartments - Compact living",
    type: "residential" as const,
    bookable: true,
    color: "from-slate-800/30 to-slate-700/20"
  },
  { 
    floor: 2, 
    name: "Floor 2", 
    icon: Building,
    desc: "Loft apartments - Double-height voids",
    type: "residential" as const,
    bookable: true,
    color: "from-slate-700/30 to-slate-600/20"
  },
  { 
    floor: 3, 
    name: "Floor 3", 
    icon: Building,
    desc: "Grand loft apartments - Spacious areas",
    type: "residential" as const,
    bookable: true,
    color: "from-slate-600/30 to-slate-500/20"
  },
  { 
    floor: 4, 
    name: "Floor 4", 
    icon: Home,
    desc: "Penthouse - Luxury living",
    type: "residential" as const,
    bookable: true,
    color: "from-amber-700/30 to-amber-600/20"
  },
  { 
    floor: 5, 
    name: "Floor 5", 
    icon: Waves,
    desc: "Pool, Fitness & Garden",
    type: "facility" as const,
    bookable: true,
    color: "from-emerald-900/30 to-emerald-800/20"
  },
];

export default function ReservePage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const { data: rooms } = useRooms();
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const roomAvailability: Record<string, boolean> = {};
  rooms?.forEach((room) => {
    roomAvailability[room.id] = room.isActive !== false;
  });

  const handleRoomSelect = useCallback((room: Room) => {
    setSelectedRoom(room);
  }, []);

  const handleCloseSchedule = useCallback(() => {
    setSelectedRoom(null);
  }, []);

  const handleBookingComplete = useCallback(() => {
    toast.success("Booking confirmed!", {
      description: "You will receive a confirmation email shortly.",
    });
    setSelectedRoom(null);
  }, []);

  const selectFloor = (floor: number) => {
    setSelectedFloor(floor);
  };

  const bookableFloors = FLOOR_DATA.filter(f => f.bookable);

  return (
    <div className="min-h-screen" style={{ background: "var(--tone-bg)" }}>
      {/* Header */}
      <header 
        className="fixed left-0 right-0 top-0 z-50 border-b"
        style={{ 
          background: "rgba(10,9,7,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--tone-border)"
        }}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl">
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--tone-accent)]"
            style={{ color: "var(--tone-muted)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline label">Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" style={{ color: "var(--tone-accent)" }} />
            <span className="font-semibold" style={{ color: "var(--tone-text)" }}>KAB Reserve</span>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div 
                  className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: "var(--tone-accent)", color: "var(--tone-bg)" }}
                >
                  {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
            ) : (
              <Link
                href={{ pathname: "/login" }}
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--tone-accent)]"
                style={{ color: "var(--tone-muted)" }}
              >
                <LogIn className="h-4 w-4" />
                <span className="label">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Title Section */}
        <section className="px-4 py-12 text-center" style={{ background: "linear-gradient(180deg, rgba(184,154,96,0.05) 0%, transparent 100%)" }}>
          <h1 className="heading-xl text-4xl md:text-5xl mb-3" style={{ color: "var(--tone-text)" }}>
            Book Your Visit
          </h1>
          <p className="body-copy max-w-lg mx-auto">
            Schedule a viewing for apartments (Floors 1-4) or reserve facilities (Floor 5)
          </p>
        </section>

        {/* Floor Selector */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5" style={{ color: "var(--tone-accent)" }} />
              <h2 className="font-serif text-lg" style={{ color: "var(--tone-text)" }}>Select a Floor</h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {FLOOR_DATA.map((floor) => {
                const Icon = floor.icon;
                const isSelected = selectedFloor === floor.floor;
                const isBookable = floor.bookable;
                
                return (
                  <button
                    key={floor.floor}
                    onClick={() => selectFloor(floor.floor)}
                    className="relative p-4 text-center transition-all duration-300 border"
                    style={{ 
                      borderColor: isSelected ? "var(--tone-accent)" : "var(--tone-border)",
                      background: isSelected ? "var(--tone-accent-light)" : "transparent",
                      borderRadius: "var(--radius)",
                      opacity: isBookable ? 1 : 0.6
                    }}
                  >
                    <Icon 
                      className="h-6 w-6 mx-auto mb-2" 
                      style={{ color: isSelected ? "var(--tone-accent)" : "var(--tone-muted)" }} 
                    />
                    <div className="text-sm font-medium" style={{ color: "var(--tone-text)" }}>
                      {floor.floor === 0 ? "G" : `F${floor.floor}`}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--tone-muted)" }}>
                      {floor.type === "lobby" ? "Lobby" : floor.type === "facility" ? "Facilities" : "Rooms"}
                    </div>
                    {!isBookable && (
                      <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        View only
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full" style={{ background: "var(--tone-accent)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Building View */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Floor Info Panel */}
              <div className="lg:col-span-1 space-y-4">
                {selectedFloor !== null ? (
                  <div 
                    className="p-6 border"
                    style={{ 
                      borderColor: "var(--tone-border)",
                      borderRadius: "var(--radius)",
                      background: FLOOR_DATA.find(f => f.floor === selectedFloor)?.bookable 
                        ? "var(--tone-accent-light)" 
                        : "rgba(255,255,255,0.02)"
                    }}
                  >
                    {(() => {
                      const floor = FLOOR_DATA.find(f => f.floor === selectedFloor);
                      if (!floor) return null;
                      const Icon = floor.icon;
                      
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ background: "var(--tone-accent)", color: "var(--tone-bg)" }}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-serif text-xl" style={{ color: "var(--tone-text)" }}>{floor.name}</h3>
                              <p className="text-sm" style={{ color: "var(--tone-muted)" }}>{floor.type}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-4" style={{ color: "var(--tone-text)" }}>{floor.desc}</p>
                          
                          {floor.bookable ? (
                            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--tone-accent)" }}>
                              <Calendar className="h-4 w-4" />
                              <span>Click a room below to book</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--tone-muted)" }}>
                              <span>This floor is for lobby & reception only</span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div 
                    className="p-6 border border-dashed"
                    style={{ 
                      borderColor: "var(--tone-border)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    <p className="text-sm text-center" style={{ color: "var(--tone-muted)" }}>
                      Select a floor above to view rooms
                    </p>
                  </div>
                )}

                {/* Legend */}
                <div className="p-4 border" style={{ borderColor: "var(--tone-border)", borderRadius: "var(--radius)" }}>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span style={{ color: "var(--tone-muted)" }}>Available to book</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/70" />
                      <span style={{ color: "var(--tone-muted)" }}>Already reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <span style={{ color: "var(--tone-muted)" }}>Selected</span>
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="p-4 border" style={{ borderColor: "var(--tone-border)", borderRadius: "var(--radius)" }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--tone-text)" }}>Booking Info</h4>
                  <div className="space-y-2 text-xs" style={{ color: "var(--tone-muted)" }}>
                    <p>• Time slots: 2 hours each</p>
                    <p>• Hours: 09:00 - 17:00</p>
                    <p>• Floors 1-4: Apartment viewing</p>
                    <p>• Floor 5: Pool, Gym, Garden</p>
                  </div>
                </div>
              </div>

              {/* Building Grid */}
              <div className="lg:col-span-2">
                <div 
                  className="border overflow-hidden"
                  style={{ 
                    borderColor: "var(--tone-border)",
                    borderRadius: "var(--radius)",
                    background: "linear-gradient(180deg, rgba(20,20,18,1) 0%, rgba(10,10,8,1) 100%)"
                  }}
                >
                  <Building3D
                    onRoomSelect={handleRoomSelect}
                    selectedRoomId={selectedRoom?.id || null}
                    roomAvailability={roomAvailability}
                    expandedFloor={selectedFloor}
                    onFloorExpand={selectFloor}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floor Details */}
        <section className="px-4 py-8 border-t" style={{ borderColor: "var(--tone-border)" }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-xl text-center mb-6" style={{ color: "var(--tone-text)" }}>
              Floor Details
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookableFloors.map((floor) => {
                const Icon = floor.icon;
                return (
                  <div
                    key={floor.floor}
                    className="p-4 border"
                    style={{ 
                      borderColor: "var(--tone-border)",
                      borderRadius: "var(--radius)",
                      background: `linear-gradient(135deg, ${floor.color})`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5" style={{ color: "var(--tone-accent)" }} />
                      <span className="font-medium" style={{ color: "var(--tone-text)" }}>{floor.name}</span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--tone-muted)" }}>{floor.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Room schedule modal */}
      {selectedRoom && (
        <RoomSchedule
          room={selectedRoom}
          onClose={handleCloseSchedule}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  );
}
