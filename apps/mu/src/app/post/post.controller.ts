import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt.guard';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { User } from '../auth/decorators/session.decorator';
import { AddCommentDto } from './dto/add-comment.dto';
import { AddReactionDto } from './dto/add-reaction.dto';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    createPost(@Body() createPostDto: CreatePostDto, @User() user: JwtPayload) {
        return this.postService.createPost(createPostDto, user.userId);
    }

    @Get(':id')
    getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @Post(':id/comment')
    addComment(
        @Param('id') postId: number,
        @Body() addCommentDto: AddCommentDto,
        @User() user: JwtPayload
    ) {
        return this.postService.addComment(postId, addCommentDto, user.userId);
    }

    @Post(':id/reaction')
    addReaction(
        @Param('id') postId: number,
        @Body() addReactionDto: AddReactionDto,
        @User() user: JwtPayload
    ) {
        return this.postService.addReaction(postId, addReactionDto, user.userId);
    }
}