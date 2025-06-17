import express from "express";
import bodyParser from "body-parser";
export const app = express();

//shows errors in ts files
require('source-map-support').install();
import {router} from "../adapters/rest_apis";

app.use(bodyParser());

app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World!');
});



