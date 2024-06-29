export class CustomerProfileData{
    FirstName:string='';
    LastName:string='';
    PhoneNumber:number=0;
    Email?:string | null;
    UserName:string='';
    Password:string='';
    AddressList:AddressDesc[] = [];
    Occupation:string='';
    Conditions:boolean=false;
}

export class AddressDesc{
    AddressTitle?:string='Default';
    Address:string='';
    Pincode:number=123456;
    City:string='';
    State:string='';
}