import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [
    PrismaModule,
    WeaponsModule,
  ],
})
export class AppModule {}
