-- AlterTable
ALTER TABLE "Scholarship" ALTER COLUMN "requirements" DROP NOT NULL,
ALTER COLUMN "requirements" SET DATA TYPE TEXT;
