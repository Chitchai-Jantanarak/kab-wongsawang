import { Controller, Get, Param, Query, Res, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiHeaders } from "@nestjs/swagger";
import { Response } from "express";
import { RoomsService } from "./rooms.service";
import { SkipThrottle } from "@nestjs/throttler";

@ApiTags("rooms")
@Controller("api/rooms")
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  @SkipThrottle()
  @ApiOperation({ summary: "Get all rooms" })
  @ApiQuery({ name: "floor", required: false, type: Number })
  @ApiQuery({ name: "type", required: false, type: String })
  async findAll(
    @Res() res: Response,
    @Query("floor") floor?: number,
    @Query("type") type?: string
  ) {
    const rooms = await this.roomsService.findAll(floor, type);
    res.setHeader("Cache-Control", "public, max-age=900");
    return res.json({ success: true, data: rooms });
  }

  @Get(":id")
  @SkipThrottle()
  @ApiOperation({ summary: "Get room by ID" })
  async findOne(@Res() res: Response, @Param("id") id: string) {
    const room = await this.roomsService.findOne(id);
    res.setHeader("Cache-Control", "public, max-age=900");
    return res.json({ success: true, data: room });
  }

  @Get(":id/availability")
  @ApiOperation({ summary: "Get room availability for a date" })
  async getAvailability(
    @Res() res: Response,
    @Param("id") id: string,
    @Query("date") date: string
  ) {
    const slots = await this.roomsService.getAvailability(id, new Date(date));
    res.setHeader("Cache-Control", "private, max-age=60");
    return res.json({ success: true, data: slots });
  }
}
