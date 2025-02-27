/*
  Warnings:

  - You are about to drop the column `buttonColor` on the `Integration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Integration" DROP COLUMN "buttonColor",
ADD COLUMN     "initialMessage" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "secondaryColor" TEXT;
