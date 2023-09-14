import { Module } from '@nestjs/common';
import { Moovies, MooviesSchema } from './moovies.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { MooviesController } from './moovies.controller';
import { MooviesService } from './moovies.service';
import { MooviesRepository } from './moovies.repository';
import { GenreModule } from 'src/genre/genre.module';
@Module({
  imports: [
    GenreModule,
    MongooseModule.forFeature([{ name: Moovies.name, schema: MooviesSchema }]),
  ],
  controllers: [MooviesController],
  providers: [MooviesService, MooviesRepository],
  exports: [MooviesRepository, MooviesService],
})
export class MooviesModule {}
