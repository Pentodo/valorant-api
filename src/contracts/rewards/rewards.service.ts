import { Injectable } from '@nestjs/common';
import { ContractType, RewardType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async sumExpByContractType(contractType: ContractType) {
    const rewards = await this.prismaService.contractReward.groupBy({
      by: ['type'],
      where: { contract: { type: contractType } },
      orderBy: { type: 'desc' },
      _count: { _all: true },
      _sum: { xp: true },
    });

    return rewards.map((reward) => ({
      type: reward.type,
      xp: reward._sum.xp,
      given: reward._count._all,
    }));
  }

  async count(rewardTypes: RewardType[]) {
    const rewards = await this.prismaService.contractReward.groupBy({
      by: ['type'],
      orderBy: { type: 'desc' },
      where: { type: { in: rewardTypes } },
      _count: { _all: true },
    });

    return rewards.map((reward) => ({
      type: reward.type,
      gived: reward._count._all,
    }));
  }
}
