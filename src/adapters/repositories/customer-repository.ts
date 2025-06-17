import {CustomerRepositoryInterface} from "../../domain/ports/customer-repository-interface";
import {Customer} from "../../domain/models/customer";
import {InternalServerError, NotFoundError} from "../../utils/errors";


export class CustomerRepository implements  CustomerRepositoryInterface{


    static customersInMemory : Customer[] = [];


    async get(customerId: number): Promise<Customer> {

        for(const customer of CustomerRepository.customersInMemory){
            if (customer.employeeId.toString() === customerId.toString()){
                return customer;
            }
        }

        //return not found
        throw new NotFoundError("Customer not found");
    }

    async insert(customer: Customer): Promise<void> {
        CustomerRepository.customersInMemory.push(customer);
        return Promise.resolve();
    }




}