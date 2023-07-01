import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class PaginatedDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  take: number;
}

export class NonNestedStringFilterDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  equals?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contains?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  in?: string[];
}

export class NestedStringFilterDTO extends NonNestedStringFilterDTO {
  @ApiPropertyOptional({ type: NonNestedStringFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedStringFilterDTO)
  not?: NonNestedStringFilterDTO;
}

export enum StringFilterDTOQueryMode {
  default = 'default',
  insensitive = 'insensitive',
}

export class StringFilterDTO extends NestedStringFilterDTO {
  @ApiPropertyOptional({ enum: StringFilterDTOQueryMode })
  @IsOptional()
  @IsEnum(StringFilterDTOQueryMode)
  mode?: StringFilterDTOQueryMode;
}
