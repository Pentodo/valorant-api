import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedWeaponSkinsBodyDTO } from './skins.dto';
import { SkinsService } from './skins.service';

@Controller('weapons/skins')
@ApiTags('weapons')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @Post('paginated')
  async postForPaginated(@Body() body: PaginatedWeaponSkinsBodyDTO) {
    return await this.skinsService.getPaginated(
      body.skip,
      body.take,
      body.include,
      body.where,
    );
  }
}
