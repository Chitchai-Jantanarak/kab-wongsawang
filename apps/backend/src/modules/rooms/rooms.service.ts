import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll(floor?: number, type?: string) {
    const where: Prisma.RoomWhereInput = { isActive: true };
    if (floor) where.floor = this.getFloorEnum(floor);
    if (type) where.type = type as any;

    return this.prisma.room.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async getAvailability(roomId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await this.prisma.booking.findMany({
      where: {
        roomId,
        date: { gte: startOfDay, lte: endOfDay },
        status: { in: ["CONFIRMED"] },
      },
    });

    const bookedTimes = new Set(bookings.map((b) => b.startTime));
    const slots = this.generateTimeSlots();

    return slots.map((time) => ({
      time,
      available: !bookedTimes.has(time),
      bookingId: bookings.find((b) => b.startTime === time)?.id,
    }));
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 8; hour < 22; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  }

  private getFloorEnum(floor: number) {
    const floorMap: Record<number, "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"> = {
      1: "ONE",
      2: "TWO",
      3: "THREE",
      4: "FOUR",
      5: "FIVE",
    };
    return floorMap[floor];
  }
}
