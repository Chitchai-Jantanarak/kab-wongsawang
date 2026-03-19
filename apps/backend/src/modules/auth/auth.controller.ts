import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "User login" })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }
    return { success: true, data: user };
  }

  @Post("register")
  @ApiOperation({ summary: "User registration" })
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto.email, dto.password, dto.name);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: "Email already exists" };
    }
  }
}
