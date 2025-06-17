import express from "express";

export const router = express.Router();

import {router as CustomerRoutes} from "./customers/index";


router.use(CustomerRoutes);