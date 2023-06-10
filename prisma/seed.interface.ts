import { AbilitySlot } from '@prisma/client';

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
      slot: AbilitySlot;
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
