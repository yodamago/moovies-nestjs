import { Injectable } from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { Genre } from './genre.schema';
import { difference } from 'ramda';
import {
  DeleteGenreRequestDTO,
  DeleteGenreResponseDTO,
} from './dtos/genre.dto';
import { MooviesRepository } from 'src/moovies/moovies.repository';

@Injectable()
export class GenreService {
  constructor(
    private readonly genreRepository: GenreRepository,
    private readonly moovieRepository: MooviesRepository,
    ) {}

  async addGenre({ name }: { name: string }): Promise<Genre> {
    const { genreRepository } = this;

    const isExist = await genreRepository.getGenreByName(name);
    if (isExist) return isExist;
    await genreRepository.addGenre(name);
  }

  async addBulkGenres(genres: string[]): Promise<string[]> {
    const { genreRepository } = this;
    const validGenres = this.genreListValidator(genres);
    const existGenreList = (
      await genreRepository.getGenreListByName(validGenres)
    ).map((e) => e.name);
    const promises = [];
    const newGenres = difference(validGenres, existGenreList);
    newGenres.forEach((genre) => {
      promises.push(genreRepository.addGenre(genre));
    });
    await Promise.all(promises);
    return validGenres;
  }

  genreListValidator(genres: string[]): string[] {
    const lowerCasedGenres = genres.map((e) => e.toLowerCase());
    const uniqueGenres = [...new Set(lowerCasedGenres)];
    return uniqueGenres;
  }

  async listGenres(): Promise<Genre[]> {
    const { genreRepository } = this;
    return await genreRepository.listGenres();
  }
  async delete({
    deleteGenreRequestDTO,
  }: {
    deleteGenreRequestDTO: DeleteGenreRequestDTO;
  }): Promise<DeleteGenreResponseDTO> {
    const { genreRepository } = this;
    await genreRepository.delete(deleteGenreRequestDTO.name);
    return {
      name: deleteGenreRequestDTO.name,
      schema: Genre.name,
      deleted: true,
    };
  }
}
