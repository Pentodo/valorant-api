import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedWeaponsBodyDTO, WeaponNamesQueryDTO } from './weapons.dto';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
@ApiTags('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('count/skins')
  async countSkin(@Query() query: WeaponNamesQueryDTO) {
    return await this.weaponsService.countSkin(query.displayNames);
  }

  @Get('count/skins/category')
  async countSkinGroupedByCategory(@Query() query: WeaponNamesQueryDTO) {
    return await this.weaponsService.countSkinGroupedByCategory(
      query.displayNames,
    );
  }

  @Post('paginated')
  async postForPaginated(@Body() body: PaginatedWeaponsBodyDTO) {
    return await this.weaponsService.getPaginated(
      body.skip,
      body.take,
      body.include,
      body.where,
    );
  }
}
