import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { CoModule } from './s/co/co.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CoModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
