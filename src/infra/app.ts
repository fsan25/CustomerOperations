import express from "express";
import bodyParser from "body-parser";
export const app = express();

//shows errors in ts files
require('source-map-support').install();
import customerRoutes from "./rest_api/routes/customerRoutes";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(customerRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});



