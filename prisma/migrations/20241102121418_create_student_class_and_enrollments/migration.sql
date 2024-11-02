-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `classId` INTEGER NOT NULL,

    UNIQUE INDEX `enrollments_studentId_classId_key`(`studentId`, `classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Enrollments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Enrollments_AB_unique`(`A`, `B`),
    INDEX `_Enrollments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Enrollments` ADD CONSTRAINT `_Enrollments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Enrollments` ADD CONSTRAINT `_Enrollments_B_fkey` FOREIGN KEY (`B`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
