import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAllGenres();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Genre> {
    return this.genreService.findGenreById(id);
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.createGenre(createGenreDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreService.updateGenre(id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Genre> {
    return this.genreService.deleteGenre(id);
  }

  @Get('name/:name')
  findGenreByName(@Param('name') name: string): Promise<Genre[]> {
    return this.genreService.findGenreByname(name);
  }
}
