import {
  AbilitySlot,
  Prisma,
  PrismaClient,
  RewardType,
  WeaponCategory,
} from '@prisma/client';
import axios from 'axios';
import 'dotenv/config';
import {
  AgentResponse,
  BuddyResponse,
  CardResponse,
  ContentTierResponse,
  ContractResponse,
  CurrencyResponse,
  EpisodeResponse,
  EventResponse,
  SprayResponse,
  ThemeResponse,
  TitleResponse,
  WeaponResponse,
} from './seed.interface';

const prisma = new PrismaClient();

const http = axios.create();
const language = process.env.LANGUAGE || 'en-US';

http.defaults.baseURL = 'https://valorant-api.com';
http.defaults.params = new URLSearchParams({ language });

(async () => {
  const agentsInput: Prisma.AgentCreateInput[] = [];
  const rolesInput: Prisma.AgentRoleCreateManyInput[] = [];
  const agentsResponse = await http.get<AgentResponse>('/v1/agents', {
    params: new URLSearchParams({ language, isPlayableCharacter: 'true' }),
  });

  agentsResponse.data.data.forEach((agent) => {
    rolesInput.push({
      uuid: agent.role.uuid,
      displayName: agent.role.displayName,
      description: agent.role.description,
      displayIcon: agent.role.displayIcon,
    });

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
      role: { connect: { uuid: agent.role.uuid } },
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

  await prisma.agentRole.createMany({ data: rolesInput, skipDuplicates: true });
  await Promise.all(agentsInput.map((data) => prisma.agent.create({ data })));

  const contentTiersInput: Prisma.ContentTierCreateManyInput[] = [];
  const contentTiersResponse = await http.get<ContentTierResponse>(
    '/v1/contenttiers',
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
  const themesResponse = await http.get<ThemeResponse>('/v1/themes');

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

  const weaponsInput: Prisma.WeaponCreateManyInput[] = [];
  const skinsInput: Prisma.WeaponSkinCreateInput[] = [];
  const weaponsResponse = await http.get<WeaponResponse>('/v1/weapons');

  const levelToSkin: Map<string, string> = new Map();

  weaponsResponse.data.data.forEach((weapon) => {
    weaponsInput.push({
      uuid: weapon.uuid,
      displayName: weapon.displayName,
      displayIcon: weapon.displayIcon,
      killStreamIcon: weapon.killStreamIcon,
      category: WeaponCategory[weapon.category.split('::')[1]],
    });

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
      skin.levels.forEach((level) => {
        levels.push({
          uuid: level.uuid,
          displayName: level.displayName,
          displayIcon: level.displayIcon,
          type: level.levelItem,
          video: level.streamedVideo,
        });

        levelToSkin.set(level.uuid, skin.uuid);
      });

      skinsInput.push({
        uuid: skin.uuid,
        displayName: skin.displayName,
        displayIcon: skin.displayIcon,
        wallpaper: skin.wallpaper,
        theme: { connect: { uuid: skin.themeUuid } },
        tier: {
          connect: skin.contentTierUuid
            ? { uuid: skin.contentTierUuid }
            : undefined,
        },
        weapon: { connect: { uuid: weapon.uuid } },
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

  await prisma.weapon.createMany({ data: weaponsInput, skipDuplicates: true });
  await Promise.all(
    skinsInput.map((data) => prisma.weaponSkin.create({ data })),
  );

  const episodesInput: Prisma.EpisodeCreateInput[] = [];
  const episodesResponse = await http.get<EpisodeResponse>('/v1/seasons');

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

  await Promise.all(
    episodesInput.map((data) => prisma.episode.create({ data })),
  );

  const eventsInput: Prisma.EventCreateManyInput[] = [];
  const eventsResponse = await http.get<EventResponse>('/v1/events');

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
  const currenciesResponse = await http.get<CurrencyResponse>('/v1/currencies');

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

  const buddiesInput: Prisma.BuddyCreateManyInput[] = [];
  const buddiesResponse = await http.get<BuddyResponse>('/v1/buddies');

  const levelToBuddy: Map<string, string> = new Map();

  buddiesResponse.data.data.forEach((buddy) => {
    buddiesInput.push({
      uuid: buddy.uuid,
      displayName: buddy.displayName,
      displayIcon: buddy.displayIcon,
      themeUuid: buddy.themeUuid,
    });

    buddy.levels.forEach((level) => levelToBuddy.set(level.uuid, buddy.uuid));
  });

  await prisma.buddy.createMany({
    data: buddiesInput,
    skipDuplicates: true,
  });

  const cardsInput: Prisma.CardCreateManyInput[] = [];
  const cardsResponse = await http.get<CardResponse>('/v1/playercards');

  cardsResponse.data.data.forEach((card) => {
    cardsInput.push({
      uuid: card.uuid,
      displayName: card.displayName,
      displayIcon: card.displayIcon,
      wideArt: card.wideArt,
      largeArt: card.largeArt,
      themeUuid: card.themeUuid,
    });
  });

  await prisma.card.createMany({
    data: cardsInput,
    skipDuplicates: true,
  });

  const spraysInput: Prisma.SprayCreateManyInput[] = [];
  const spraysResponse = await http.get<SprayResponse>('/v1/sprays');

  spraysResponse.data.data.forEach((spray) => {
    spraysInput.push({
      uuid: spray.uuid,
      displayName: spray.displayName,
      category: spray.category ? 'Contextual' : null,
      displayIcon: spray.displayIcon,
      art: spray.fullTransparentIcon,
      animation: spray.animationPng,
      themeUuid: spray.themeUuid,
    });
  });

  await prisma.spray.createMany({
    data: spraysInput,
    skipDuplicates: true,
  });

  const titlesInput: Prisma.TitleCreateManyInput[] = [];
  const titlesResponse = await http.get<TitleResponse>('/v1/playertitles');

  titlesResponse.data.data.forEach((title) => {
    if (!title.displayName) {
      return;
    }

    titlesInput.push({
      uuid: title.uuid,
      displayName: title.displayName,
      text: title.titleText,
    });
  });

  await prisma.title.createMany({
    data: titlesInput,
    skipDuplicates: true,
  });

  const contractsInput: Prisma.ContractCreateManyInput[] = [];
  const rewardsInput: Prisma.ContractRewardCreateInput[] = [];
  const contractsResponse = await http.get<ContractResponse>('/v1/contracts');

  contractsResponse.data.data.forEach((contract) => {
    contractsInput.push({
      uuid: contract.uuid,
      displayName: contract.displayName,
      displayIcon: contract.displayIcon,
      type: contract.content.relationType,
    });

    contract.content.chapters.forEach((chapter) => {
      const greaterXP = Math.max(...chapter.levels.map((level) => level.xp));

      if (chapter.freeRewards) {
        chapter.freeRewards.forEach((reward) => {
          reward.isFree = true;

          chapter.levels.push({ xp: greaterXP, vpCost: 0, reward });
        });
      }

      chapter.levels.forEach((level) => {
        const rewardInput: Prisma.ContractRewardCreateInput = {
          type: undefined,
          isFree: level.reward.isFree || false,
          xp: level.xp,
          vpCost: level.vpCost,
          contract: { connect: { uuid: contract.uuid } },
        };

        const originalType = level.reward.type;
        const typeToEntity = {
          Spray: 'spray',
          PlayerCard: 'card',
          Title: 'title',
          Character: 'agent',
          EquippableCharmLevel: 'buddy',
          EquippableSkinLevel: 'skin',
        };

        if (originalType === 'EquippableSkinLevel') {
          rewardInput.type = RewardType.Skin;
          rewardInput.skin = {
            connect: {
              uuid: levelToSkin.get(level.reward.uuid),
            },
          };
        } else if (originalType === 'EquippableCharmLevel') {
          rewardInput.type = RewardType.Buddy;
          rewardInput.buddy = {
            connect: {
              uuid: levelToBuddy.get(level.reward.uuid),
            },
          };
        } else if (originalType !== 'Currency') {
          if (originalType === 'PlayerCard') {
            rewardInput.type = 'Card';
          } else {
            rewardInput.type = originalType;
          }

          rewardInput[typeToEntity[originalType]] = {
            connect: {
              uuid: level.reward.uuid,
            },
          };
        } else {
          rewardInput.type = originalType;
        }

        rewardsInput.push(rewardInput);
      });
    });
  });

  await prisma.contract.createMany({
    data: contractsInput,
    skipDuplicates: true,
  });
  await Promise.all(
    rewardsInput.map((data) => prisma.contractReward.create({ data })),
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
