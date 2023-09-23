import { validate } from "../validation/validation.js";
import {
  createBarangValidation,
  getBarangValidation,
  updateBarangValidation
} from "../validation/barang-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { logger } from "../application/logging.js";


const create = async (user, request) => {
  const barang = (createBarangValidation, request);
  barang.username = user.username;
  return prismaClient.barang.create({
    data: barang,
    select: {
      id: true,
      nama_barang: true,
      jenis_barang: true,
      jumlah_barang: true,
      deskripsi_barang: true,
      harga_barang: true,
      gambar_barang: true,
    },
  });
};

const get = async (user, barangId) => {
  barangId = validate(getBarangValidation, barangId);
  const barang = await prismaClient.barang.findFirst({
    where: {
      username: user.username,
      id: barangId,
    },
    select: {
      id: true,
      nama_barang: true,
      jenis_barang: true,
      jumlah_barang: true,
      deskripsi_barang: true,
      harga_barang: true,
      gambar_barang: true,
    },
  });

  if (!barang) {
    throw new ResponseError(404, "barang is not found");
  }

  return barang;
};

const getAll = async (user) => {
  //barangId = validate(getBarangValidation, barangId);
  const barang = await prismaClient.barang.findMany({
    where: {
      username: user.username,
    },
    select: {
      id: true,
      nama_barang: true,
      jenis_barang: true,
      jumlah_barang: true,
      deskripsi_barang: true,
      harga_barang: true,
      gambar_barang: true,
    },
  });

  if (!barang) {
    throw new ResponseError(404, "barang is not found");
  }
  // logger.info(result.body);
  return barang;
};


const update = async (user, request) => {
  const barang = validate(updateBarangValidation, request);

  const totalBarangInDatabase = await prismaClient.barang.count({
    where: {
      username: user.username,
      id: barang.id,
    },
  });

  if (totalBarangInDatabase !== 1) {
    throw new ResponseError(404, "barang is not found");
  }

  return prismaClient.barang.update({
    where: {
      id: barang.id,
    },
    data: {
      nama_barang: barang.nama_barang,
      jenis_barang: barang.jenis_barang,
      jumlah_barang: barang.jumlah_barang,
      deskripsi_barang: barang.deskripsi_barang,
      harga_barang: barang.harga_barang,
      gambar_barang: barang.gambar_barang

    },
    select: {
      id: true,
      nama_barang: true,
      jenis_barang: true,
      jumlah_barang: true,
      deskripsi_barang: true,
      harga_barang: true,
      gambar_barang: true,
    },
  });
};

const remove = async (user, barangId) => {
  barangId = validate(getBarangValidation, barangId);

  const totalInDatabase = await prismaClient.barang.count({
    where: {
      username: user.username,
      id: barangId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "barang is not found");
  }

  return prismaClient.barang.delete({
    where: {
      id: barangId,
    },
  });
};


export default {
  create,
  get,
  update,
  remove,
  getAll,
//   search,
//   forcedelete,
};
