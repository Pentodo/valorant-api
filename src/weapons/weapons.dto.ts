import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { WeaponCategory } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PaginatedDTO, StringFilterDTO } from 'src/app.dto';
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

export class WeaponIncludeDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  skins?: boolean;
}

export class NonNestedWeaponCategoryFilterDTO {
  @ApiPropertyOptional({ enum: WeaponCategory })
  @IsOptional()
  @IsEnum(WeaponCategory)
  equals?: WeaponCategory;

  @ApiPropertyOptional({ enum: WeaponCategory, isArray: true })
  @IsOptional()
  @IsEnum(WeaponCategory, { each: true })
  in?: WeaponCategory[];
}

export class WeaponCategoryFilterDTO extends NonNestedWeaponCategoryFilterDTO {
  @ApiPropertyOptional({ type: NonNestedWeaponCategoryFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedWeaponCategoryFilterDTO)
  not?: NonNestedWeaponCategoryFilterDTO;
}

export class NonNestedWeaponSkinWhereDTO {
  @ApiPropertyOptional({ type: StringFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StringFilterDTO)
  displayName?: StringFilterDTO;
}

export class WeaponSkinRelationFilterDTO {
  @ApiPropertyOptional({ type: NonNestedWeaponSkinWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedWeaponSkinWhereDTO)
  every?: NonNestedWeaponSkinWhereDTO;

  @ApiPropertyOptional({ type: NonNestedWeaponSkinWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedWeaponSkinWhereDTO)
  some?: NonNestedWeaponSkinWhereDTO;

  @ApiPropertyOptional({ type: NonNestedWeaponSkinWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedWeaponSkinWhereDTO)
  none?: NonNestedWeaponSkinWhereDTO;
}

export class WeaponWhereDTO {
  @ApiPropertyOptional({ type: StringFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StringFilterDTO)
  displayName?: StringFilterDTO;

  @ApiPropertyOptional({ type: WeaponCategoryFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponCategoryFilterDTO)
  category?: WeaponCategoryFilterDTO;

  @ApiPropertyOptional({ type: WeaponSkinRelationFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponSkinRelationFilterDTO)
  skins?: WeaponSkinRelationFilterDTO;
}

export class NonNestedWeaponWhereDTO extends OmitType(WeaponWhereDTO, [
  'skins',
]) {}

export class PaginatedWeaponsBodyDTO extends PaginatedDTO {
  @ApiPropertyOptional({ type: WeaponIncludeDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponIncludeDTO)
  include?: WeaponIncludeDTO;

  @ApiPropertyOptional({ type: WeaponWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponWhereDTO)
  where?: WeaponWhereDTO;
}
