import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createGame(
    @Body() createGameDto: CreateGameDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.gameService.createGame(createGameDto, file);
  }

  @Get()
  findAll() {
    return this.gameService.findAllGames();
  }
}
