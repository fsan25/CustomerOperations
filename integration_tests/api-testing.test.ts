import  request from "supertest";
import {app} from "../src/infra/app";


describe('API Integration Tests', function() {

    const customerCreateParams = {
        firstName: "a",
        lastName: "b",
        employeeId : 1,
        address: "where"
    }
    describe('Create Customer ', function() {
        it('should create a customer', function(done) {
            request(app)
                .post('/customers/')
                .send(customerCreateParams)
                .end(function(err: any, res: { statusCode: any; }) {
                    expect(res.statusCode).toEqual(201);

                    done();
                });
        });
    });

    describe('Get a customer by id', function() {
        it('should get a customer', function(done) {
            request(app)
                .get('/customers/' + customerCreateParams.employeeId)
                .end(function(err, res) {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toEqual(customerCreateParams);
                    done();
                });
        });
    });

});

