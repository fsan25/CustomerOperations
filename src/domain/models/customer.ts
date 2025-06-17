export class Customer {

    firstName: string;
    lastName : string;
    employeeId: number;
    address: string;
    public constructor(params: CustomerParams) {
        this.firstName = params.firstName;
        this.lastName  = params.lastName;
        this.employeeId = params.employeeId;
        this.address = params.address;
    }


}

export interface CustomerParams{
    firstName: string;
    lastName : string;
    employeeId: number;
    address: string;
}