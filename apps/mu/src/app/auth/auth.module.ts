import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@mu/database/lib/entities/user.entity';
import { UtilsModule } from '../util/util.module';
import { GardModule } from './strategy/gard.module';
import { RedisService } from '@mu/redis/*';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UtilsModule,
    GardModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisService],
})
export class AuthModule { }
