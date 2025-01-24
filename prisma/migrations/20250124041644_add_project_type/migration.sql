-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectType" TEXT NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "maxCredits" INTEGER NOT NULL DEFAULT 10;
