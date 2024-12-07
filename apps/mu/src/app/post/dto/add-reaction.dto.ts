import { IsEnum } from 'class-validator';
import { ReactionType } from '@mu/database/lib/enums/reaction-type.enum';
export class AddReactionDto {
    @IsEnum(ReactionType)
    type!: ReactionType;
}