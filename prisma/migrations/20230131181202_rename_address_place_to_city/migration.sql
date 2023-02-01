/*
  Warnings:

  - You are about to drop the column `place` on the `Address` table. All the data in the column will be lost.
  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "place",
ADD COLUMN     "city" VARCHAR(120) NOT NULL;
