/*
  Warnings:

  - You are about to drop the column `gambar` on the `barangs` table. All the data in the column will be lost.
  - Added the required column `gambar_barang` to the `barangs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barangs` DROP COLUMN `gambar`,
    ADD COLUMN `gambar_barang` VARCHAR(100) NOT NULL;
