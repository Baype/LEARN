import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";

import {authMiddleware} from "../middleware/auth-middleware.js";
import barangController from "../controller/barang-controller.js";

const userRouter = new express.Router();
const userRouter2= new express.Router();
userRouter.use(authMiddleware);


// User API

userRouter.get('/api/users/current', userController.get);
userRouter2.get('/api/users', userController.list);//gk pake
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);
userRouter.delete('/api/users/:username',userController.forcedelete);

// Contact API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.delete('/api/contacts/:contactId', contactController.remove);

userRouter.get('/api/contacts', contactController.search);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get('/api/addresses/:addressId', addressController.get);
userRouter.put('/api/addresses/:addressId', addressController.update);
userRouter.delete('/api/addresses/:addressId', addressController.remove);
userRouter.get('/api/contacts/:contactId/addresses', addressController.list);


userRouter.post('/api/barangs', barangController.create);
userRouter.get('/api/barangs/:barangId', barangController.get);
userRouter.get('/api/barangs', barangController.getAll);
userRouter.put('/api/barangs/:barangId', barangController.update);
userRouter.delete('/api/barangs/:barangId', barangController.remove);

export {
    userRouter,
    userRouter2
}
