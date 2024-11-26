import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';


@Injectable()
export class RedisService {
  constructor(
    @InjectRedis() private readonly redisService: Redis,
  ) { }

  async saveVerificationCode(email: string, otp: string): Promise<void> {
    const key = `verification_code:${email}`;
    const ttl = 60 * 60;

    const existingOtp = await this.redisService.get(key);
    if (existingOtp) {
      throw new BadRequestException('A verification code has already been sent. Please wait for it to expire.');
    }
    await this.redisService.set(key, otp, 'EX', ttl);
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const key = `verification_code:${email}`;
    const storedOtp = await this.redisService.get(key);
    if (!storedOtp) {
      throw new NotFoundException('Verification code not found or has expired.');
    }
    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid verification code.');
    }

    await this.redisService.del(key);
  }

}