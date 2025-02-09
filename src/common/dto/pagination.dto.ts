import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number) // converte para um numero
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // converte para um numero
  offset: number;
}
