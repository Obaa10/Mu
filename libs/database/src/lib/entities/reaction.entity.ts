import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';
import { ReactionType } from '../enums/reaction-type.enum';

@Entity('reaction')
export class ReactionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', enum: ReactionType })
    type!: ReactionType;

    @Column()
    postId!: number;

    @OneToOne(() => PostEntity, (post: PostEntity) => post.id)
    post!: PostEntity

    @Column()
    createById!: number;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
    createdBy!: UserEntity
}
