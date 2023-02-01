-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_adressId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
