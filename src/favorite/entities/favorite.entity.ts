
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Game, game => game.favorites, { onDelete: 'CASCADE' })
  game: Game;

  @CreateDateColumn()
  createdAt: Date;
}
