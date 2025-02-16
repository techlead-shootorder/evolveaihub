-- CreateTable
CREATE TABLE "Chatbot" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "operatingHours" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "services" JSONB NOT NULL,
    "pricing" TEXT,
    "serviceAreas" TEXT,
    "botName" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "fallbackMessage" TEXT,
    "personality" TEXT NOT NULL,
    "faqs" JSONB NOT NULL,
    "policies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chatbot_pkey" PRIMARY KEY ("id")
);
