import { AddressDesc } from "@models/CustomerProfileData";

export class CustomerDetailsApiData {
    FirstName!: string;
    LastName!: string;
    Gender!: string;
    DateOfBirth!: Date;
    PhoneNumber!: string;
    Email?: string;
    Occupation!: string;
    AddressList!: AddressDesc[];
    Cart!: string;
}