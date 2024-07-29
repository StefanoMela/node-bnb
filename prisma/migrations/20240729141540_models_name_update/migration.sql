/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentId` on the `Sponsorship` table. All the data in the column will be lost.
  - You are about to drop the `Apartment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `houseId` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseId` to the `Sponsorship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Amenity` DROP FOREIGN KEY `Amenity_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Apartment` DROP FOREIGN KEY `Apartment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorship` DROP FOREIGN KEY `Sponsorship_apartmentId_fkey`;

-- AlterTable
ALTER TABLE `Amenity` DROP COLUMN `apartmentId`,
    ADD COLUMN `houseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `apartmentId`,
    ADD COLUMN `houseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Sponsorship` DROP COLUMN `apartmentId`,
    ADD COLUMN `houseId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Apartment`;

-- CreateTable
CREATE TABLE `House` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `pricePerDay` INTEGER NOT NULL,
    `rooms` INTEGER NOT NULL,
    `beds` INTEGER NOT NULL,
    `baths` INTEGER NOT NULL,
    `squareMeters` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `userId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Amenity` ADD CONSTRAINT `Amenity_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
