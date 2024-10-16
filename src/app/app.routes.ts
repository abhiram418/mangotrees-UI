import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { DiceComponent } from './personal/dice/dice.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestComponent } from './test/test.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GridViewItemComponent } from './components/grid-view-item/grid-view-item.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoginPageComponent } from './Customer/login-page/login-page.component';
import { HomePageComponent } from './Product/home-page/home-page.component';
import { ProductViewComponent } from './Product/product-view/product-view.component';
import { CheckOutPageComponent } from './Product/check-out-page/check-out-page.component';
import { ReviewDeliveryPageComponent } from './Product/review-delivery-page/review-delivery-page.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { CustomerPersonalDetailsComponent } from './Customer/customer-personal-details/customer-personal-details.component';
import { CustomerAddressComponent } from './Customer/customer-address/customer-address.component';
import { PopPageComponent } from './components/pop-page/pop-page.component';
import { AddressUpdateComponent } from './Customer/address-update/address-update.component';
import { CartPageComponent } from './Product/cart-page/cart-page.component';
import { CollectionsPageComponent } from './Product/collections-page/collections-page.component';
import { OrderPageComponent } from './Customer/order-page/order-page.component';
import { InformationPageComponent } from './Customer/information-page/information-page.component';
import { SignupPageComponent } from './Customer/signup-page/signup-page.component';
import { ForgotPasswordPageComponent } from './Customer/forgot-password-page/forgot-password-page.component';
import { OTPPageComponent } from './Customer/otp-page/otp-page.component';
import { CouponCodePageComponent } from './Product/coupon-code-page/coupon-code-page.component';
import { AddressSelectComponent } from './Customer/address-select/address-select.component';
import { ReceiptPageComponent } from './Customer/receipt-page/receipt-page.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'comingSoon', component:ComingSoonPageComponent},

    {path:'home', component:HomePageComponent},
    {path:'collections', component:CollectionsPageComponent},
    {path:'product/:ProductID', component:ProductViewComponent},
    {path:'cart', component:CartPageComponent},
    {path:'review', component:ReviewDeliveryPageComponent},
    {path:'checkout', component:CheckOutPageComponent},
    {path:'receipt', component:ReceiptPageComponent},

    {path:'signup', component:SignupPageComponent},
    {path:'login', component:LoginPageComponent},
    {path:'password', component:ForgotPasswordPageComponent},
    {path:'otp', component:OTPPageComponent},
    {path:'coupon', component:CouponCodePageComponent},
    {path:'information', component:InformationPageComponent},

    {path:'profile', component:CustomerProfileComponent},
    {path:'details', component:CustomerPersonalDetailsComponent},
    {path:'address', component:CustomerAddressComponent},
    {path:'address-update', component:AddressUpdateComponent},
    {path:'address-select', component:AddressSelectComponent},
    {path:'orders', component:OrderPageComponent},
    

    {path:'nav-bar', component:NavBarComponent},    
    {path:'footer', component:FooterComponent},
    {path:'item', component:GridViewItemComponent},
    {path:'slider', component:SliderComponent},
    {path:'loader', component:LoaderComponent},
    {path:'pop-up', component:PopUpComponent},
    {path:'pop-page', component:PopPageComponent},

    
    {path:'dice', component:DiceComponent},
    
    
    {path:'test',component:TestComponent},
];
