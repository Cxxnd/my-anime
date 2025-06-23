/*
  Warnings:

  - Added the required column `provider` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `provider` VARCHAR(191) NOT NULL;
