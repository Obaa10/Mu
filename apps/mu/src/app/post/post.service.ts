import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { AddReactionDto } from './dto/add-reaction.dto';
import { PostEntity } from '@mu/database/lib/entities/post.entity';
import { CommentEntity } from '@mu/database/lib/entities/comment.entity';
import { ReactionEntity } from '@mu/database/lib/entities/reaction.entity';

@Injectable()
export class PostService {
  private readonly COMMENT_RATE_LIMIT = 60 * 1000; // 1 minute
  private readonly REACTION_RATE_LIMIT = 30 * 1000; // 30 seconds

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ReactionEntity)
    private readonly reactionRepository: Repository<ReactionEntity>
  ) { }

  async createPost(createPostDto: CreatePostDto, userId: number): Promise<PostEntity> {
    const post = this.postRepository.create({ ...createPostDto, createById: userId });
    return this.postRepository.save(post);
  }

  async getPostById(id: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'reactions', 'createdBy'],
    });
  }

  async addComment(postId: number, addCommentDto: AddCommentDto, userId: number): Promise<CommentEntity> {
    const lastComment = await this.commentRepository.findOne({
      where: { createById: userId },
      order: { id: 'DESC' },
    });

    if (lastComment && Date.now() - new Date(lastComment.createdAt).getTime() < this.COMMENT_RATE_LIMIT) {
      throw new ForbiddenException('You are commenting too frequently. Please wait a while.');
    }

    const comment = this.commentRepository.create({ ...addCommentDto, postId, createById: userId });
    return this.commentRepository.save(comment);
  }

  async addReaction(postId: number, addReactionDto: AddReactionDto, userId: number): Promise<ReactionEntity> {
    const lastReaction = await this.reactionRepository.findOne({
      where: { createById: userId },
      order: { id: 'DESC' },
    });

    if (lastReaction && Date.now() - new Date(lastReaction.createdAt).getTime() < this.REACTION_RATE_LIMIT) {
      throw new ForbiddenException('You are reacting too frequently. Please wait a while.');
    }

    const reaction = this.reactionRepository.create({ ...addReactionDto, postId, createById: userId });
    return this.reactionRepository.save(reaction);
  }
}