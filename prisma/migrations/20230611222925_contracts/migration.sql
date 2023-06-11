/*
  Warnings:

  - A unique constraint covering the columns `[reward_uuid]` on the table `agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reward_uuid]` on the table `buddy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reward_uuid]` on the table `card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reward_uuid]` on the table `spray` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reward_uuid]` on the table `title` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reward_uuid]` on the table `weapon_skin` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tier_uuid` on table `weapon_skin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `theme_uuid` on table `weapon_skin` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "contract_type" AS ENUM ('Agent', 'Event', 'Season');

-- CreateEnum
CREATE TYPE "reward_type" AS ENUM ('Spray', 'PlayerCard', 'Title', 'Character', 'EquippableCharmLevel', 'EquippableSkinLevel', 'Currency');

-- DropForeignKey
ALTER TABLE "weapon_skin" DROP CONSTRAINT "weapon_skin_theme_uuid_fkey";

-- DropForeignKey
ALTER TABLE "weapon_skin" DROP CONSTRAINT "weapon_skin_tier_uuid_fkey";

-- AlterTable
ALTER TABLE "agent" ADD COLUMN     "reward_uuid" TEXT;

-- AlterTable
ALTER TABLE "buddy" ADD COLUMN     "reward_uuid" TEXT;

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "reward_uuid" TEXT;

-- AlterTable
ALTER TABLE "spray" ADD COLUMN     "reward_uuid" TEXT;

-- AlterTable
ALTER TABLE "title" ADD COLUMN     "reward_uuid" TEXT;

-- AlterTable
ALTER TABLE "weapon_skin" ADD COLUMN     "reward_uuid" TEXT,
ALTER COLUMN "tier_uuid" SET NOT NULL,
ALTER COLUMN "theme_uuid" SET NOT NULL;

-- CreateTable
CREATE TABLE "contract" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "display_icon" TEXT,
    "type" "contract_type" NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "contract_reward" (
    "uuid" TEXT NOT NULL,
    "contract_uuid" TEXT NOT NULL,
    "type" "reward_type" NOT NULL,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "xp" INTEGER NOT NULL,
    "vp_cost" INTEGER NOT NULL,

    CONSTRAINT "contract_reward_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_reward_uuid_key" ON "agent"("reward_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "buddy_reward_uuid_key" ON "buddy"("reward_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "card_reward_uuid_key" ON "card"("reward_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "spray_reward_uuid_key" ON "spray"("reward_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "title_reward_uuid_key" ON "title"("reward_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_skin_reward_uuid_key" ON "weapon_skin"("reward_uuid");

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_tier_uuid_fkey" FOREIGN KEY ("tier_uuid") REFERENCES "content_tier"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "theme"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buddy" ADD CONSTRAINT "buddy_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spray" ADD CONSTRAINT "spray_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title" ADD CONSTRAINT "title_reward_uuid_fkey" FOREIGN KEY ("reward_uuid") REFERENCES "contract_reward"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_reward" ADD CONSTRAINT "contract_reward_contract_uuid_fkey" FOREIGN KEY ("contract_uuid") REFERENCES "contract"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
