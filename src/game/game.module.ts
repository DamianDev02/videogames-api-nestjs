import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game
    ])
  ],
  controllers: [GameController],
  providers: [GameService, CloudinaryService],
})
export class GameModule { }
