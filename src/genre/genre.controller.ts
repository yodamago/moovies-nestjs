import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags } from '@nestjs/swagger';
import { Genre } from './genre.schema';
import {
  AddGenreRequestDto,
  DeleteGenreRequestDTO,
  DeleteGenreResponseDTO,
} from './dtos/genre.dto';

@Controller('genre')
@ApiTags('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('list')
  async listGenres(): Promise<Genre[]> {
    const { genreService } = this;

    const genre = await genreService.listGenres();
    return genre;
  }

  @Post('add')
  async addMoovie(
    @Body() addGenreRequestDto: AddGenreRequestDto,
  ): Promise<Genre> {
    const { genreService } = this;

    const genre = await genreService.addGenre({
      name: addGenreRequestDto.name,
    });
    return genre;
  }

  @Delete('delete')
  async deleteMoovie(
    @Body() deleteGenreRequestDTO: DeleteGenreRequestDTO,
  ): Promise<DeleteGenreResponseDTO> {
    const { genreService } = this;

    const deletedGenre = await genreService.delete({
      deleteGenreRequestDTO,
    });
    return deletedGenre;
  }
}
