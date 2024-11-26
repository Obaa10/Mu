import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@mu/database/index';
import { ConfigModule } from '@nestjs/config';
import { HelperRedisModule } from '@mu/redis/*';

@Module({
  imports: [
    UserModule, AuthModule, PostModule, DatabaseModule, HelperRedisModule, ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
