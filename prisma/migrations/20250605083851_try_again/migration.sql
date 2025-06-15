/*
  Warnings:

  - You are about to alter the column `rating` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `rating` DOUBLE NOT NULL;
