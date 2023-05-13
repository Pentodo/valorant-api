-- CreateEnum
CREATE TYPE "AbilitySlot" AS ENUM ('Ability1', 'Ability2', 'Grenade', 'Ultimate');

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
    "role_id" TEXT NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "agent_color" (
    "agent_id" TEXT NOT NULL,
    "color" TEXT NOT NULL
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
    "agent_id" TEXT NOT NULL,
    "slot" "AbilitySlot" NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_color_agent_id_color_key" ON "agent_color"("agent_id", "color");

-- CreateIndex
CREATE UNIQUE INDEX "agent_ability_agent_id_slot_key" ON "agent_ability"("agent_id", "slot");

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "agent_role"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_color" ADD CONSTRAINT "agent_color_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_ability" ADD CONSTRAINT "agent_ability_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
