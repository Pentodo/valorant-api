-- CreateTable
CREATE TABLE "episode" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "episode_act" (
    "uuid" TEXT NOT NULL,
    "episode_uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,

    CONSTRAINT "episode_act_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "episode_act" ADD CONSTRAINT "episode_act_episode_uuid_fkey" FOREIGN KEY ("episode_uuid") REFERENCES "episode"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
