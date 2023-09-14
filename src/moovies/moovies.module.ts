import { Module } from '@nestjs/common';
import { Moovies, MooviesSchema } from './moovies.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { MooviesController } from './moovies.controller';
import { MooviesService } from './moovies.service';
import { MooviesRepository } from './moovies.repository';
import { Genre, GenreSchema } from './genre.schema';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Moovies.name, schema: MooviesSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [MooviesController],
  providers: [MooviesService, MooviesRepository, GenreService, GenreRepository],
})
export class MooviesModule {}
