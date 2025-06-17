# CustomerOperations

## Getting Started

`npm start` to start the server

`npm test` to run unit + integration tests and see coverage


#Key points

###Hexagonal Architecture

####+ves
- Helps separate the business/domain logic of the app  
- Separation of Concerns is very high, making it easily modifiable and testable
- Pretty SOLID Implementation overall - adheres to principles like Dependency Inversion and Interface Segregation 
- See `https://blog.octo.com/hexagonal-architecture-three-principles-and-an-implementation-example/` for some pretty pictures


###Notes
 
- Assumed that `employeeId` refers to the `customerId`, since the `POST` endpoint does not return an ID.
- Ran out of time in the end so opted to use a framework `Jest` as opposed to `Mocha`+`Chai` to implement the testing logic
- I have cheated a tiny bit in the unit testing, will share if you dont catch it!


### Improvements

- Would have liked to separate Routing logic from Adapters and also use Middlewares as opposed to try catching in the adapters