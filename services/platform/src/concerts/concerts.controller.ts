import { Controller, Get, Post, Body, Param, Query, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ServiceTokenGuard } from '../common/guards/service-token.guard';

@ApiTags('concerts')
@Controller('api/v1/concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateConcertDto) {
    return this.concertsService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'genres', required: false, description: 'Comma-separated genres filter' })
  findAll(@Query('genres') genres?: string) {
    const list = genres ? genres.split(',').map((g) => g.trim()).filter(Boolean) : [];
    return this.concertsService.findAll({ genres: list });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConcertDto) {
    return this.concertsService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertsService.remove(id);
  }

  @UseGuards(ServiceTokenGuard)
  @Get('/internal/by-genres')
  internalByGenres(@Query('genres') genres?: string) {
    const list = genres ? genres.split(',').map((g) => g.trim()).filter(Boolean) : [];
    return this.concertsService.findAll({ genres: list });
  }
}
