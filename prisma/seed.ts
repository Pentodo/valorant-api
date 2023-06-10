import {
  AbilitySlot,
  Prisma,
  PrismaClient,
  WeaponCategory,
} from '@prisma/client';
import axios from 'axios';
import {
  AgentResponse,
  ContentTierResponse,
  CurrencyResponse,
  EpisodeResponse,
  EventResponse,
  ThemeResponse,
  WeaponResponse,
} from './seed.interface';

const prisma = new PrismaClient();

(async () => {
  const agentsInput: Prisma.AgentCreateInput[] = [];
  const agentsResponse = await axios.get<AgentResponse>(
    'https://valorant-api.com/v1/agents?isPlayableCharacter=true',
  );

  agentsResponse.data.data.forEach((agent) => {
    const abilities: Prisma.AgentAbilityCreateManyAgentInput[] = [];
    agent.abilities.forEach((ability) => {
      abilities.push({
        slot: AbilitySlot[ability.slot],
        displayName: ability.displayName,
        description: ability.description,
        displayIcon: ability.displayIcon,
      });
    });

    const colors: Prisma.AgentColorCreateManyAgentInput[] = [];
    agent.backgroundGradientColors.forEach((color) => {
      colors.push({ color });
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
  });

  await Promise.allSettled(
    agentsInput.map((data) => prisma.agent.create({ data })),
  );

  const contentTiersInput: Prisma.ContentTierCreateManyInput[] = [];
  const contentTiersResponse = await axios.get<ContentTierResponse>(
    'https://valorant-api.com/v1/contenttiers',
  );

  contentTiersResponse.data.data.forEach((contentTier) => {
    contentTiersInput.push({
      uuid: contentTier.uuid,
      displayName: contentTier.displayIcon,
      developerName: contentTier.devName,
      displayIcon: contentTier.displayIcon,
      rank: contentTier.rank,
      color: contentTier.highlightColor,
    });
  });

  await prisma.contentTier.createMany({
    data: contentTiersInput,
    skipDuplicates: true,
  });

  const themesInput: Prisma.ThemeCreateManyInput[] = [];
  const themesResponse = await axios.get<ThemeResponse>(
    'https://valorant-api.com/v1/themes',
  );

  themesResponse.data.data.forEach((contentTier) => {
    themesInput.push({
      uuid: contentTier.uuid,
      displayName: contentTier.displayName,
    });
  });

  await prisma.theme.createMany({
    data: themesInput,
    skipDuplicates: true,
  });

  const skinsInput: Prisma.WeaponSkinCreateInput[] = [];
  const weaponsResponse = await axios.get<WeaponResponse>(
    'https://valorant-api.com/v1/weapons',
  );

  weaponsResponse.data.data.forEach((weapon) => {
    weapon.skins.forEach((skin) => {
      const chromas: Prisma.WeaponSkinChromaCreateManySkinInput[] = [];
      skin.chromas.forEach((chroma) => {
        chromas.push({
          uuid: chroma.uuid,
          displayName: chroma.displayName,
          displayIcon: chroma.displayIcon,
          color: chroma.swatch,
          video: chroma.streamedVideo,
        });
      });

      const levels: Prisma.WeaponSkinLevelCreateManySkinInput[] = [];
      skin.levels.forEach((chroma) => {
        levels.push({
          uuid: chroma.uuid,
          displayName: chroma.displayName,
          displayIcon: chroma.displayIcon,
          type: chroma.levelItem,
          video: chroma.streamedVideo,
        });
      });

      skinsInput.push({
        uuid: skin.uuid,
        displayName: skin.displayName,
        displayIcon: skin.displayIcon,
        wallpaper: skin.wallpaper,
        theme: { connect: { uuid: skin.themeUuid } },
        tier: { connect: { uuid: skin.contentTierUuid } },
        weapon: {
          connectOrCreate: {
            where: { uuid: weapon.uuid },
            create: {
              uuid: weapon.uuid,
              displayName: weapon.displayName,
              displayIcon: weapon.displayIcon,
              killStreamIcon: weapon.killStreamIcon,
              category: WeaponCategory[weapon.category.split('::')[1]],
            },
          },
        },
        chromas: {
          createMany: {
            data: chromas,
            skipDuplicates: true,
          },
        },
        levels: {
          createMany: {
            data: levels,
            skipDuplicates: true,
          },
        },
      });
    });
  });

  await Promise.allSettled(
    skinsInput.map((data) => prisma.weaponSkin.create({ data })),
  );

  const episodesInput: Prisma.EpisodeCreateInput[] = [];
  const episodesResponse = await axios.get<EpisodeResponse>(
    'https://valorant-api.com/v1/seasons',
  );

  episodesResponse.data.data.forEach((episode, _index, arr) => {
    if (episode.type) {
      return;
    }

    const acts: Prisma.EpisodeActCreateManyEpisodeInput[] = [];
    arr.forEach((act) => {
      if (act.parentUuid !== episode.uuid) {
        return;
      }

      acts.push({
        uuid: act.uuid,
        displayName: act.displayName,
        start: act.startTime,
        end: act.endTime,
      });
    });

    episodesInput.push({
      uuid: episode.uuid,
      displayName: episode.displayName,
      start: episode.startTime,
      end: episode.endTime,
      acts: {
        createMany: {
          data: acts,
          skipDuplicates: true,
        },
      },
    });
  });

  await Promise.allSettled(
    episodesInput.map((data) => prisma.episode.create({ data })),
  );

  const eventsInput: Prisma.EventCreateManyInput[] = [];
  const eventsResponse = await axios.get<EventResponse>(
    'https://valorant-api.com/v1/events',
  );

  eventsResponse.data.data.forEach((event) => {
    eventsInput.push({
      uuid: event.uuid,
      displayName: event.displayName,
      start: event.startTime,
      end: event.endTime,
    });
  });

  await prisma.event.createMany({ data: eventsInput, skipDuplicates: true });

  const currenciesInput: Prisma.CurrencyCreateManyInput[] = [];
  const currenciesResponse = await axios.get<CurrencyResponse>(
    'https://valorant-api.com/v1/currencies',
  );

  currenciesResponse.data.data.forEach((currency) => {
    currenciesInput.push({
      uuid: currency.uuid,
      displayName: currency.displayNameSingular,
      displayIcon: currency.displayIcon,
    });
  });

  await prisma.currency.createMany({
    data: currenciesInput,
    skipDuplicates: true,
  });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
