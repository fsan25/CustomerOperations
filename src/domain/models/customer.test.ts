import { Customer } from "./customer";

describe("Customer model", () => {
  it("should create a customer instance", () => {
    const customer = new Customer({
      employeeId: 1,
      firstName: "Test",
      lastName: "User",
      address: "123 Test St"
    });
    expect(customer.employeeId).toBe(1);
    expect(customer.firstName).toBe("Test");
    expect(customer.lastName).toBe("User");
    expect(customer.address).toBe("123 Test St");
  });
});
