import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsDateString, IsInt, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VenueDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  city!: string;

  @ApiProperty()
  @IsString()
  country!: string;
}

export class CreateConcertDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  genres!: string[];

  @ApiProperty({ type: VenueDto })
  @ValidateNested()
  @Type(() => VenueDto)
  venue!: VenueDto;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  availableTickets!: number;
}
