/*
  Warnings:

  - You are about to drop the column `domain` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `pills` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColor` on the `Chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `Chatbot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "domain",
DROP COLUMN "logo",
DROP COLUMN "pills",
DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor";

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "primaryColor" TEXT,
    "buttonColor" TEXT,
    "chatbotId" TEXT NOT NULL,
    "domain" TEXT,
    "pills" JSONB,
    "subText" TEXT,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
