import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { WeaponName } from './weapons.interface';

export class WeaponNamesQueryDTO {
  @ApiPropertyOptional({ enum: WeaponName, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(WeaponName, { each: true })
  @Transform(({ value }) =>
    value ? (Array.isArray(value) ? value : [value]) : undefined,
  )
  displayNames?: WeaponName[];
}
