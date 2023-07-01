import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { RolesModule } from './roles/roles.module';

@Module({
  providers: [AgentsService],
  controllers: [AgentsController],
  imports: [RolesModule]
})
export class AgentsModule {}
