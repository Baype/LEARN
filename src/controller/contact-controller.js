import contactService from "../service/contact-service.js";
import {logger} from "../application/logging.js";
import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await contactService.create(user, request);
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
        const contactId = req.params.contactId;
        const result = await contactService.get(user, contactId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll(); // Panggil fungsi getAll dari service user
        res.status(200).json({
            data: users
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;

        const result = await contactService.update(user, request);
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
        const contactId = req.params.contactId;

        await contactService.remove(user, contactId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

const forcedelete = async (req, res, next) => {
    try {
        //const user = req.user;
        const contactId = req.params.contactId;

        await contactService.forcedelete(contactId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}
// const forcedelete = async (req, res, next) => {
//     const { contactId } = req.params;

//     try {
//       const result = await contactService.forcedelete(contactId, req.user);
//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Gagal menghapus kontak dan alamat terkait.' });
//     }
// };

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };

        const result = await contactService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search,
    forcedelete,
   
}
