import {CustomerRepository} from "../../../repositories/customer-repository";
import {Customer} from "../../../../domain/models/customer";
import httpMock from "node-mocks-http";
import {postCustomer} from "../post-customer";
import {InternalServerError} from "../../../../utils/errors";
import {jest} from "@jest/globals";

const customerGetStub = jest.spyOn(CustomerRepository.prototype,"get");
const customerPostStub = jest.spyOn(CustomerRepository.prototype,"insert");

describe("Create Customer",()=>{
  

    beforeEach(()=>{
        jest.clearAllMocks();
    })


    it("create a new customer by id",async ()=>{

        //AAA - Assign, Act, Assert

        const customerParams = {
            employeeId: 10,
            firstName: "bob",
            lastName: "thebuilder",
            address: "tv",
        };
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/customers/',
            body:{
                ...customerParams,
            }
        });

        const response = httpMock.createResponse();
        const mockNext = jest.fn();


        customerGetStub.mockImplementationOnce( ()=>{throw new Error("not found")});

        customerPostStub.mockImplementationOnce((cust)=>{return Promise.resolve();})



        await postCustomer(request, response, mockNext);
        expect(response.statusCode).toBeGreaterThanOrEqual(200);


    })

    it("fail to create a new customer with existing id",async ()=>{
        //AAA - Assign, Act, Assert
        const id = "1";
        const customerParams = {
            employeeId: 1,
            firstName: "bob",
            lastName: "thebuilder",
            address: "tv",
        };
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/customers/',
            body:{
                ...customerParams,
            }
        });
        const response = httpMock.createResponse();
        const mockNext = jest.fn((err) => {
            response.status(500);
        });
        customerGetStub.mockResolvedValueOnce( new Customer(customerParams));
        await postCustomer(request, response, mockNext);
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        expect(response.statusCode).toEqual(500);
    })

    it("fail to create a customer with invalid params",async ()=>{
        //AAA - Assign, Act, Assert
        const id = "1";
        const customerParams = {
            employeeId: 1,
            firstName: "bob",
            lastName: "thebuilder",
            address: "tv",
            extra: "invalidProperty"
        };
        const request = httpMock.createRequest({
            method: 'POST',
            url: '/customers/',
            body:{
                ...customerParams,
            }
        });
        const response = httpMock.createResponse();
        const mockNext = jest.fn((err) => {
            response.status(400);
        });
        customerGetStub.mockImplementationOnce( ()=>{throw new InternalServerError("not found")});
        await postCustomer(request, response, mockNext);
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        expect(response.statusCode).toEqual(400);
    })
})