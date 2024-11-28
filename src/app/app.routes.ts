import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './Views/coming-soon-page/coming-soon-page.component';
import { CartPageComponent } from './Views/Product/cart-page/cart-page.component';
import { CheckOutPageComponent } from './Views/Product/check-out-page/check-out-page.component';
import { CollectionsPageComponent } from './Views/Product/collections-page/collections-page.component';
import { HomePageComponent } from './Views/Product/home-page/home-page.component';
import { ProductViewComponent } from './Views/Product/product-view/product-view.component';
import { ReviewDeliveryPageComponent } from './Views/Product/review-delivery-page/review-delivery-page.component';
import { ReceiptPageComponent } from './Views/Customer/receipt-page/receipt-page.component';
import { SignupPageComponent } from './Views/Customer/signup-page/signup-page.component';
import { LoginPageComponent } from './Views/Customer/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './Views/Customer/forgot-password-page/forgot-password-page.component';
import { CustomerProfileComponent } from './Views/Customer/customer-profile/customer-profile.component';
import { CustomerPersonalDetailsComponent } from './Views/Customer/customer-personal-details/customer-personal-details.component';
import { CustomerAddressComponent } from './Views/Customer/customer-address/customer-address.component';
import { AddressUpdateComponent } from './Views/Customer/address-update/address-update.component';
import { AddressSelectComponent } from './Views/Customer/address-select/address-select.component';
import { OrderPageComponent } from './Views/Customer/order-page/order-page.component';
import { authenticationGuard } from '@services/Guard/authentication.guard';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'comingSoon', component:ComingSoonPageComponent},

    {path:'home', component:HomePageComponent},
    {path:'collections', component:CollectionsPageComponent},
    {path:'product/:ProductID', component:ProductViewComponent, canActivate: [authenticationGuard]},
    {path:'cart', component:CartPageComponent, canActivate: [authenticationGuard]},
    {path:'review', component:ReviewDeliveryPageComponent, canActivate: [authenticationGuard]},
    {path:'checkout', component:CheckOutPageComponent, canActivate: [authenticationGuard]},
    {path:'receipt', component:ReceiptPageComponent, canActivate: [authenticationGuard]},

    {path:'signup', component:SignupPageComponent},
    {path:'login', component:LoginPageComponent},
    {path:'password', component:ForgotPasswordPageComponent},
    // {path:'otp', component:OTPPageComponent},
    // {path:'coupon', component:CouponCodePageComponent},
    {path:'information', loadComponent: () => import('./Views/Customer/information-page/information-page.component').then(m => m.InformationPageComponent), canActivate: [authenticationGuard]},

    {path:'profile', component:CustomerProfileComponent, canActivate: [authenticationGuard]},
    {path:'details', component:CustomerPersonalDetailsComponent, canActivate: [authenticationGuard]},
    {path:'address', component:CustomerAddressComponent, canActivate: [authenticationGuard]},
    {path:'address-update', component:AddressUpdateComponent, canActivate: [authenticationGuard]},
    {path:'address-select', component:AddressSelectComponent, canActivate: [authenticationGuard]},
    {path:'orders', component:OrderPageComponent, canActivate: [authenticationGuard]},
    

    // {path:'nav-bar', component:NavBarComponent},    
    // {path:'footer', component:FooterComponent},
    // {path:'item', component:GridViewItemComponent},
    // {path:'slider', component:SliderComponent},
    // {path:'loader', component:LoaderComponent},
    // {path:'pop-up', component:PopUpComponent},
    // {path:'pop-page', component:PopPageComponent},

    
    {path:'dice', loadComponent: () => import('./Views/personal/dice/dice.component').then(m => m.DiceComponent) },
];
