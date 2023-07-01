import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';

@Module({
  providers: [SkinsService],
  controllers: [SkinsController]
})
export class SkinsModule {}
