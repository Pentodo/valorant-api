import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContractType, RewardType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class ContractTypeQueryDTO {
  @ApiProperty({ enum: ContractType })
  @IsNotEmpty()
  @IsEnum(ContractType)
  contractType: ContractType;
}

export class RewardTypeQueryDTO {
  @ApiPropertyOptional({ enum: RewardType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(RewardType, { each: true })
  @Transform(({ value }) =>
    value ? (Array.isArray(value) ? value : [value]) : undefined,
  )
  rewardTypes?: RewardType[];
}
