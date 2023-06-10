-- CreateTable
CREATE TABLE "buddy" (
    "uuid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "displayIcon" TEXT NOT NULL,
    "themeUuid" TEXT,

    CONSTRAINT "buddy_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "buddy" ADD CONSTRAINT "buddy_themeUuid_fkey" FOREIGN KEY ("themeUuid") REFERENCES "theme"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
