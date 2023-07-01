/*
  Warnings:

  - The values [PlayerCard,EquippableCharmLevel,EquippableSkinLevel] on the enum `reward_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "reward_type_new" AS ENUM ('Spray', 'Card', 'Title', 'Character', 'Buddy', 'Skin', 'Currency');
ALTER TABLE "contract_reward" ALTER COLUMN "type" TYPE "reward_type_new" USING ("type"::text::"reward_type_new");
ALTER TYPE "reward_type" RENAME TO "reward_type_old";
ALTER TYPE "reward_type_new" RENAME TO "reward_type";
DROP TYPE "reward_type_old";
COMMIT;
