import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ThrottlerGuard } from "./common/guards/throttler.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 60000,
        limit: 10,
      },
      {
        name: "long",
        ttl: 3600000,
        limit: 100,
      },
      {
        name: "auth",
        ttl: 60000,
        limit: 30,
      },
    ]),
    RoomsModule,
    BookingsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
