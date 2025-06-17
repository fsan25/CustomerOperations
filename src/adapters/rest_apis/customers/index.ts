import express from "express";
import { ErrorHandlingMiddlewareFunction } from "../../../../lib/middleware";
import {getCustomer} from "./get-customer";
import {postCustomer} from "./post-customer";

export const router = express.Router();



router.get('/customers/:id',getCustomer,ErrorHandlingMiddlewareFunction);
router.post('/customers',postCustomer,ErrorHandlingMiddlewareFunction);


