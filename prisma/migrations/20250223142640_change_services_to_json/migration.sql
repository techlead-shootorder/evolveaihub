/*
  Warnings:

  - The `services` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Chatbot" DROP CONSTRAINT "Chatbot_createdBy_fkey";

-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "services",
ADD COLUMN     "services" JSONB,
ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
