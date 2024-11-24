import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('comment')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column()
    postId!: number;

    @OneToOne(() => PostEntity, (post: PostEntity) => post.id)
    post!: PostEntity

    @Column()
    createById!: number;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
    createdBy!: UserEntity
}
