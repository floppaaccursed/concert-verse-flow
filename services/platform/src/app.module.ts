import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { AppConfig } from './config/config';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_URI || 'mongodb://localhost:27017/platform' }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60 * 1000, limit: 100 }]),
    HealthModule,
    ConcertsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
