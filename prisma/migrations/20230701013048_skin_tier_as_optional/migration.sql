-- DropForeignKey
ALTER TABLE "weapon_skin" DROP CONSTRAINT "weapon_skin_tier_uuid_fkey";

-- AlterTable
ALTER TABLE "weapon_skin" ALTER COLUMN "tier_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_tier_uuid_fkey" FOREIGN KEY ("tier_uuid") REFERENCES "content_tier"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
