-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_chatbotId_fkey";

-- AlterTable
ALTER TABLE "Integration" ALTER COLUMN "chatbotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
