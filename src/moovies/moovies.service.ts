import { Injectable } from '@nestjs/common';
import { MooviesRepository } from './moovies.repository';
import { Moovies } from './moovies.schemas';
import { PaginationDTO } from './dtos/pagination.dto';
import { FilterMoovies } from './types';
import {
  AddMoovieRequestDTO,
  DeleteMoovieResponseDTO,
  UpdateMoovieRequestDTO,
} from './dtos/moovies.dto';
import { Genre } from './genre.schema';
import { GenreService } from './genre.service';
@Injectable()
export class MooviesService {
  constructor(
    private readonly mooviesRepository: MooviesRepository,
    private readonly genreService: GenreService,
  ) {}

  async listMoovies({
    paginationDTO,
  }: {
    paginationDTO: PaginationDTO;
  }): Promise<FilterMoovies> {
    const { mooviesRepository } = this;
    const moovies = await mooviesRepository.listMoovies(paginationDTO);
    return moovies;
  }

  async addMoovie({
    addMoovieRequestDTO,
  }: {
    addMoovieRequestDTO: AddMoovieRequestDTO;
  }): Promise<Moovies> {
    const { mooviesRepository, genreService } = this;

    const { genre, ...rest } = addMoovieRequestDTO;
    const genres = await genreService.addBulkGenres(genre);

    const moovies = await mooviesRepository.addMoovie({
      ...rest,
      genre: genres,
    });

    return moovies;
  }

  async updateMoovie({
    updateMoovieRequestDTO,
    moovieId,
  }: {
    updateMoovieRequestDTO: UpdateMoovieRequestDTO;
    moovieId: string;
  }): Promise<Moovies> {
    const { mooviesRepository, genreService } = this;

    const { genre, ...rest } = updateMoovieRequestDTO;
    const genres = await genreService.addBulkGenres(genre);

    const moovies = await mooviesRepository.updateMoovie(
      {
        ...rest,
        genre: genres,
      },
      moovieId,
    );
    return moovies;
  }
  async delete({
    moovieId,
  }: {
    moovieId: string;
  }): Promise<DeleteMoovieResponseDTO> {
    const { mooviesRepository } = this;

    await mooviesRepository.deleteMoovie(moovieId);
    return {
      moovieId: moovieId,
      deleted: true,
    };
  }
}
