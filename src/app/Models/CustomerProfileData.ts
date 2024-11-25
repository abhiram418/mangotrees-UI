export class CustomerProfileData{
    FirstName:string='';
    LastName:string='';
    Gender: string = '';
    DateOfBirth?: Date | null;
    PhoneNumber:number=0;
    Email?:string | null;
    UserName:string='';
    Password:string='';
    AddressList:AddressDesc[] = [];
    Occupation:string='';
    JoinDate?: Date;
    LastLoginDate?: Date;
    Conditions:boolean=false; //Tearms and Conditions
}

export class AddressDesc{
    AddressID?:number;
    AddressTitle?:string='Default';
    Address:string='';
    Pincode:number=521201;
    City:string='Nuzivid';
    State:string='';
    IsEditable:boolean = true;
    IsDeleteable:boolean = true;
    IsPrimary:boolean = false;
}