import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractTypeQueryDTO, RewardTypeQueryDTO } from './rewards.dto';
import { RewardsService } from './rewards.service';

@Controller('contracts/rewards')
@ApiTags('contracts')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('sum/xp')
  async sumXPByContractType(@Query() query: ContractTypeQueryDTO) {
    return await this.rewardsService.sumExpByContractType(query.contractType);
  }

  @Get('count/type')
  async countByType(@Query() query: RewardTypeQueryDTO) {
    return await this.rewardsService.count(query.rewardTypes);
  }
}
