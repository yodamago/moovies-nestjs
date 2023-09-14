import { MiddlewareConsumer, Module } from '@nestjs/common';

import { Genre, GenreSchema } from './genre.schema';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreController } from './genre.controller';
import { MooviesRepository } from 'src/moovies/moovies.repository';
import { MooviesService } from 'src/moovies/moovies.service';
import { MooviesModule } from 'src/moovies/moovies.module';
import { Moovies, MooviesSchema } from 'src/moovies/moovies.schemas';
import { RequestLoggerMiddleware } from 'src/request-logger/request-logger.middleware';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: Moovies.name, schema: MooviesSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository, MooviesRepository, MooviesService],
  exports: [GenreService, GenreRepository],
})
export class GenreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
