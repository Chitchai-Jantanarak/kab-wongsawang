import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { room: true },
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.booking.findFirst({
      where: { id, userId },
      include: { room: true },
    });
  }

  async create(userId: string, dto: CreateBookingDto) {
    const bookingDate = new Date(dto.date);
    bookingDate.setHours(0, 0, 0, 0);

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        userId,
        status: "CONFIRMED",
        date: bookingDate,
      },
    });

    if (existingBooking) {
      throw new BadRequestException("You already have an active booking for this date");
    }

    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId: dto.roomId,
        date: bookingDate,
        startTime: dto.startTime,
        status: "CONFIRMED",
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException("This time slot is already booked");
    }

    const endHour = parseInt(dto.startTime.split(":")[0]) + 2;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`;

    return this.prisma.booking.create({
      data: {
        roomId: dto.roomId,
        userId,
        date: bookingDate,
        startTime: dto.startTime,
        endTime,
        status: "CONFIRMED",
      },
      include: { room: true },
    });
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
    });

    if (!booking) {
      throw new BadRequestException("Booking not found");
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
      include: { room: true },
    });
  }
}
