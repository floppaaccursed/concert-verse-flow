import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headerToken = request.headers['x-service-token'];
    const expected = this.configService.get<string>('SERVICE_TOKEN');
    if (!expected || headerToken !== expected) {
      throw new UnauthorizedException('Invalid service token');
    }
    return true;
  }
}
