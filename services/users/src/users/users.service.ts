import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const created = await this.userModel.create({
      email: dto.email,
      passwordHash,
      favoriteGenres: dto.favoriteGenres || [],
    });
    return created.toObject();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user.toObject() : null;
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean();
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $push: { refreshTokens: token } });
  }

  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $pull: { refreshTokens: token } });
  }

  async setRole(userId: string, role: UserRole): Promise<void> {
    const res = await this.userModel.updateOne({ _id: userId }, { $set: { role } });
    if (res.matchedCount === 0) throw new NotFoundException('User not found');
  }
}
