/*
  Warnings:

  - You are about to drop the column `apartment_id` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `apartment_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `apartment_id` on the `Sponsorship` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Sponsorship` table. All the data in the column will be lost.
  - Added the required column `apartmentId` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentId` to the `Sponsorship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sponsorship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Amenity` DROP FOREIGN KEY `Amenity_apartment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Apartment` DROP FOREIGN KEY `Apartment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_apartment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorship` DROP FOREIGN KEY `Sponsorship_apartment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorship` DROP FOREIGN KEY `Sponsorship_user_id_fkey`;

-- AlterTable
ALTER TABLE `Amenity` DROP COLUMN `apartment_id`,
    ADD COLUMN `apartmentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Apartment` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `apartment_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `apartmentId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Sponsorship` DROP COLUMN `apartment_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `apartmentId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Amenity` ADD CONSTRAINT `Amenity_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
