import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserEntity } from '@mu/database/lib/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from '@mu/database/lib/entities/reaction.entity';
import { PostEntity } from '@mu/database/lib/entities/post.entity';
import { CommentEntity } from '@mu/database/lib/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity, ReactionEntity]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
