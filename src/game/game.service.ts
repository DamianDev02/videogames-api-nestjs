import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GenericService } from '../common/services/base.service';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class GameService extends GenericService<Game> {
  constructor(@InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly cloudinaryService: CloudinaryService) {
    super(gameRepository);
  }

  async createGame(createGameDto: CreateGameDto, file: Express.Multer.File): Promise<Game> {
    const imageUrl = await this.cloudinaryService.uploadFile(file);
    const newGame = {...createGameDto, imageUrl: imageUrl.secure_url };
    return this.gameRepository.save(newGame);
  }

  async findAllGames(): Promise<Game[]> {
    return super.findAll();
  }

  async findGameById(id: string): Promise<Game> {
    return await super.findOne(id);
  }

  async findByName(title: string): Promise<Game> {
    return this.gameRepository.findOne({ where: { title } });
  }


}
