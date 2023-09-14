// import { ApiProperty } from "@nestjs/swagger";
// import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Moovies } from '../moovies.schemas';
import { IsArray, IsDateString, IsDefined, IsString } from 'class-validator';

export class FilterMooviesResponseDTO {
  moovies: Array<Moovies>;
  total: number;
}

export class AddMoovieRequestDTO {
  @ApiProperty({
    description: 'Title of the moovie',
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the moovie',
  })
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Release Date of the moovie',
  })
  @IsDefined()
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({
    description: 'Genres of moovie',
    example: ['Comedy', 'Action'],
  })
  @IsDefined()
  @IsArray()
  genre: string[];
}

export class UpdateMoovieRequestDTO {
  @ApiProperty({
    description: 'Title of the moovie',
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the moovie',
  })
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Release Date of the moovie',
  })
  @IsDefined()
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({
    description: 'Genres of moovie',
    example: ['comedy', 'action'],
  })
  @IsDefined()
  @IsArray()
  genre: string[];
}

export class DeleteMoovieResponseDTO {
  moovieId: string;
  deleted: boolean;
  schema: string;
}
