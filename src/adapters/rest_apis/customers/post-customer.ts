import {CustomerInsertJson, CustomerServiceInterface} from "../../../domain/ports/customer-service-interface";
import {CustomerService} from "../../../domain/services/customer-service";
import  {Request, Response} from "express";
import {FailedRequestBodyError, InternalServerError} from "../../../utils/errors";
import Ajv from "ajv";

const customerService : CustomerServiceInterface = new CustomerService();

export async function postCustomer(request: Request,response: Response,next :any)  {

    try {
        const insertCustomerJson = request.body as CustomerInsertJson

  
        validate(request.body);
    
        const done = await customerService.insert(insertCustomerJson)
        console.log("done")
        response.status(201).send();
    } catch (error) {
        next(error)
    }

   

   




}

const validate = (data: any)  =>{
    const schema = {
        type: "object",
        properties:{
            firstName:{
                type: "string",
            },
            lastName:{
                type: "string",
            },
            address:{
                type: "string",
            },
            employeeId:{
                type: "number",
            }
        },
        required: ["firstName","lastName","address","employeeId"],
        additionalProperties: false
    };
    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);

    if(validate(data)) return false;


    const errors = validate.errors as Ajv.ErrorObject[];
    throw new FailedRequestBodyError(errors);
}


