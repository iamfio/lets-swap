/*
  Warnings:

  - A unique constraint covering the columns `[adressId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adressId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "adressId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_adressId_key" ON "Profile"("adressId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
