/*
  Warnings:

  - You are about to drop the `barang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `barang` DROP FOREIGN KEY `Barang_username_fkey`;

-- DropTable
DROP TABLE `barang`;

-- CreateTable
CREATE TABLE `barangs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_barang` VARCHAR(100) NOT NULL,
    `jenis_barang` VARCHAR(100) NOT NULL,
    `jumlah_barang` VARCHAR(255) NOT NULL,
    `deskripsi_barang` VARCHAR(100) NOT NULL,
    `harga_barang` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barangs` ADD CONSTRAINT `barangs_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
