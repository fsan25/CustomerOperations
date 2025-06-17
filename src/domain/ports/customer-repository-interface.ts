import {Customer} from "../models/customer";

export interface CustomerRepositoryInterface{

    insert(customer: Customer): Promise<void>;
    get(customerId: number): Promise<Customer>;

}