import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkinsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPaginated(
    skip: number,
    take: number,
    include: Prisma.WeaponSkinInclude,
    where: Prisma.WeaponSkinWhereInput,
  ) {
    const [total, content] = await this.prismaService.$transaction([
      this.prismaService.weaponSkin.aggregate({
        where,
        _count: true,
      }),
      this.prismaService.weaponSkin.findMany({
        skip,
        take,
        include,
        where,
      }),
    ]);

    return { total: total._count, content };
  }
}
