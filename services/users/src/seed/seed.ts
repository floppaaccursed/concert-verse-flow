import 'dotenv/config';
import mongoose from 'mongoose';
import { User, UserSchema, UserRole } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

async function run() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/users';
  await mongoose.connect(mongoUri);
  const UserModel = mongoose.model<User>('User', UserSchema);

  await UserModel.deleteMany({});

  const users = [
    { email: 'admin@example.com', password: 'AdminPass123!', role: UserRole.ADMIN, favoriteGenres: ['rock', 'jazz'] },
    { email: 'bob@example.com', password: 'UserPass123!', role: UserRole.USER, favoriteGenres: ['pop'] },
    { email: 'alice@example.com', password: 'UserPass123!', role: UserRole.USER, favoriteGenres: ['classical', 'rock'] }
  ];

  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await UserModel.create({ email: u.email, passwordHash, role: u.role, favoriteGenres: u.favoriteGenres });
  }

  // eslint-disable-next-line no-console
  console.log('Seeded users');
  await mongoose.disconnect();
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
