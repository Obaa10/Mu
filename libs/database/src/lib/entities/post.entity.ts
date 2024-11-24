import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ReactionEntity } from './reaction.entity';

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column()
    createById!: number;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
    createdBy!: UserEntity

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post)
    comments?: CommentEntity[]

    @OneToMany(() => ReactionEntity, (reaction: ReactionEntity) => reaction.post)
    reactions?: ReactionEntity[]
}
