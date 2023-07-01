import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@Controller('agents/roles')
@ApiTags('agents')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('count')
  async countByAgent() {
    return await this.rolesService.countByAgent();
  }
}
