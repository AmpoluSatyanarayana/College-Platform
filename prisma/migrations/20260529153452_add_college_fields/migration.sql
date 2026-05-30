/*
  Warnings:

  - Added the required column `about` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placementPercentage` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "placementPercentage" DOUBLE PRECISION NOT NULL;
