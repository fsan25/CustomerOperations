import express from "express";
import { ErrorHandlingMiddlewareFunction } from "../../../../lib/middleware";
import { getCustomer } from "../../../../src/adapters/rest_apis/customers/get-customer";
import { postCustomer } from "../../../../src/adapters/rest_apis/customers/post-customer";

const customerRouter = express.Router();

customerRouter.get('/customers/:id', getCustomer, ErrorHandlingMiddlewareFunction);
customerRouter.post('/customers', postCustomer, ErrorHandlingMiddlewareFunction);

export default customerRouter;
