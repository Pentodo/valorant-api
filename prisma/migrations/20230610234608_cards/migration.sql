/*
  Warnings:

  - You are about to drop the column `displayIcon` on the `buddy` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `buddy` table. All the data in the column will be lost.
  - You are about to drop the column `themeUuid` on the `buddy` table. All the data in the column will be lost.
  - Added the required column `display_icon` to the `buddy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `buddy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "buddy" DROP CONSTRAINT "buddy_themeUuid_fkey";

-- AlterTable
ALTER TABLE "buddy" DROP COLUMN "displayIcon",
DROP COLUMN "displayName",
DROP COLUMN "themeUuid",
ADD COLUMN     "display_icon" TEXT NOT NULL,
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "theme_uuid" TEXT;

-- CreateTable
CREATE TABLE "card" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL,
    "wide_art" TEXT NOT NULL,
    "large_art" TEXT NOT NULL,
    "theme_uuid" TEXT,

    CONSTRAINT "card_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "buddy" ADD CONSTRAINT "buddy_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "theme"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "theme"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
