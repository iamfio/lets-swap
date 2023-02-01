/*
  Warnings:

  - You are about to drop the column `adressId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_adressId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "adressId";
