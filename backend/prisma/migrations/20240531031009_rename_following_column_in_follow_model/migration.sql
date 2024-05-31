/*
  Warnings:

  - You are about to drop the column `followingId` on the `follows` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "followingId",
ADD COLUMN     "followedId" INTEGER;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
