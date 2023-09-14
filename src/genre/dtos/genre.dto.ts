import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AddGenreRequestDto {
  @ApiProperty({
    description: 'Name of the genre',
  })
  @IsDefined()
  @IsString()
  name: string;
}

export class DeleteGenreResponseDTO {
  name: string;
  deleted: boolean;
  schema: string;
}

export class DeleteGenreRequestDTO {
  @ApiProperty({
    description: 'Name of the genre',
  })
  @IsDefined()
  @IsString()
  name: string;
}
