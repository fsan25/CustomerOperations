import {Customer} from "../models/customer";
import {CustomerRepositoryInterface} from "../ports/customer-repository-interface";
import {CustomerRepository} from "../../adapters/repositories/customer-repository";
import {CustomerInsertJson} from "../ports/customer-service-interface";
import {InternalServerError} from "../../utils/errors";

export class CustomerService {
    customerRepository : CustomerRepositoryInterface = new CustomerRepository();


    async insert(customerInsertJson: CustomerInsertJson) : Promise<void>{


        let existingCustomer ;

        try {
            existingCustomer = await this.customerRepository.get(customerInsertJson.employeeId).catch(()=>{
                console.log("caught error");
                Promise.resolve()
             });
            
        } catch (error) {
            console.log("caught error:"+error);
        }
        


        if (existingCustomer) throw new InternalServerError("Id already exists");
        const customer = new Customer({
            firstName: customerInsertJson.firstName,
            lastName: customerInsertJson.lastName,
            address: customerInsertJson.address,
            employeeId: customerInsertJson.employeeId
        } );
        return await this.customerRepository.insert(customer);


    }
    async get(customerId: number) : Promise<Customer>{

        return await this.customerRepository.get(customerId);

    }

}