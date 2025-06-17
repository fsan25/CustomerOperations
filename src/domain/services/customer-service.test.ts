import { CustomerService } from "./customer-service";
import { CustomerRepository } from "../../adapters/repositories/customer-repository";
import { InternalServerError } from "../../utils/errors";

describe("CustomerService", () => {
  let service: CustomerService;
  beforeEach(() => {
    service = new CustomerService();
    (CustomerRepository as any).customersInMemory = [];
  });

  it("should instantiate", () => {
    expect(new CustomerService()).toBeInstanceOf(CustomerService);
  });

  it("should insert a new customer", async () => {
    await expect(service.insert({
      employeeId: 1,
      firstName: "A",
      lastName: "B",
      address: "C"
    })).resolves.toBeUndefined();
  });

  it("should throw InternalServerError if id already exists", async () => {
    await service.insert({
      employeeId: 2,
      firstName: "A",
      lastName: "B",
      address: "C"
    });
    await expect(service.insert({
      employeeId: 2,
      firstName: "X",
      lastName: "Y",
      address: "Z"
    })).rejects.toThrow(InternalServerError);
  });
});
