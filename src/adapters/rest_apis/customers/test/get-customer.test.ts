import {CustomerRepository} from "../../../repositories/customer-repository";
import {Customer} from "../../../../domain/models/customer";
import {getCustomer} from "../get-customer";
import httpMock from "node-mocks-http";
import { ErrorHandlingMiddlewareFunction } from "../../../../../lib/middleware";
describe("Get Customer",()=>{

    const customerGetStub = jest.spyOn(CustomerRepository.prototype,"get");

    it("get a customer by id",async ()=>{

        //AAA - Assign, Act, Assert
        const id = "1";


        const request = httpMock.createRequest({
            method: 'GET',
            url: '/customers/id',
            params: {
                id: id
            }
        });

        const response = httpMock.createResponse();

        const customer = new Customer({
            employeeId: 1,
            firstName: "bob",
            lastName: "thebuilder",
            address: "tv",
        })
        customerGetStub.mockResolvedValueOnce(customer);




       await getCustomer(request, response,ErrorHandlingMiddlewareFunction);
       expect(response.statusCode).toEqual(200);


    })



})