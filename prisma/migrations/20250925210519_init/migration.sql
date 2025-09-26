-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `rank` ENUM('NOOB', 'SKID', 'SICK', 'WIZARD', 'UNEMPLOYED') NOT NULL DEFAULT 'NOOB',
    `submissionsCreated` INTEGER NOT NULL DEFAULT 0,
    `challengesSolved` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodeSubmission` (
    `id` VARCHAR(191) NOT NULL,
    `code` TEXT NOT NULL,
    `language` ENUM('C', 'PYTHON', 'JAVASCRIPT', 'JAVA', 'GO', 'RUST', 'X_86', 'HOLY_C', 'SHAKESPEARE', 'BASH', 'CHEF') NOT NULL,
    `votes` INTEGER NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `id` VARCHAR(191) NOT NULL,
    `language` ENUM('C', 'PYTHON', 'JAVASCRIPT', 'JAVA', 'GO', 'RUST', 'X_86', 'HOLY_C', 'SHAKESPEARE', 'BASH', 'CHEF') NOT NULL,
    `description` TEXT NOT NULL,
    `category` ENUM('CODE_GOLF', 'OBFUSCATION', 'ESOLANG', 'ONE_LINER', 'FORBIDDEN_KEYWORDS', 'POETIC_CODE') NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `expectedOutput` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CodeSubmission` ADD CONSTRAINT `CodeSubmission_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
