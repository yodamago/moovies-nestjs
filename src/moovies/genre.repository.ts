import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genre.schema';

@Injectable()
export class GenreRepository {
  constructor(@InjectModel(Genre.name) private GenreModel: Model<Genre>) {}

  async addGenre(name: string): Promise<Genre> {
    const { GenreModel } = this;
    return (await GenreModel.create({ name })).toObject();
  }

  async getGenreByName(name: string): Promise<Genre> {
    const { GenreModel } = this;
    return GenreModel.findOne({ name }).lean().exec();
  }

  async getGenreListByName(genres: string[]): Promise<Genre[]> {
    const { GenreModel } = this;
    return GenreModel.find({ name: { $in: genres } })
      .lean()
      .exec();
  }
}
