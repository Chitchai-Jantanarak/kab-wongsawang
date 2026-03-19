import { IsString, IsDateString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty()
  @IsUUID()
  roomId: string;

  @ApiProperty({ example: "2024-03-15" })
  @IsDateString()
  date: string;

  @ApiProperty({ example: "09:00" })
  @IsString()
  startTime: string;
}
