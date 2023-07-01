import { ContractType, RewardType } from '@prisma/client';

export interface AgentData {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  displayIcon: string;
  fullPortrait: string;
  killfeedPortrait: string;
  backgroundGradientColors: string[];
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: [
    {
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    },
  ];
  voiceLine: { mediaList: [{ wave: string }] };
}

export interface AgentResponse {
  status: number;
  data: AgentData[];
}

export interface ContentTierData {
  uuid: string;
  displayName: string;
  devName: string;
  rank: number;
  highlightColor: string;
  displayIcon: string;
}

export interface ContentTierResponse {
  status: number;
  data: ContentTierData[];
}

export interface ThemeData {
  uuid: string;
  displayName: string;
}

export interface ThemeResponse {
  status: number;
  data: ThemeData[];
}

export interface WeaponSkinResponse {
  uuid: string;
  displayName: string;
  themeUuid: string; // theme
  contentTierUuid: string; // tier
  displayIcon: string;
  wallpaper: string;
  chromas: [
    {
      uuid: string;
      displayName: string;
      displayIcon: string;
      swatch: string;
      streamedVideo: string;
    },
  ];
  levels: [
    {
      uuid: string;
      displayName: string;
      levelItem: string;
      displayIcon: string;
      streamedVideo: string;
    },
  ];
}

export interface WeaponData {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string; // skin
  displayIcon: string;
  killStreamIcon: string;
  skins: WeaponSkinResponse[];
}

export interface WeaponResponse {
  status: number;
  data: WeaponData[];
}

export interface EpisodeData {
  uuid: string;
  displayName: string;
  type: string;
  startTime: string;
  endTime: string;
  parentUuid: string;
}

export interface EpisodeResponse {
  status: number;
  data: EpisodeData[];
}

export interface EventData {
  uuid: string;
  displayName: string;
  startTime: string;
  endTime: string;
}

export interface EventResponse {
  status: number;
  data: EventData[];
}

export interface CurrencyData {
  uuid: string;
  displayNameSingular: string;
  displayIcon: string;
}

export interface CurrencyResponse {
  status: number;
  data: CurrencyData[];
}

export interface BuddyData {
  uuid: string;
  displayName: string;
  themeUuid: string;
  displayIcon: string;
  levels: [
    {
      uuid: string;
    },
  ];
}

export interface BuddyResponse {
  status: number;
  data: BuddyData[];
}

export interface CardData {
  uuid: string;
  displayName: string;
  themeUuid: string;
  displayIcon: string;
  wideArt: string;
  largeArt: string;
}

export interface CardResponse {
  status: number;
  data: CardData[];
}

export interface SprayData {
  uuid: string;
  displayName: string;
  category: string;
  themeUuid: string;
  displayIcon: string;
  fullTransparentIcon: string;
  animationPng: string;
}

export interface SprayResponse {
  status: number;
  data: SprayData[];
}

export interface TitleData {
  uuid: string;
  displayName: string;
  titleText: string;
}

export interface TitleResponse {
  status: number;
  data: TitleData[];
}

export interface Reward {
  uuid: string;
  type: RewardType;
  isFree?: boolean;
}

export interface ContractData {
  uuid: string;
  displayName: string;
  displayIcon: string;
  content: {
    relationType: ContractType;
    relationUuid: string;
    chapters: [
      {
        isEpilogue: boolean;
        freeRewards: Reward[];
        levels: [
          {
            reward: Reward;
            xp: number;
            vpCost: number;
          },
        ];
      },
    ];
  };
}

export interface ContractResponse {
  status: number;
  data: ContractData[];
}
