import {Request,Response} from "express";
import {CustomerServiceInterface} from "../../../domain/ports/customer-service-interface";
import {CustomerService} from "../../../domain/services/customer-service";
import {FailedRequestBodyError, InternalServerError} from "../../../utils/errors";

interface GetCustomerResponseBody {
    firstName: string;
    lastName : string;
    employeeId: number;
    address: string;
}

const customerService : CustomerServiceInterface = new CustomerService();

export async function getCustomer(request: Request,response: Response,next: any) {

    const customerId = request.params.id as unknown as number;

    if (!customerId) throw  new FailedRequestBodyError("No customer id provided");

    try{
        const customer = await customerService.get(request.params.id as unknown as number) as GetCustomerResponseBody;
        response.status(200).json(customer);
    }catch (e) {

        console.log('caught error');
        next(e)

    }








}
