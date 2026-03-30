"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRoomsByFloor } from "@/hooks/useRooms";
import type { Room, Floor, FloorInfo } from "@/types/room";
import { cn } from "@/lib/utils";

interface Building3DProps {
  onRoomSelect: (room: Room) => void;
  selectedRoomId: string | null;
  roomAvailability?: Record<string, boolean>;
  expandedFloor?: number | null;
  onFloorExpand?: (floor: number) => void;
}

const FLOOR_CONFIG: FloorInfo[] = [
  { floor: 0, label: "Ground", content: "facilities", roomTypes: ["facility"], color: "#2d3436" },
  { floor: 1, label: "Floor 1", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#34495e" },
  { floor: 2, label: "Floor 2", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#3d566e" },
  { floor: 3, label: "Floor 3", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#45767e" },
  { floor: 4, label: "Floor 4", content: "rooms", roomTypes: ["penthouse"], color: "#4d798e" },
  { floor: 5, label: "Floor 5", content: "facilities", roomTypes: ["facility"], color: "#558a9e" },
];

export function Building3D({ 
  onRoomSelect, 
  selectedRoomId, 
  roomAvailability = {},
  expandedFloor: controlledExpandedFloor,
  onFloorExpand
}: Building3DProps) {
  const { data: roomsByFloor, isLoading } = useRoomsByFloor();
  const [internalSelectedFloor, setInternalSelectedFloor] = useState<Floor | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedFloor = controlledExpandedFloor ?? internalSelectedFloor;
  
  const handleFloorSelect = (floor: Floor) => {
    if (onFloorExpand) {
      onFloorExpand(floor);
    } else {
      setInternalSelectedFloor(selectedFloor === floor ? null : floor);
    }
  };

  const getRoomStatusColor = useCallback((room: Room) => {
    const isAvailable = roomAvailability[room.id] !== false && room.isActive;
    if (selectedRoomId === room.id) return "bg-amber-400 ring-2 ring-white ring-offset-2 ring-offset-black";
    if (!isAvailable) return "bg-red-500/70";
    return "bg-emerald-400 hover:bg-emerald-300";
  }, [selectedRoomId, roomAvailability]);

  const handleRoomClick = (room: Room, isAvailable: boolean) => {
    if (isAvailable) {
      onRoomSelect(room);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Orthographic Building View - 2D Flat Design */}
      <div className="relative mx-auto max-w-4xl">
        {/* Building Container */}
        <div className="relative flex flex-col items-center">
          {/* Floors - stacked from top (5) to bottom (0) */}
          <div className="flex w-full flex-col-reverse">
            {FLOOR_CONFIG.map((floorInfo, index) => {
              const floor = floorInfo.floor as Floor;
              const rooms = roomsByFloor?.[floor] || [];
              const isSelected = selectedFloor === floor;
              const isAboveSelected = selectedFloor !== null && floor > selectedFloor;
              
              return (
                <motion.div
                  key={floor}
                  className={cn(
                    "relative border-b-2 border-white/10 transition-all duration-300",
                    isSelected && "border-emerald-400/50"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    filter: isAboveSelected ? "grayscale(30%) brightness(0.7)" : "none"
                  }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => handleFloorSelect(floor)}
                >
                  {/* Floor Container */}
                  <div className={cn(
                    "relative cursor-pointer p-3 transition-colors duration-200",
                    isSelected ? "bg-white/10" : "bg-white/5 hover:bg-white/8"
                  )}>
                    {/* Floor Header */}
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "flex h-7 w-7 items-center justify-center rounded text-xs font-bold",
                          isSelected ? "bg-emerald-400 text-black" : "bg-white/20 text-white"
                        )}>
                          {floor === 0 ? "G" : floor}
                        </span>
                        <span className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-emerald-400" : "text-white/80"
                        )}>
                          {floorInfo.label}
                        </span>
                      </div>
                      <div className="text-xs text-white/40">
                        {floorInfo.content === "rooms" 
                          ? `${rooms.length} rooms` 
                          : "Facilities"}
                      </div>
                    </div>

                    {/* Rooms Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                      <AnimatePresence>
                        {rooms.map((room, roomIndex) => {
                          const isAvailable = roomAvailability[room.id] !== false && room.isActive;
                          const isHovered = hoveredRoom === room.id;
                          const isRoomSelected = selectedRoomId === room.id;
                          
                          return (
                            <motion.button
                              key={room.id}
                              className={cn(
                                "relative flex flex-col items-center justify-center rounded-md py-2 px-1 text-center transition-all duration-200",
                                getRoomStatusColor(room),
                                !isAvailable && "cursor-not-allowed opacity-60",
                                isAvailable && "cursor-pointer hover:scale-105",
                                isRoomSelected && "ring-2 ring-white ring-offset-2 ring-offset-black"
                              )}
                              style={{
                                backgroundColor: isSelected ? undefined : (isAvailable ? `${floorInfo.color}66` : undefined),
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: roomIndex * 0.02 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRoomClick(room, !!isAvailable);
                              }}
                              onMouseEnter={() => setHoveredRoom(room.id)}
                              onMouseLeave={() => setHoveredRoom(null)}
                              disabled={!isAvailable}
                            >
                              {/* Room Number */}
                              <span className={cn(
                                "text-xs font-bold",
                                isAvailable ? "text-black" : "text-white/50"
                              )}>
                                {room.number}
                              </span>
                              {/* Room Type */}
                              <span className={cn(
                                "text-[9px] uppercase tracking-wider",
                                isAvailable ? "text-black/70" : "text-white/40"
                              )}>
                                {room.type === "facility" 
                                  ? room.facility?.replace("-", " ") 
                                  : room.type}
                              </span>

                              {/* Availability indicator */}
                              <div className={cn(
                                "absolute -top-1 -right-1 h-2 w-2 rounded-full",
                                isAvailable ? "bg-emerald-400" : "bg-red-400"
                              )} />

                              {/* Hover Tooltip */}
                              <AnimatePresence>
                                {isHovered && isAvailable && (
                                  <motion.div
                                    className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-3 py-2 text-xs text-white shadow-xl"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                  >
                                    <div className="font-semibold">{room.number}</div>
                                    <div className="text-white/70">{room.type === "facility" ? room.facility : room.type}</div>
                                    <div className="text-emerald-400">${room.pricePerHour}/hr</div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Selected Floor Overlay */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="pointer-events-none absolute inset-0 border-2 border-emerald-400/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Ground/Base indicator */}
          <div className="mt-2 flex w-full items-center justify-center">
            <div className="h-1 w-32 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Floor Indicator Side Panel - 2D Flat Buttons */}
        <div className="absolute right-0 top-0 flex flex-col gap-1 -translate-y-2">
          {[...FLOOR_CONFIG].reverse().map((floorInfo) => {
            const floor = floorInfo.floor as Floor;
            const isSelected = selectedFloor === floor;
            const rooms = roomsByFloor?.[floor] || [];
            const availableCount = rooms.filter(r => roomAvailability[r.id] !== false && r.isActive).length;
            
            return (
              <button
                key={floor}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-all duration-200",
                  isSelected 
                    ? "bg-emerald-400 text-black shadow-lg" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFloorSelect(floor);
                }}
                title={`${floorInfo.label}: ${availableCount} available`}
              >
                {floor === 0 ? "G" : floor}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend - 2D Flat Style */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <span>Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded border-2 border-emerald-400/30" />
          <span>Active Floor</span>
        </div>
      </div>
    </div>
  );
}
