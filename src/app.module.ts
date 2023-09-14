import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MooviesModule } from './moovies/moovies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/moovies'),
    MooviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
