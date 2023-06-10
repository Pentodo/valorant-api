-- CreateEnum
CREATE TYPE "weapon_category" AS ENUM ('Melee', 'Sidearm', 'Shotgun', 'SMG', 'Rifle', 'Sniper', 'Heavy');

-- CreateTable
CREATE TABLE "content_tier" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "display_icon" TEXT NOT NULL,

    CONSTRAINT "content_tier_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "theme" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "weapon" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "category" "weapon_category" NOT NULL,
    "display_icon" TEXT NOT NULL,
    "kill_stream_icon" TEXT NOT NULL,

    CONSTRAINT "weapon_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "weapon_skin" (
    "uuid" TEXT NOT NULL,
    "weapon_uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "display_icon" TEXT,
    "wallpaper" TEXT,
    "theme_uuid" TEXT,
    "tier_uuid" TEXT,

    CONSTRAINT "weapon_skin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "weapon_skin_chroma" (
    "uuid" TEXT NOT NULL,
    "skin_uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "display_icon" TEXT,
    "color" TEXT,
    "video" TEXT,

    CONSTRAINT "weapon_skin_chroma_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "weapon_skin_level" (
    "uuid" TEXT NOT NULL,
    "skin_uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "display_icon" TEXT,
    "type" TEXT,
    "video" TEXT,

    CONSTRAINT "weapon_skin_level_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_tier_rank_key" ON "content_tier"("rank");

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_weapon_uuid_fkey" FOREIGN KEY ("weapon_uuid") REFERENCES "weapon"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "theme"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin" ADD CONSTRAINT "weapon_skin_tier_uuid_fkey" FOREIGN KEY ("tier_uuid") REFERENCES "content_tier"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin_chroma" ADD CONSTRAINT "weapon_skin_chroma_skin_uuid_fkey" FOREIGN KEY ("skin_uuid") REFERENCES "weapon_skin"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_skin_level" ADD CONSTRAINT "weapon_skin_level_skin_uuid_fkey" FOREIGN KEY ("skin_uuid") REFERENCES "weapon_skin"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
