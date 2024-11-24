import { Module } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      closeClient: true,
      commonOptions: { db: +(process.env['REDIS_DB'] || 2) },
      config: {
        host: process.env['REDIS_HOST'] || 'localhost',
        port: +(process.env['REDIS_PORT'] || 6379),
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class HelperRedisModule { }
