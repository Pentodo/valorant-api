-- CreateTable
CREATE TABLE "event" (
    "uuid" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("uuid")
);
