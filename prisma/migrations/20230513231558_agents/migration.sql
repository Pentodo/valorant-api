-- CreateEnum
CREATE TYPE "ability_slot" AS ENUM ('Ability1', 'Ability2', 'Grenade', 'Ultimate');

-- CreateTable
CREATE TABLE "agent" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL,
    "full_portrait" TEXT NOT NULL,
    "killfeed_portrait" TEXT NOT NULL,
    "voice_line" TEXT NOT NULL,
    "role_uuid" TEXT NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "agent_color" (
    "agent_uuid" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "agent_color_pkey" PRIMARY KEY ("agent_uuid","color")
);

-- CreateTable
CREATE TABLE "agent_role" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL,

    CONSTRAINT "agent_role_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "agent_ability" (
    "agent_uuid" TEXT NOT NULL,
    "slot" "ability_slot" NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL,

    CONSTRAINT "agent_ability_pkey" PRIMARY KEY ("agent_uuid","slot")
);

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_role_uuid_fkey" FOREIGN KEY ("role_uuid") REFERENCES "agent_role"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_color" ADD CONSTRAINT "agent_color_agent_uuid_fkey" FOREIGN KEY ("agent_uuid") REFERENCES "agent"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_ability" ADD CONSTRAINT "agent_ability_agent_uuid_fkey" FOREIGN KEY ("agent_uuid") REFERENCES "agent"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
