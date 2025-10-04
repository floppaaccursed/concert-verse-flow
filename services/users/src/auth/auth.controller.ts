import { Body, Controller, Get, HttpCode, Post, Res, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response, Request } from 'express';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.register(dto.email, dto.password, dto.favoriteGenres || []);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto.email, dto.password);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = this.getRefreshCookie(req);
    if (refreshToken) {
      try {
        const payload = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('JWT_SECRET') });
        await this.authService.revokeRefreshToken(payload.sub, refreshToken);
      } catch (e) {}
    }
    res.clearCookie('refresh_token', this.cookieOptions());
    return { success: true };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = this.getRefreshCookie(req);
    if (!refreshToken) {
      return { error: 'No refresh token' };
    }
    const payload = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('JWT_SECRET') });
    const tokens = await this.authService.refresh(payload.sub, refreshToken);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  private setRefreshCookie(res: Response, token: string) {
    const opts = this.cookieOptions();
    res.cookie('refresh_token', token, opts);
  }

  private getRefreshCookie(req: Request): string | null {
    // @ts-ignore
    return (req.cookies && req.cookies['refresh_token']) || null;
  }

  private cookieOptions() {
    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: false,
      path: '/api/v1/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}
