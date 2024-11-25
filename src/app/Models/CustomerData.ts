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

// export class AddressDesc{
//     AddressTitle?:string='Default';
//     Address:string | null = null;
//     Pincode:number | null = null;
//     City:string | null = null;
//     State:string | null = null;
// }