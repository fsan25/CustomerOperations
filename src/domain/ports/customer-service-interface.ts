import {Customer} from "../models/customer";

export interface CustomerServiceInterface{

    insert(customerInsertJson: CustomerInsertJson) : Promise<void>;
    get(customerId: number) : Promise<Customer>;

}

export type  CustomerInsertJson =  {
    firstName: string;
    lastName : string;
    employeeId: number;
    address: string;

}