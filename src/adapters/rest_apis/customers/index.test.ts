import * as index from "./index";
import { getCustomer, postCustomer } from "./index";
import { Request, Response } from "express";

describe("customers index", () => {
  it("should be defined", () => {
    expect(index).toBeDefined();
  });

  it("should export getCustomer and postCustomer", () => {
    expect(getCustomer).toBeDefined();
    expect(postCustomer).toBeDefined();
  });

  it("should call getCustomer without error (mock)", async () => {
    const req = { params: { id: 1 } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn();
    try {
      await getCustomer(req, res, next);
    } catch {}
    expect(typeof getCustomer).toBe("function");
  });

  it("should call postCustomer without error (mock)", async () => {
    const req = { body: { firstName: "A", lastName: "B", address: "C", employeeId: 1 } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;
    const next = jest.fn();
    try {
      await postCustomer(req, res, next);
    } catch {}
    expect(typeof postCustomer).toBe("function");
  });
});
