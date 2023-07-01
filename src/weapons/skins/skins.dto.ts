import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PaginatedDTO, StringFilterDTO } from 'src/app.dto';
import { NonNestedWeaponWhereDTO } from '../weapons.dto';

export class WeaponSkinIncludeDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  weapon?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  tier?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  theme?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  reward?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  chromas?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  levels?: boolean;
}

export class WeaponSkinWhereDTO {
  @ApiPropertyOptional({ type: StringFilterDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StringFilterDTO)
  displayName?: StringFilterDTO;

  @ApiPropertyOptional({ type: NonNestedWeaponWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NonNestedWeaponWhereDTO)
  weapon?: NonNestedWeaponWhereDTO;
}

export class PaginatedWeaponSkinsBodyDTO extends PaginatedDTO {
  @ApiPropertyOptional({ type: WeaponSkinIncludeDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponSkinIncludeDTO)
  include?: WeaponSkinIncludeDTO;

  @ApiPropertyOptional({ type: WeaponSkinWhereDTO })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WeaponSkinWhereDTO)
  where?: WeaponSkinWhereDTO;
}
