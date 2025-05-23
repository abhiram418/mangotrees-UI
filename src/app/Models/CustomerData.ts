import { AddressDesc } from "./CustomerProfileData";

export class CustomerData{
    FirstName:string | null = null;
    LastName:string | null = null;
    PhoneNumber:number | null = null;
    Email?:string | null = null;
    UserName:string | null = null;
    AddressList:AddressDesc[] | null = null;
    Occupation:string | null = null;
}

export class LoginRequestModel{
    UserName!:string;
    Password!:string;
}

export class ResetPasswordModel{
    PhoneNumber!:number;
    Password!:string;
    OTP!:string;
}

export class UserRequestModel
{
    FirstName!: string;
    LastName!: string;
    Gender!: string;
    DateOfBirth!: Date;
    PhoneNumber!: string;
    Email?: string | null;
    Role: string = "";
    UserName!: string;
    Password!: string;
    Occupation!: string;
    JoinDate!: Date;
    Conditions!: boolean;
    Address!: AddressDesc;
}