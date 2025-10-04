import 'dotenv/config';
import mongoose from 'mongoose';
import { Concert, ConcertSchema } from '../concerts/schemas/concert.schema';

async function run() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/platform';
  await mongoose.connect(mongoUri);
  const ConcertModel = mongoose.model<Concert>('Concert', ConcertSchema);

  await ConcertModel.deleteMany({});

  const concerts: Partial<Concert>[] = [
    { title: 'Rock Night', genres: ['rock'], venue: { name: 'Stadium A', city: 'Berlin', country: 'DE' }, date: new Date(), availableTickets: 200 },
    { title: 'Jazz Evening', genres: ['jazz'], venue: { name: 'Club B', city: 'Paris', country: 'FR' }, date: new Date(Date.now() + 86400000), availableTickets: 80 },
    { title: 'Pop Fiesta', genres: ['pop'], venue: { name: 'Arena C', city: 'Madrid', country: 'ES' }, date: new Date(Date.now() + 2*86400000), availableTickets: 300 },
    { title: 'Classical Gala', genres: ['classical'], venue: { name: 'Hall D', city: 'Vienna', country: 'AT' }, date: new Date(Date.now() + 3*86400000), availableTickets: 120 }
  ];

  await ConcertModel.insertMany(concerts);
  // eslint-disable-next-line no-console
  console.log('Seeded platform concerts');
  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
