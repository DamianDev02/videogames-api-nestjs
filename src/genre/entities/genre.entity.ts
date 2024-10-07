import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Game, game => game.genres)
  games: Game[];
}
