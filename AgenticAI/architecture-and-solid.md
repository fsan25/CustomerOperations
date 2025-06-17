# Customer Operations Service Architecture & SOLID Principles

## 1. Architecture Overview

The service is organized using Hexagonal (Ports & Adapters) Architecture, which separates the system into three main zones:

- **User-Side (Left/Driving Adapters):**
  - Where users or external systems interact with the application (e.g., HTTP routes, CLI, tests).
  - Example: REST API controllers in `src/adapters/rest_apis`.
- **Business Logic (Core/Domain):**
  - The heart of the application, containing business rules, models, and interfaces (ports).
  - Example: Services and interfaces in `src/domain/services` and `src/domain/ports`.
- **Server-Side (Right/Driven Adapters):**
  - Infrastructure and technical details the business logic depends on (e.g., database, file system, external APIs).
  - Example: Repositories in `src/adapters/repositories`, Express app setup in `src/infra`.


##2.  Hexagonal (Onion) Architecture Diagram

Below is an ASCII diagram inspired by the hexagonal architecture (see: https://blog.octo.com/hexagonal-architecture-three-principles-and-an-implementation-example/):

```
           +------------------------------------------------+
           |                Infrastructure                  |
           |  (Express app, DB, frameworks, external APIs)  |
           +------------------------+-----------------------+
                                    |
         +--------------------------+--------------------------+
         |           Adapters (Ports & Adapters)              |
         | REST APIs, Repositories, Controllers, Gateways     |
         +--------------------------+--------------------------+
                                    |
                        +-----------+-----------+
                        |      Domain Model      |
                        |  (Business Logic,     |
                        |   Entities, Services, |
                        |   Interfaces)         |
                        +-----------------------+
```

**Legend:**
- The Domain Model is at the core (business logic, interfaces, entities).
- Adapters (ports & adapters) surround the domain and communicate with it via interfaces.
- Infrastructure (frameworks, DB, external APIs) is on the outermost layer.
- Arrows (not shown) indicate that dependencies point inward: infrastructure depends on adapters, adapters depend on domain, but not the other way around.

---

## Layer Explanations

- **Domain Model:** Contains business logic, core entities, and interfaces (e.g., `CustomerServiceInterface`).
- **Adapters:** Implement the interfaces defined in the domain, such as REST API handlers and repositories.
- **Infrastructure:** Provides technical capabilities (Express app, database, external services) and wires everything together.

---

## 3. SOLID Principles in Practice

### S – Single Responsibility Principle
- **Explanation:** Each class/module has one responsibility, making code easier to maintain and test.
- **Example:**
  - `customer-service.ts` only handles business logic for customers.
  - `customer-repository.ts` only handles data access.

```typescript
// src/domain/services/customer-service.ts
export class CustomerService implements CustomerServiceInterface {
  // Only business logic here
  // SRP: This class is only responsible for customer-related operations.
}
```

### O – Open/Closed Principle
- **Explanation:** Classes are open for extension, closed for modification. You can add new features without changing existing code.
- **Example:**
  - Add new customer operations by adding new service methods or handlers, without changing existing code.
  - Implement a new repository without modifying the service.

```typescript
// src/domain/ports/customer-service-interface.ts
export interface CustomerServiceInterface {
  insert(...): Promise<void>;
  get(...): Promise<Customer>;
  // OCP: New methods can be added via new implementations, not by changing this interface.
}
```

### L – Liskov Substitution Principle
- **Explanation:** Subtypes can replace their base types without breaking the system.
- **Example:**
  - `CustomerServiceInterface` can be implemented by any class, and the rest of the system will work as long as the contract is honored.
  - In tests, you can mock `CustomerServiceInterface` and inject it in place of the real service.

```typescript
// In tests, you can mock CustomerServiceInterface:
const mockService: CustomerServiceInterface = {
  insert: jest.fn(),
  get: jest.fn().mockResolvedValue({ /* ... */ })
};
// LSP: Any implementation of CustomerServiceInterface can be used interchangeably.
```

### I – Interface Segregation Principle
- **Explanation:** Clients depend only on the interfaces they use, not on unnecessary methods.
- **Example:**
  - `CustomerServiceInterface` only requires `insert` and `get` methods relevant to customer operations.
  - No unrelated methods are forced on implementers.

```typescript
// src/domain/ports/customer-service-interface.ts
export interface CustomerServiceInterface {
  insert(...): Promise<void>;
  get(...): Promise<Customer>;
  // ISP: Only customer-related methods are required, no unrelated methods.
}
```

### D – Dependency Inversion Principle
- **Explanation:** High-level modules depend on abstractions, not concrete implementations. This allows for flexibility and easier testing.
- **Example:**
  - Handlers and services depend on interfaces, not concrete classes.
  - You can swap out the implementation (e.g., for testing or new data sources) without changing the handler logic.

```typescript
// src/adapters/rest_apis/customers/get-customer.ts
import { CustomerServiceInterface } from "../../../domain/ports/customer-service-interface";
const customerService: CustomerServiceInterface = new CustomerService();
// DIP: The handler depends on the interface, not the concrete implementation.
```

---

## 4. Detailed Example: SOLID in Action

**Single Responsibility & Dependency Inversion:**
```typescript
// src/domain/services/customer-service.ts
// This class only handles business logic for customers and depends on an interface.
export class CustomerService implements CustomerServiceInterface {
  async get(customerId: number): Promise<Customer> {
    // business logic here
  }
  async insert(customer: CustomerInsertJson): Promise<void> {
    // business logic here
  }
}
```
*Explanation: The service is focused on customer logic and depends on the interface, not a concrete repository.*

**Open/Closed & Liskov Substitution:**
```typescript
// src/domain/ports/customer-service-interface.ts
// This interface can be implemented by any class, allowing extension without modification.
export interface CustomerServiceInterface {
  insert(customer: CustomerInsertJson): Promise<void>;
  get(customerId: number): Promise<Customer>;
}
```
*Explanation: New implementations can be created for testing or new data sources without changing the interface or consumers.*

**Adapters using abstractions:**
```typescript
// src/adapters/rest_apis/customers/get-customer.ts
// The handler depends on the interface, not a concrete class.
import { CustomerServiceInterface } from "../../../domain/ports/customer-service-interface";
import { CustomerService } from "../../../domain/services/customer-service";

const customerService: CustomerServiceInterface = new CustomerService();

export async function getCustomer(req, res, next) {
  const customerId = Number(req.params.id);
  if (!customerId) throw new Error("No customer id provided");
  try {
    const customer = await customerService.get(customerId);
    res.status(200).json(customer); // Uses interface, can be easily tested/mocked
  } catch (e) {
    next(e);
  }
}
```
*Explanation: The handler is decoupled from the implementation and can be tested with mocks.*

**Interface Segregation:**
- Interfaces are small and focused, e.g., no unrelated methods in `CustomerServiceInterface`.

## 5. Conclusion

The service is well-structured, with clear boundaries between layers and responsibilities. The use of interfaces, dependency injection, and modular design ensures that the codebase is maintainable, testable, and extensible, closely following the SOLID principles and the intent of Hexagonal Architecture.

*Diagram and explanation inspired by: https://blog.octo.com/hexagonal-architecture-three-principles-and-an-implementation-example/*
