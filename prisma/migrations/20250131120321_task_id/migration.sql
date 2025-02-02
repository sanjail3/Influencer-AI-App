-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "taskId" TEXT;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
