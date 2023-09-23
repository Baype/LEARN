import barangService from "../service/barang-service.js";
import {logger} from "../application/logging.js";
import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await barangService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const barangId = req.params.barangId;
        const result = await barangService.get(user, barangId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await barangService.getAll(user);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}



const update = async (req, res, next) => {
    try {
        const user = req.user;
        const barangId = req.params.barangId;
        const request = req.body;
        request.id = barangId;

        const result = await barangService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const barangId = req.params.barangId;

        await barangService.remove(user, barangId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

// const forcedelete = async (req, res, next) => {
//     try {
//         //const user = req.user;
//         const barangId = req.params.barangId;

//         await barangService.forcedelete(barangId);
//         res.status(200).json({
//             data: "OK"
//         })
//     } catch (e) {
//         next(e);
//     }
// }
// const forcedelete = async (req, res, next) => {
//     const { barangId } = req.params;

//     try {
//       const result = await barangService.forcedelete(barangId, req.user);
//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Gagal menghapus kontak dan alamat terkait.' });
//     }
// };

// const search = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const request = {
//             name: req.query.name,
//             email: req.query.email,
//             phone: req.query.phone,
//             page: req.query.page,
//             size: req.query.size
//         };

//         const result = await barangService.search(user, request);
//         res.status(200).json({
//             data: result.data,
//             paging: result.paging
//         });
//     } catch (e) {
//         next(e);
//     }
// }

export default {
    create,
    get,
    update,
    remove,
    getAll,
    //search,
    //forcedelete,
   
}
