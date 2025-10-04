import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './dto/tokens.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(email: string, password: string, favoriteGenres: string[] = []): Promise<Tokens> {
    const user = await this.usersService.createUser({ email, password, favoriteGenres });
    return this.issueTokens(user._id.toString(), user.role, user.email);
  }

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user._id.toString(), user.role, user.email);
  }

  async refresh(userId: string, providedToken: string): Promise<Tokens> {
    const payload = this.jwtService.verify(providedToken, { secret: this.configService.get<string>('JWT_SECRET') });
    if (!payload || payload.sub !== userId || payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.issueTokens(userId, payload.role, payload.email);
  }

  private async issueTokens(userId: string, role: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, role, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '15m',
    });

    const refreshId = uuidv4();
    const refreshToken = await this.jwtService.signAsync({ ...payload, type: 'refresh', jti: refreshId }, {
      algorithm: 'HS256',
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN') || '7d',
    });

    await this.usersService.addRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async revokeRefreshToken(userId: string, providedToken: string): Promise<void> {
    await this.usersService.removeRefreshToken(userId, providedToken);
  }
}
