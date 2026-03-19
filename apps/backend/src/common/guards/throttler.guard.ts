import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context.host";

@Injectable()
export class ThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext | ExecutionContextHost
  ): Promise<void> {
    throw new ThrottlerException(
      "Too many requests. Please try again later."
    );
  }

  protected async getTracker(req: any): Promise<string> {
    return req.ip || req.connection.remoteAddress || "unknown";
  }
}
