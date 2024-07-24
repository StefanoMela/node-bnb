/*
  Warnings:

  - You are about to drop the column `house_id` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `house_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `house_id` on the `Sponsorship` table. All the data in the column will be lost.
  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apartment_id` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartment_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartment_id` to the `Sponsorship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Amenity` DROP FOREIGN KEY `Amenity_house_id_fkey`;

-- DropForeignKey
ALTER TABLE `House` DROP FOREIGN KEY `House_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_house_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sponsorship` DROP FOREIGN KEY `Sponsorship_house_id_fkey`;

-- AlterTable
ALTER TABLE `Amenity` DROP COLUMN `house_id`,
    ADD COLUMN `apartment_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `house_id`,
    ADD COLUMN `apartment_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Sponsorship` DROP COLUMN `house_id`,
    ADD COLUMN `apartment_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `House`;

-- CreateTable
CREATE TABLE `Apartment` (
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
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_apartment_id_fkey` FOREIGN KEY (`apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Amenity` ADD CONSTRAINT `Amenity_apartment_id_fkey` FOREIGN KEY (`apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_apartment_id_fkey` FOREIGN KEY (`apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
