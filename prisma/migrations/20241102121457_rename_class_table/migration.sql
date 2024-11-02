/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Enrollments` DROP FOREIGN KEY `_Enrollments_A_fkey`;

-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_classId_fkey`;

-- DropTable
DROP TABLE `Class`;

-- CreateTable
CREATE TABLE `class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Enrollments` ADD CONSTRAINT `_Enrollments_A_fkey` FOREIGN KEY (`A`) REFERENCES `class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
