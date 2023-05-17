/*
  Warnings:

  - You are about to drop the column `video_url` on the `Trick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trick" DROP COLUMN "video_url",
ADD COLUMN     "youtubeId" TEXT;
