import Joi from "joi";

const createBarangValidation = Joi.object({
    nama_barang: Joi.string().max(100).required(),
    jenis_barang: Joi.string().max(100).required(),
    jumlah_barang: Joi.string().max(255).required(),
    deskripsi_barang: Joi.string().max(100).required(),
    harga_barang: Joi.string().max(255).required(),
    gambar_barang: Joi.string().max(100).required(),

});

const getBarangValidation = Joi.number().positive().required();


const updateBarangValidation = Joi.object({
    id: Joi.number().positive().required(),
    nama_barang: Joi.string().max(100).required(),
    jenis_barang: Joi.string().max(100).required(),
    jumlah_barang: Joi.string().max(255).required(),
    deskripsi_barang: Joi.string().max(100).required(),
    harga_barang: Joi.string().max(255).required(),
    gambar_barang: Joi.string().max(100).required(),
});


export {
    createBarangValidation,
    getBarangValidation,
    updateBarangValidation,
    // getAllBarangValidation
}
