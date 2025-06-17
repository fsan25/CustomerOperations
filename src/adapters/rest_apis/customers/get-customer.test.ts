import { getCustomer } from "./get-customer";
import { Request, Response } from "express";

jest.mock("../../../domain/services/customer-service", () => {
  return {
    CustomerService: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({
        firstName: "John",
        lastName: "Doe",
        employeeId: 1,
        address: "123 Main St"
      })
    }))
  };
});

describe("getCustomer handler", () => {
  it("should be defined", () => {
    expect(getCustomer).toBeDefined();
  });

  it("should respond with customer data for valid input", async () => {
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn();

    await getCustomer(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      employeeId: 1,
      address: "123 Main St"
    });
    expect(next).not.toHaveBeenCalled();
  });
});
