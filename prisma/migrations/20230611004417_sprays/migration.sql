-- CreateEnum
CREATE TYPE "spray_category" AS ENUM ('Contextual');

-- CreateTable
CREATE TABLE "spray" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "category" "spray_category",
    "display_icon" TEXT NOT NULL,
    "art" TEXT,
    "animation" TEXT,
    "theme_uuid" TEXT,

    CONSTRAINT "spray_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "spray" ADD CONSTRAINT "spray_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "theme"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
