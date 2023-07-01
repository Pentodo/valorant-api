import { Module } from '@nestjs/common';
import { AgentsModule } from './agents/agents.module';
import { ContractsModule } from './contracts/contracts.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [PrismaModule, ContractsModule, WeaponsModule, AgentsModule],
})
export class AppModule {}
