import { Favorite } from "../../favorite/entities/favorite.entity";
import { Role } from "../../common/enums/role.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column({ nullable: true })
    nickname: string

    @Column()
    age: number

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ select: false, nullable: false })
    password: string

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role;

    @OneToMany(() => Favorite, favorite => favorite.user, { cascade: true })
    favorites: Favorite[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
