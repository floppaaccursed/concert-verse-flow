import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConcertDocument = HydratedDocument<Concert>;

@Schema({ timestamps: true })
export class Venue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);

@Schema({ timestamps: true })
export class Concert {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], index: true })
  genres: string[];

  @Prop({ type: VenueSchema, required: true })
  venue: Venue;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  availableTickets: number;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
