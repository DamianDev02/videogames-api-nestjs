import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenericService } from '../common/services/base.service';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService extends GenericService<Genre> {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {
    super(genreRepository);
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await super.create(createGenreDto);
  }

  async findAllGenres(): Promise<Genre[]> {
    return await super.findAll();
  }

  async findGenreById(id: string): Promise<Genre> {
    return await super.findOne(id);
  }

  async deleteGenre(id: string): Promise<Genre> {
    return await super.delete(id);
  }

  async updateGenre(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return await super.update(id, updateGenreDto);
  }

  async findGenreByname(name: string): Promise<Genre[]> {
    return await this.genreRepository.find({ where: { name } });
  }
}
