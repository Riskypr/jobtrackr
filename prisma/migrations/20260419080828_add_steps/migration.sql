-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "steps" JSONB NOT NULL DEFAULT '[]';
