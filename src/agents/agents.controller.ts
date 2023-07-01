import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('agents')
@ApiTags('agents')
export class AgentsController {}
