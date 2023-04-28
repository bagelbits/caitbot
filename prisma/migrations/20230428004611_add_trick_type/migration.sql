-- AlterTable
ALTER TABLE "Trick" ADD COLUMN     "trickTypeId" TEXT;

-- CreateTable
CREATE TABLE "TrickType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrickType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trick" ADD CONSTRAINT "Trick_trickTypeId_fkey" FOREIGN KEY ("trickTypeId") REFERENCES "TrickType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
