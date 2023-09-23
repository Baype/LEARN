import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../route/api.js";
import {userRouter2} from "../route/api.js";
import cors from 'cors';
import fileUpload from "express-fileupload";


export const web = express();
// web.use(cors({
//     origin: 'https://0mbhgsr7-3000.asse.devtunnels.ms', // Update with your React app's origin
//     credentials: true, // If you need to include credentials in your requests
//   }));
web.use(express.json());
//web.use(cors({credentials:true,origin:'http://localhost:3000/'}));
web.use(publicRouter);
web.use(userRouter);
web.use(userRouter2);
web.use(fileUpload);
web.use(errorMiddleware);
