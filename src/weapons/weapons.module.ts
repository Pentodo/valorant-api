import { Module } from '@nestjs/common';
import { SkinsModule } from './skins/skins.module';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

@Module({
  imports: [SkinsModule],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
