/*
  Warnings:

  - Made the column `rating` on table `Comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `rating` DECIMAL(65, 30) NOT NULL DEFAULT 0;
