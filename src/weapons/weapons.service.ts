import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponsService {
  constructor(private readonly prismaService: PrismaService) {}

  async countSkin(displayNames: string[]) {
    const weapons = await this.prismaService.weapon.findMany({
      include: { _count: true },
      where: { displayName: displayNames ? { in: displayNames } : undefined },
    });

    return weapons.map((weapon) => ({
      weapon: weapon.displayName,
      skins: weapon._count.skins,
    }));
  }

  async countSkinGroupedByCategory(displayNames: string[]) {
    const weapons = await this.prismaService.weapon.findMany({
      include: { _count: true },
      where: { displayName: displayNames ? { in: displayNames } : undefined },
    });

    const groups: Map<string, any[]> = new Map();

    weapons.map((weapon) => {
      const { category, ...rest } = weapon;

      const mappedWeapons = groups.get(category) || [];
      mappedWeapons.push(rest);

      groups.set(category, mappedWeapons);
    });

    return Array.from(groups.entries()).map((group) => ({
      category: group[0],
      weapons: group[1].map((weapon) => ({
        weapon: weapon.displayName,
        skins: weapon._count.skins,
      })),
    }));
  }
}
