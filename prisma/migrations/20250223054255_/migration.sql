/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `faqs` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `policies` on the `Chatbot` table. All the data in the column will be lost.
  - Added the required column `chatbotId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "faqs",
DROP COLUMN "policies",
ALTER COLUMN "companyDescription" DROP NOT NULL,
ALTER COLUMN "industry" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "services" DROP NOT NULL,
ALTER COLUMN "services" SET DATA TYPE TEXT,
ALTER COLUMN "welcomeMessage" DROP NOT NULL,
ALTER COLUMN "personality" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "chatbotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
