
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({type:'text'})
  description: string;

  @Column()
  releaseDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'float', nullable: true })
  rating: number; 

  @ManyToMany(() => Genre, genre => genre.games, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Favorite, favorite => favorite.game)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
