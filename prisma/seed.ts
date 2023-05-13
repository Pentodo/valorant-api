import { AbilitySlot, Prisma, PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface AgentData {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  displayIcon: string;
  fullPortrait: string;
  killfeedPortrait: string;
  backgroundGradientColors: string[];
  isPlayableCharacter: boolean;
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: [
    {
      slot: AbilitySlot;
      displayName: string;
      description: string;
      displayIcon: string;
    },
  ];
  voiceLine: { mediaList: [{ wave: string }] };
}

interface AgentResponse {
  status: number;
  data: AgentData[];
}

(async () => {
  const agentsInput: Prisma.AgentCreateInput[] = [];
  const agentsResponse = await axios.get<AgentResponse>(
    'https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true',
  );

  for (let i = 0; i < agentsResponse.data.data.length; i++) {
    const agent = agentsResponse.data.data[i];

    const abilities: Prisma.AgentAbilityCreateManyAgentInput[] =
      agent.abilities.map((ability) => {
        return {
          slot: ability.slot,
          displayName: ability.displayName,
          description: ability.description,
          displayIcon: ability.displayIcon,
        };
      });
    const colors: Prisma.AgentColorCreateManyAgentInput[] =
      agent.backgroundGradientColors.map((color) => {
        return { color };
      });

    agentsInput.push({
      uuid: agent.uuid,
      displayName: agent.displayName,
      description: agent.description,
      developerName: agent.developerName,
      displayIcon: agent.displayIcon,
      fullPortrait: agent.fullPortrait,
      killfeedPortrait: agent.killfeedPortrait,
      voiceLine: agent.voiceLine.mediaList[0].wave,
      role: {
        connectOrCreate: {
          where: { uuid: agent.role.uuid },
          create: {
            uuid: agent.role.uuid,
            displayName: agent.role.displayName,
            description: agent.role.description,
            displayIcon: agent.role.displayIcon,
          },
        },
      },
      abilities: {
        createMany: {
          data: abilities,
          skipDuplicates: true,
        },
      },
      colors: {
        createMany: {
          data: colors,
          skipDuplicates: true,
        },
      },
    });
  }

  await Promise.allSettled(
    agentsInput.map((data) => prisma.agent.create({ data })),
  );
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
