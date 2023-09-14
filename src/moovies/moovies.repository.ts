import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moovies } from './moovies.schemas';
import { PaginationDTO } from './dtos/pagination.dto';
import { PipelineStage } from 'mongoose';
import { FilterMoovies } from './types';
import {
  AddMoovieRequestDTO,
  UpdateMoovieRequestDTO,
} from './dtos/moovies.dto';

@Injectable()
export class MooviesRepository {
  constructor(
    @InjectModel(Moovies.name) private MooviesModel: Model<Moovies>,
  ) {}

  async listMoovies(pagination: PaginationDTO): Promise<FilterMoovies> {
    const { MooviesModel } = this;

    const pipeline: PipelineStage[] = [
      {
        $facet: {
          data: [
            { $skip: Number(pagination.offset) },
            { $limit: Number(pagination.limit) },
          ],
          count: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          data: 1,
          count: {
            $arrayElemAt: ['$count.count', 0],
          },
        },
      },
    ];

    const [result]: FilterMoovies[] =
      await MooviesModel.aggregate<FilterMoovies>(pipeline).exec();

    return {
      data: result.data,
      count: result.count || 0,
    };
  }

  async addMoovie(addMoovieRequestDTO: AddMoovieRequestDTO): Promise<Moovies> {
    const { MooviesModel } = this;
    return (await MooviesModel.create(addMoovieRequestDTO)).toObject();
  }

  async getMoovieById(moovieId: string): Promise<Moovies> {
    const { MooviesModel } = this;
    return MooviesModel.findById(moovieId).lean().exec();
  }

  async updateMoovie(
    updateMoovieRequestDTO: UpdateMoovieRequestDTO,
    moovieId: string,
  ): Promise<Moovies> {
    const { MooviesModel } = this;
    return MooviesModel.findByIdAndUpdate(
      moovieId,
      {
        $set: {
          title: updateMoovieRequestDTO.title,
          description: updateMoovieRequestDTO.description,
          releaseDate: updateMoovieRequestDTO.releaseDate,
          genre: updateMoovieRequestDTO.genre,
        },
      },
      { new: true },
    )
      .lean()
      .exec();
  }

  async deleteMoovie(moovieId: string): Promise<void> {
    const { MooviesModel } = this;
    await MooviesModel.findByIdAndRemove(moovieId);
  }
}
