import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    type: Number,
    default: 20,
    description: 'limit (num of paged data)',
    required: false,
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    type: Number,
    default: 0,
    description: 'offset (num of data offset)',
    required: false,
  })
  @IsOptional()
  offset?: number;
}
