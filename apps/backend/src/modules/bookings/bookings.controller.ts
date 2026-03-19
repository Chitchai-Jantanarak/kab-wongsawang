import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@ApiTags("bookings")
@Controller("api/bookings")
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: "Get user's bookings" })
  async findAll() {
    const userId = "demo-user";
    const bookings = await this.bookingsService.findAll(userId);
    return { success: true, data: bookings };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get booking by ID" })
  async findOne(@Param("id") id: string) {
    const userId = "demo-user";
    const booking = await this.bookingsService.findOne(id, userId);
    return { success: true, data: booking };
  }

  @Post()
  @ApiOperation({ summary: "Create a new booking" })
  async create(@Body() dto: CreateBookingDto) {
    const userId = "demo-user";
    try {
      const booking = await this.bookingsService.create(userId, dto);
      return { success: true, data: booking };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Cancel a booking" })
  async cancel(@Param("id") id: string) {
    const userId = "demo-user";
    try {
      const booking = await this.bookingsService.cancel(id, userId);
      return { success: true, data: booking };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
