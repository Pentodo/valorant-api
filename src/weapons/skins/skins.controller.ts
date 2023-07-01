import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkinsService } from './skins.service';

@Controller('weapons/skins')
@ApiTags('weapons')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}
}
