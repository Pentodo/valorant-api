import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async countByAgent() {
    const roles = await this.prismaService.agentRole.findMany({
      select: { displayName: true, _count: true },
    });

    return roles.map((role) => ({
      role: role.displayName,
      agents: role._count.agents,
    }));
  }
}
