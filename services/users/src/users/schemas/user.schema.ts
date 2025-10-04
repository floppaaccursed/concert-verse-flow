import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Schema({ timestamps: true })
export class User {
  _id!: Types.ObjectId;
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: [String], default: [] })
  favoriteGenres: string[];

  @Prop({ type: String, enum: Object.values(UserRole), default: UserRole.USER })
  role: UserRole;

  @Prop({ type: [String], default: [] })
  refreshTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
