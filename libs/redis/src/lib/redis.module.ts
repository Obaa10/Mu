import { Module } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRoot({
      closeClient: true,
      commonOptions: { db: +(process.env['REDIS_DB'] || 0) },
      config: {
        host: process.env['REDIS_HOST'] || 'localhost',
        port: +(process.env['REDIS_PORT'] || 6379),
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class HelperRedisModule { }
