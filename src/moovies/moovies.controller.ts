import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { MooviesService } from './moovies.service';
import { ApiTags } from '@nestjs/swagger';
import { Moovies } from './moovies.schemas';
import { PaginationDTO } from './dtos/pagination.dto';
import {
  AddMoovieRequestDTO,
  DeleteMoovieResponseDTO,
} from './dtos/moovies.dto';
import { Mapper } from '@automapper/core';
import { FilterMoovies } from './types';

@Controller('moovies')
@ApiTags('moovies')
export class MooviesController {
  constructor(private readonly mooviesService: MooviesService) {}

  @Get('list')
  async listMoovies(
    @Query() paginationDTO?: PaginationDTO,
  ): Promise<FilterMoovies> {
    const { mooviesService } = this;

    const moovies = await mooviesService.listMoovies({ paginationDTO });
    return moovies;
  }

  @Post('add')
  async addMoovie(
    @Body() addMoovieRequestDTO: AddMoovieRequestDTO,
  ): Promise<Moovies> {
    const { mooviesService } = this;

    const moovies = await mooviesService.addMoovie({ addMoovieRequestDTO });
    return moovies;
  }

  @Patch(':moovieId/update')
  async updateMoovie(
    @Param('moovieId') moovieId: string,
    @Body() updateMoovieRequestDTO: AddMoovieRequestDTO,
  ): Promise<Moovies> {
    const { mooviesService } = this;

    const moovies = await mooviesService.updateMoovie({
      updateMoovieRequestDTO,
      moovieId,
    });
    return moovies;
  }

  @Delete(':moovieId/delete')
  async deleteMoovie(
    @Param('moovieId') moovieId: string,
  ): Promise<DeleteMoovieResponseDTO> {
    const { mooviesService } = this;

    const moovies = await mooviesService.delete({
      moovieId,
    });
    return moovies;
  }
}
