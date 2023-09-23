/*
  Warnings:

  - Added the required column `gambar` to the `barangs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barangs` ADD COLUMN `gambar` VARCHAR(100) NOT NULL;
