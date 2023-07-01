import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DisplayNamesQueryDTO } from './weapons.dto';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
@ApiTags('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('count/skins')
  async countSkin(@Query() query: DisplayNamesQueryDTO) {
    return await this.weaponsService.countSkin(query.displayNames);
  }

  @Get('count/skins/category')
  async countSkinGroupedByCategory(@Query() query: DisplayNamesQueryDTO) {
    return await this.weaponsService.countSkinGroupedByCategory(
      query.displayNames,
    );
  }
}
