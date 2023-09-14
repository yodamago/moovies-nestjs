import { Module } from '@nestjs/common';

import { Genre, GenreSchema } from './genre.schema';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreController } from './genre.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
  exports: [GenreService, GenreRepository],
})
export class GenreModule {}
