import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeaponName } from './weapons.interface';

@Injectable()
export class WeaponsService {
  constructor(private readonly prismaService: PrismaService) {}

  async countSkin(displayNames: WeaponName[]) {
    const weapons = await this.prismaService.weapon.findMany({
      include: { _count: true },
      where: { displayName: { in: displayNames } },
    });

    return weapons.map((weapon) => ({
      weapon: weapon.displayName,
      skins: weapon._count.skins,
    }));
  }

  async countSkinGroupedByCategory(displayNames: WeaponName[]) {
    const weapons = await this.prismaService.weapon.findMany({
      include: { _count: true },
      where: { displayName: { in: displayNames } },
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

  async getPaginated(
    skip: number,
    take: number,
    include: Prisma.WeaponInclude,
    where: Prisma.WeaponWhereInput,
  ) {
    const [total, content] = await this.prismaService.$transaction([
      this.prismaService.weapon.aggregate({
        where,
        _count: true,
      }),
      this.prismaService.weapon.findMany({
        skip,
        take,
        include,
        where,
      }),
    ]);

    return { total: total._count, content };
  }
}
