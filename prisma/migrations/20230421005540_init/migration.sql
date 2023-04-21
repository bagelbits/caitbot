-- CreateTable
CREATE TABLE "Apparatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Apparatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trick" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApparatusToTrick" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApparatusToTrick_AB_unique" ON "_ApparatusToTrick"("A", "B");

-- CreateIndex
CREATE INDEX "_ApparatusToTrick_B_index" ON "_ApparatusToTrick"("B");

-- AddForeignKey
ALTER TABLE "_ApparatusToTrick" ADD CONSTRAINT "_ApparatusToTrick_A_fkey" FOREIGN KEY ("A") REFERENCES "Apparatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApparatusToTrick" ADD CONSTRAINT "_ApparatusToTrick_B_fkey" FOREIGN KEY ("B") REFERENCES "Trick"("id") ON DELETE CASCADE ON UPDATE CASCADE;
