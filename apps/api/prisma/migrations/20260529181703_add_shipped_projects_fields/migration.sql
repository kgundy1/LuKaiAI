-- AlterTable
ALTER TABLE "User" ADD COLUMN     "builderDisplayName" VARCHAR(80),
ADD COLUMN     "isProjectPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "moduleCompleted" INTEGER,
ADD COLUMN     "projectDescription" VARCHAR(500),
ADD COLUMN     "projectName" VARCHAR(50),
ADD COLUMN     "projectUrl" VARCHAR(500);
