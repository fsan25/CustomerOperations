import { CustomerRepository } from "./customer-repository";
import { Customer } from "../../domain/models/customer";

describe("CustomerRepository", () => {
    beforeEach(() => {
        // Reset the in-memory store before each test
        (CustomerRepository as any).customersInMemory = [];
    });

    it("should insert and retrieve a customer", async () => {
        const repo = new CustomerRepository();
        const customer = new Customer({
            employeeId: 123,
            firstName: "Test",
            lastName: "User",
            address: "123 Test St"
        });
        await repo.insert(customer);
        const found = await repo.get(123);
        expect(found).toEqual(customer);
    });

    it("should throw NotFoundError if customer does not exist", async () => {
        const repo = new CustomerRepository();
        await expect(repo.get(999)).rejects.toThrow("Customer not found");
    });

    it("should retrieve the correct customer when multiple are inserted", async () => {
        const repo = new CustomerRepository();
        const customer1 = new Customer({ employeeId: 1, firstName: "A", lastName: "B", address: "Addr1" });
        const customer2 = new Customer({ employeeId: 2, firstName: "C", lastName: "D", address: "Addr2" });
        await repo.insert(customer1);
        await repo.insert(customer2);
        const found = await repo.get(2);
        expect(found).toEqual(customer2);
    });

    it("should match customerId as string or number", async () => {
        const repo = new CustomerRepository();
        const customer = new Customer({ employeeId: 456, firstName: "X", lastName: "Y", address: "Z" });
        await repo.insert(customer);
        const found = await repo.get("456" as any);
        expect(found).toEqual(customer);
    });

    it("insert should return a resolved promise", async () => {
        const repo = new CustomerRepository();
        const customer = new Customer({ employeeId: 789, firstName: "M", lastName: "N", address: "O" });
        await expect(repo.insert(customer)).resolves.toBeUndefined();
    });

    it("should have an empty customersInMemory array by default", () => {
        expect((CustomerRepository as any).customersInMemory).toEqual([]);
    });
});
