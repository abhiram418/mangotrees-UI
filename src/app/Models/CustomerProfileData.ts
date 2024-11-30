// export class CustomerProfileData{
//     FirstName:string='';
//     LastName:string='';
//     Gender: string = '';
//     DateOfBirth?: Date | null;
//     PhoneNumber:number=0;
//     Email?:string | null;
//     UserName:string='';
//     Password:string='';
//     AddressList:AddressDesc[] = [];
//     Occupation:string='';
//     JoinDate?: Date;
//     LastLoginDate?: Date;
//     Conditions:boolean=false; //Tearms and Conditions
// }

export class AddressDesc{
    AddressID?:string;
    AddressTitle?:string;
    Address!:string;
    Pincode!:number;
    City!:string;
    State!:string;
    IsEditable:boolean = true;
    IsDeleteable:boolean = true;
    IsPrimary:boolean = false;
}