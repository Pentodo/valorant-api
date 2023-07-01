-- AlterEnum
ALTER TYPE "ability_slot" ADD VALUE 'Passive';

-- AlterTable
ALTER TABLE "agent_ability" ALTER COLUMN "display_icon" DROP NOT NULL;
