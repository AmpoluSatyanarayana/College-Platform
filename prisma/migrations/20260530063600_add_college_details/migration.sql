/*
  Warnings:

  - You are about to alter the column `placementPercentage` on the `College` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "courses" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "placements" TEXT,
ADD COLUMN     "reviews" TEXT,
ALTER COLUMN "placementPercentage" SET DATA TYPE INTEGER;
