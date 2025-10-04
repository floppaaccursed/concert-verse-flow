import { Controller, Get, Req, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ServiceTokenGuard } from '../common/guards/service-token.guard';

@ApiTags('users')
@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  async me(@Req() req: any) {
    const user = await this.usersService.findById(req.user.sub);
    if (!user) return null;
    return { id: user._id, email: user.email, favoriteGenres: user.favoriteGenres, role: user.role };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('users/me/favorites')
  async updateFavorites(@Req() req: any, @Body('favoriteGenres') favoriteGenres: string[] = []) {
    await this.usersService['userModel'].updateOne({ _id: req.user.sub }, { $set: { favoriteGenres } });
    const updated = await this.usersService.findById(req.user.sub);
    return { favoriteGenres: updated?.favoriteGenres || [] };
  }

  @UseGuards(ServiceTokenGuard)
  @Get('internal/users/:id')
  async internalUser(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) return null;
    return { id: user._id, email: user.email, favoriteGenres: user.favoriteGenres, role: user.role };
  }
}
