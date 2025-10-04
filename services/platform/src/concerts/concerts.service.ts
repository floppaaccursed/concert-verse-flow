import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert, ConcertDocument } from './schemas/concert.schema';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertsService {
  constructor(@InjectModel(Concert.name) private readonly concertModel: Model<ConcertDocument>) {}

  async create(dto: CreateConcertDto): Promise<Concert> {
    const created = await this.concertModel.create({
      title: dto.title,
      genres: dto.genres,
      venue: dto.venue,
      date: new Date(dto.date),
      availableTickets: dto.availableTickets ?? 0,
    });
    return created.toObject();
  }

  async findAll(filters?: { genres?: string[] }): Promise<Concert[]> {
    const query: any = {};
    if (filters?.genres && filters.genres.length > 0) {
      query.genres = { $in: filters.genres };
    }
    return this.concertModel.find(query).sort({ date: 1 }).lean();
  }

  async findOne(id: string): Promise<Concert> {
    const concert = await this.concertModel.findById(id).lean();
    if (!concert) throw new NotFoundException('Concert not found');
    return concert;
  }

  async update(id: string, dto: UpdateConcertDto): Promise<Concert> {
    const updated = await this.concertModel.findByIdAndUpdate(id, { $set: { ...dto } }, { new: true }).lean();
    if (!updated) throw new NotFoundException('Concert not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.concertModel.deleteOne({ _id: id });
    if (res.deletedCount === 0) throw new NotFoundException('Concert not found');
  }
}
