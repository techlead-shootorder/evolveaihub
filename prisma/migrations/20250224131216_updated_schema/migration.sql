-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "domain" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "pills" JSONB,
ADD COLUMN     "primaryColor" TEXT,
ADD COLUMN     "secondaryColor" TEXT;
